#include "ccv.h"
#include "ccv_internal.h"
#include <sys/time.h>
#ifdef HAVE_GSL
#include <gsl/gsl_rng.h>
#include <gsl/gsl_randist.h>
#endif
#ifdef USE_OPENMP
#include <omp.h>
#endif
const ;

finitario crear_finitario(info_t i) {
  finitario nuevo = new rep_finitario;
  nuevo->dato = i;
  nuevo->primerio = NULL;
  return nuevo;
}


const ccv_bbf_param_t ccv_bbf_default_params = {
    .interval = 5,
    .min_neighbors = 2,
    .accurate = 1,
    .flags = 0,
    .size = {
        24,
        24,
    },
};

#define _ccv_width_padding(x) (((x) + 3) & -4)

static inline int _ccv_run_bbf_feature(ccv_bbf_feature_t *feature, int *step, unsigned char **u8)
{
#define pf_at(i) (*(u8[feature->pz[i]] + feature->px[i] + feature->py[i] * step[feature->pz[i]]))
#define nf_at(i) (*(u8[feature->nz[i]] + feature->nx[i] + feature->ny[i] * step[feature->nz[i]]))
  unsigned char pmin = pf_at(0), nmax = nf_at(0);
  /* check if every point in P > every point in N, and take a shortcut */
  if (pmin <= nmax)
    return 0;
  int i;
  for (i = 1; i < feature->size; i++)
  {
    if (feature->pz[i] >= 0)
    {
      int p = pf_at(i);
      if (p < pmin)
      {
        if (p <= nmax)
          return 0;
        pmin = p;
      }
    }
    if (feature->nz[i] >= 0)
    {
      int n = nf_at(i);
      if (n > nmax)
      {
        if (pmin <= n)
          return 0;
        nmax = n;
      }
    }
  }
#undef pf_at
#undef nf_at
  return 1;
}

static int _ccv_read_bbf_stage_classifier(const char *file, ccv_bbf_stage_classifier_t *classifier)
{
  FILE *r = fopen(file, "r");
  if (r == 0)
    return -1;
  int stat = 0;
  stat |= fscanf(r, "%d", &classifier->count);
  union {
    float fl;
    int i;
  } fli;
  stat |= fscanf(r, "%d", &fli.i);
  classifier->threshold = fli.fl;
  classifier->feature = (ccv_bbf_feature_t *)ccmalloc(classifier->count * sizeof(ccv_bbf_feature_t));
  classifier->alpha = (float *)ccmalloc(classifier->count * 2 * sizeof(float));
  int i, j;
  for (i = 0; i < classifier->count; i++)
  {
    stat |= fscanf(r, "%d", &classifier->feature[i].size);
    for (j = 0; j < classifier->feature[i].size; j++)
    {
      stat |= fscanf(r, "%d %d %d", &classifier->feature[i].px[j], &classifier->feature[i].py[j], &classifier->feature[i].pz[j]);
      stat |= fscanf(r, "%d %d %d", &classifier->feature[i].nx[j], &classifier->feature[i].ny[j], &classifier->feature[i].nz[j]);
    }
    union {
      float fl;
      int i;
    } flia, flib;
    stat |= fscanf(r, "%d %d", &flia.i, &flib.i);
    classifier->alpha[i * 2] = flia.fl;
    classifier->alpha[i * 2 + 1] = flib.fl;
  }
  fclose(r);
  return 0;
}

#ifdef HAVE_GSL

static unsigned int _ccv_bbf_time_measure()
{
  struct timeval tv;
  gettimeofday(&tv, 0);
  return tv.tv_sec * 1000000 + tv.tv_usec;
}

#define less_than(a, b, aux) ((a) < (b))
CCV_IMPLEMENT_QSORT(_ccv_sort_32f, float, less_than)
#undef less_than

static void _ccv_bbf_eval_data(ccv_bbf_stage_classifier_t *classifier, unsigned char **posdata, int posnum, unsigned char **negdata, int negnum, ccv_size_t size, float *peval, float *neval)
{
  int i, j;
  int steps[] = {_ccv_width_padding(size.width),
                 _ccv_width_padding(size.width >> 1),
                 _ccv_width_padding(size.width >> 2)};
  int isizs0 = steps[0] * size.height;
  int isizs01 = isizs0 + steps[1] * (size.height >> 1);
  for (i = 0; i < posnum; i++)
  {
    unsigned char *u8[] = {posdata[i], posdata[i] + isizs0, posdata[i] + isizs01};
    float sum = 0;
    float *alpha = classifier->alpha;
    ccv_bbf_feature_t *feature = classifier->feature;
    for (j = 0; j < classifier->count; ++j, alpha += 2, ++feature)
      sum += alpha[_ccv_run_bbf_feature(feature, steps, u8)];
    peval[i] = sum;
  }
  for (i = 0; i < negnum; i++)
  {
    unsigned char *u8[] = {negdata[i], negdata[i] + isizs0, negdata[i] + isizs01};
    float sum = 0;
    float *alpha = classifier->alpha;
    ccv_bbf_feature_t *feature = classifier->feature;
    for (j = 0; j < classifier->count; ++j, alpha += 2, ++feature)
      sum += alpha[_ccv_run_bbf_feature(feature, steps, u8)];
    neval[i] = sum;
  }
}

static int _ccv_prune_positive_data(ccv_bbf_classifier_cascade_t *cascade, unsigned char **posdata, int posnum, ccv_size_t size)
{
  float *peval = (float *)ccmalloc(posnum * sizeof(float));
  int i, j, k, rpos = posnum;
  for (i = 0; i < cascade->count; i++)
  {
    _ccv_bbf_eval_data(cascade->stage_classifier + i, posdata, rpos, 0, 0, size, peval, 0);
    k = 0;
    for (j = 0; j < rpos; j++)
      if (peval[j] >= cascade->stage_classifier[i].threshold)
      {
        posdata[k] = posdata[j];
        ++k;
      }
      else
      {
        ccfree(posdata[j]);
      }
    rpos = k;
  }
  ccfree(peval);
  return rpos;
}

static int _ccv_prepare_background_data(ccv_bbf_classifier_cascade_t *cascade, char **bgfiles, int bgnum, unsigned char **negdata, int negnum)
{
  int t, i, j, k, q;
  int negperbg;
  int negtotal = 0;
  int steps[] = {_ccv_width_padding(cascade->size.width),
                 _ccv_width_padding(cascade->size.width >> 1),
                 _ccv_width_padding(cascade->size.width >> 2)};
  int isizs0 = steps[0] * cascade->size.height;
  int isizs1 = steps[1] * (cascade->size.height >> 1);
  int isizs2 = steps[2] * (cascade->size.height >> 2);
  int *idcheck = (int *)ccmalloc(negnum * sizeof(int));

  gsl_rng_env_setup();

  gsl_rng *rng = gsl_rng_alloc(gsl_rng_default);
  gsl_rng_set(rng, (unsigned long int)idcheck);

  ccv_size_t imgsz = cascade->size;
  int rneg = negtotal;
  for (t = 0; negtotal < negnum; t++)
  {
    PRINT(CCV_CLI_INFO, "preparing negative data ...  0%%");
    for (i = 0; i < bgnum; i++)
    {
      negperbg = (t < 2) ? (negnum - negtotal) / (bgnum - i) + 1 : negnum - negtotal;
      ccv_dense_matrix_t *image = 0;
      ccv_read(bgfiles[i], &image, CCV_IO_GRAY | CCV_IO_ANY_FILE);
      assert((image->type & CCV_C1) && (image->type & CCV_8U));
      if (image == 0)
      {
        PRINT(CCV_CLI_ERROR, "\n%s file corrupted\n", bgfiles[i]);
        continue;
      }
      if (t % 2 != 0)
        ccv_flip(image, 0, 0, CCV_FLIP_X);
      if (t % 4 >= 2)
        ccv_flip(image, 0, 0, CCV_FLIP_Y);
      ccv_bbf_param_t params = {.interval = 3, .min_neighbors = 0, .accurate = 1, .flags = 0, .size = cascade->size};
      ccv_array_t *detected = ccv_bbf_detect_objects(image, &cascade, 1, params);
      memset(idcheck, 0, ccv_min(detected->rnum, negperbg) * sizeof(int));
      for (j = 0; j < ccv_min(detected->rnum, negperbg); j++)
      {
        int r = gsl_rng_uniform_int(rng, detected->rnum);
        int flag = 1;
        ccv_rect_t *rect = (ccv_rect_t *)ccv_array_get(detected, r);
        while (flag)
        {
          flag = 0;
          for (k = 0; k < j; k++)
            if (r == idcheck[k])
            {
              flag = 1;
              r = gsl_rng_uniform_int(rng, detected->rnum);
              break;
            }
          rect = (ccv_rect_t *)ccv_array_get(detected, r);
          if ((rect->x < 0) || (rect->y < 0) || (rect->width + rect->x > image->cols) || (rect->height + rect->y > image->rows))
          {
            flag = 1;
            r = gsl_rng_uniform_int(rng, detected->rnum);
          }
        }
        idcheck[j] = r;
        ccv_dense_matrix_t *temp = 0;
        ccv_dense_matrix_t *imgs0 = 0;
        ccv_dense_matrix_t *imgs1 = 0;
        ccv_dense_matrix_t *imgs2 = 0;
        ccv_slice(image, (ccv_matrix_t **)&temp, 0, rect->y, rect->x, rect->height, rect->width);
        ccv_resample(temp, &imgs0, 0, imgsz.height, imgsz.width, CCV_INTER_AREA);
        assert(imgs0->step == steps[0]);
        ccv_matrix_free(temp);
        ccv_sample_down(imgs0, &imgs1, 0, 0, 0);
        assert(imgs1->step == steps[1]);
        ccv_sample_down(imgs1, &imgs2, 0, 0, 0);
        assert(imgs2->step == steps[2]);

        negdata[negtotal] = (unsigned char *)ccmalloc(isizs0 + isizs1 + isizs2);
        unsigned char *u8s0 = negdata[negtotal];
        unsigned char *u8s1 = negdata[negtotal] + isizs0;
        unsigned char *u8s2 = negdata[negtotal] + isizs0 + isizs1;
        unsigned char *u8[] = {u8s0, u8s1, u8s2};
        memcpy(u8s0, imgs0->data.u8, imgs0->rows * imgs0->step);
        ccv_matrix_free(imgs0);
        memcpy(u8s1, imgs1->data.u8, imgs1->rows * imgs1->step);
        ccv_matrix_free(imgs1);
        memcpy(u8s2, imgs2->data.u8, imgs2->rows * imgs2->step);
        ccv_matrix_free(imgs2);

        flag = 1;
        ccv_bbf_stage_classifier_t *classifier = cascade->stage_classifier;
        for (k = 0; k < cascade->count; ++k, ++classifier)
        {
          float sum = 0;
          float *alpha = classifier->alpha;
          ccv_bbf_feature_t *feature = classifier->feature;
          for (q = 0; q < classifier->count; ++q, alpha += 2, ++feature)
            sum += alpha[_ccv_run_bbf_feature(feature, steps, u8)];
          if (sum < classifier->threshold)
          {
            flag = 0;
            break;
          }
        }
        if (!flag)
          ccfree(negdata[negtotal]);
        else
        {
          ++negtotal;
          if (negtotal >= negnum)
            break;
        }
      }
      ccv_array_free(detected);
      ccv_matrix_free(image);
      ccv_drain_cache();
      PRINT(CCV_CLI_INFO, "\rpreparing negative data ... %2d%%", 100 * negtotal / negnum);
      fflush(0);
      if (negtotal >= negnum)
        break;
    }
    if (rneg == negtotal)
      break;
    rneg = negtotal;
    PRINT(CCV_CLI_INFO, "\nentering additional round %d\n", t + 1);
  }
  gsl_rng_free(rng);
  ccfree(idcheck);
  ccv_drain_cache();
  PRINT(CCV_CLI_INFO, "\n");
  return negtotal;
}

static void _ccv_prepare_positive_data(ccv_dense_matrix_t **posimg, unsigned char **posdata, ccv_size_t size, int posnum)
{
  PRINT(CCV_CLI_INFO, "preparing positive data ...  0%%");
  int i;
  for (i = 0; i < posnum; i++)
  {
    ccv_dense_matrix_t *imgs0 = posimg[i];
    ccv_dense_matrix_t *imgs1 = 0;
    ccv_dense_matrix_t *imgs2 = 0;
    assert((imgs0->type & CCV_C1) && (imgs0->type & CCV_8U) && imgs0->rows == size.height && imgs0->cols == size.width);
    ccv_sample_down(imgs0, &imgs1, 0, 0, 0);
    ccv_sample_down(imgs1, &imgs2, 0, 0, 0);
    int isizs0 = imgs0->rows * imgs0->step;
    int isizs1 = imgs1->rows * imgs1->step;
    int isizs2 = imgs2->rows * imgs2->step;

    posdata[i] = (unsigned char *)ccmalloc(isizs0 + isizs1 + isizs2);
    memcpy(posdata[i], imgs0->data.u8, isizs0);
    memcpy(posdata[i] + isizs0, imgs1->data.u8, isizs1);
    memcpy(posdata[i] + isizs0 + isizs1, imgs2->data.u8, isizs2);

    PRINT(CCV_CLI_INFO, "\rpreparing positive data ... %2d%%", 100 * (i + 1) / posnum);
    fflush(0);

    ccv_matrix_free(imgs1);
    ccv_matrix_free(imgs2);
  }
  ccv_drain_cache();
  PRINT(CCV_CLI_INFO, "\n");
}

typedef struct
{
  double fitness;
  int pk, nk;
  int age;
  double error;
  ccv_bbf_feature_t feature;
} ccv_bbf_gene_t;

static inline void _ccv_bbf_genetic_fitness(ccv_bbf_gene_t *gene)
{
  gene->fitness = (1 - gene->error) * exp(-0.01 * gene->age) * exp((gene->pk + gene->nk) * log(1.015));
}

static inline int _ccv_bbf_exist_gene_feature(ccv_bbf_gene_t *gene, int x, int y, int z)
{
  int i;
  for (i = 0; i < gene->pk; i++)
    if (z == gene->feature.pz[i] && x == gene->feature.px[i] && y == gene->feature.py[i])
      return 1;
  for (i = 0; i < gene->nk; i++)
    if (z == gene->feature.nz[i] && x == gene->feature.nx[i] && y == gene->feature.ny[i])
      return 1;
  return 0;
}

static inline void _ccv_bbf_randomize_gene(gsl_rng *rng, ccv_bbf_gene_t *gene, int *rows, int *cols)
{
  int i;
  do
  {
    gene->pk = gsl_rng_uniform_int(rng, CCV_BBF_POINT_MAX - 1) + 1;
    gene->nk = gsl_rng_uniform_int(rng, CCV_BBF_POINT_MAX - 1) + 1;
  } while (gene->pk + gene->nk < CCV_BBF_POINT_MIN); /* a hard restriction of at least 3 points have to be examed */
  gene->feature.size = ccv_max(gene->pk, gene->nk);
  gene->age = 0;
  for (i = 0; i < CCV_BBF_POINT_MAX; i++)
  {
    gene->feature.pz[i] = -1;
    gene->feature.nz[i] = -1;
  }
  int x, y, z;
  for (i = 0; i < gene->pk; i++)
  {
    do
    {
      z = gsl_rng_uniform_int(rng, 3);
      x = gsl_rng_uniform_int(rng, cols[z]);
      y = gsl_rng_uniform_int(rng, rows[z]);
    } while (_ccv_bbf_exist_gene_feature(gene, x, y, z));
    gene->feature.pz[i] = z;
    gene->feature.px[i] = x;
    gene->feature.py[i] = y;
  }
  for (i = 0; i < gene->nk; i++)
  {
    do
    {
      z = gsl_rng_uniform_int(rng, 3);
      x = gsl_rng_uniform_int(rng, cols[z]);
      y = gsl_rng_uniform_int(rng, rows[z]);
    } while (_ccv_bbf_exist_gene_feature(gene, x, y, z));
    gene->feature.nz[i] = z;
    gene->feature.nx[i] = x;
    gene->feature.ny[i] = y;
  }
}

static inline double _ccv_bbf_error_rate(ccv_bbf_feature_t *feature, unsigned char **posdata, int posnum, unsigned char **negdata, int negnum, ccv_size_t size, double *pw, double *nw)
{
  int i;
  int steps[] = {_ccv_width_padding(size.width),
                 _ccv_width_padding(size.width >> 1),
                 _ccv_width_padding(size.width >> 2)};
  int isizs0 = steps[0] * size.height;
  int isizs01 = isizs0 + steps[1] * (size.height >> 1);
  double error = 0;
  for (i = 0; i < posnum; i++)
  {
    unsigned char *u8[] = {posdata[i], posdata[i] + isizs0, posdata[i] + isizs01};
    if (!_ccv_run_bbf_feature(feature, steps, u8))
      error += pw[i];
  }
  for (i = 0; i < negnum; i++)
  {
    unsigned char *u8[] = {negdata[i], negdata[i] + isizs0, negdata[i] + isizs01};
    if (_ccv_run_bbf_feature(feature, steps, u8))
      error += nw[i];
  }
  return error;
}

#define less_than(fit1, fit2, aux) ((fit1).fitness >= (fit2).fitness)
static CCV_IMPLEMENT_QSORT(_ccv_bbf_genetic_qsort, ccv_bbf_gene_t, less_than)
#undef less_than

    static ccv_bbf_feature_t _ccv_bbf_genetic_optimize(unsigned char **posdata, int posnum, unsigned char **negdata, int negnum, int ftnum, ccv_size_t size, double *pw, double *nw)
{
  ccv_bbf_feature_t best;
  /* seed (random method) */
  gsl_rng_env_setup();
  gsl_rng *rng = gsl_rng_alloc(gsl_rng_default);
  union {
    unsigned long int li;
    double db;
  } dbli;
  dbli.db = pw[0] + nw[0];
  gsl_rng_set(rng, dbli.li);
  int i, j;
  int pnum = ftnum * 100;
  assert(pnum > 0);
  ccv_bbf_gene_t *gene = (ccv_bbf_gene_t *)ccmalloc(pnum * sizeof(ccv_bbf_gene_t));
  int rows[] = {size.height, size.height >> 1, size.height >> 2};
  int cols[] = {size.width, size.width >> 1, size.width >> 2};
  for (i = 0; i < pnum; i++)
    _ccv_bbf_randomize_gene(rng, &gene[i], rows, cols);
  unsigned int timer = _ccv_bbf_time_measure();
#ifdef USE_OPENMP
#pragma omp parallel for private(i) schedule(dynamic)
#endif
  for (i = 0; i < pnum; i++)
    gene[i].error = _ccv_bbf_error_rate(&gene[i].feature, posdata, posnum, negdata, negnum, size, pw, nw);
  timer = _ccv_bbf_time_measure() - timer;
  for (i = 0; i < pnum; i++)
    _ccv_bbf_genetic_fitness(&gene[i]);
  double best_err = 1;
  int rnum = ftnum * 39; /* number of randomize */
  int mnum = ftnum * 40; /* number of mutation */
  int hnum = ftnum * 20; /* number of hybrid */
  /* iteration stop crit : best no change in 40 iterations */
  int it = 0, t;
  for (t = 0; it < 40; ++it, ++t)
  {
    int min_id = 0;
    double min_err = gene[0].error;
    for (i = 1; i < pnum; i++)
      if (gene[i].error < min_err)
      {
        min_id = i;
        min_err = gene[i].error;
      }
    min_err = gene[min_id].error = _ccv_bbf_error_rate(&gene[min_id].feature, posdata, posnum, negdata, negnum, size, pw, nw);
    if (min_err < best_err)
    {
      best_err = min_err;
      memcpy(&best, &gene[min_id].feature, sizeof(best));
      PRINT(CCV_CLI_INFO, "best bbf feature with error %f\n|-size: %d\n|-positive point: ", best_err, best.size);
      for (i = 0; i < best.size; i++)
        PRINT(CCV_CLI_INFO, "(%d %d %d), ", best.px[i], best.py[i], best.pz[i]);
      PRINT(CCV_CLI_INFO, "\n|-negative point: ");
      for (i = 0; i < best.size; i++)
        PRINT(CCV_CLI_INFO, "(%d %d %d), ", best.nx[i], best.ny[i], best.nz[i]);
      PRINT(CCV_CLI_INFO, "\n");
      it = 0;
    }
    PRINT(CCV_CLI_INFO, "minimum error achieved in round %d(%d) : %f with %d ms\n", t, it, min_err, timer / 1000);
    _ccv_bbf_genetic_qsort(gene, pnum, 0);
    for (i = 0; i < ftnum; i++)
      ++gene[i].age;
    for (i = ftnum; i < ftnum + mnum; i++)
    {
      int parent = gsl_rng_uniform_int(rng, ftnum);
      memcpy(gene + i, gene + parent, sizeof(ccv_bbf_gene_t));
      /* three mutation strategy : 1. add, 2. remove, 3. refine */
      int pnm, pn = gsl_rng_uniform_int(rng, 2);
      int *pnk[] = {&gene[i].pk, &gene[i].nk};
      int *pnx[] = {gene[i].feature.px, gene[i].feature.nx};
      int *pny[] = {gene[i].feature.py, gene[i].feature.ny};
      int *pnz[] = {gene[i].feature.pz, gene[i].feature.nz};
      int x, y, z;
      int victim, decay = 1;
      do
      {
        switch (gsl_rng_uniform_int(rng, 3))
        {
        case 0: /* add */
          if (gene[i].pk == CCV_BBF_POINT_MAX && gene[i].nk == CCV_BBF_POINT_MAX)
            break;
          while (*pnk[pn] + 1 > CCV_BBF_POINT_MAX)
            pn = gsl_rng_uniform_int(rng, 2);
          do
          {
            z = gsl_rng_uniform_int(rng, 3);
            x = gsl_rng_uniform_int(rng, cols[z]);
            y = gsl_rng_uniform_int(rng, rows[z]);
          } while (_ccv_bbf_exist_gene_feature(&gene[i], x, y, z));
          pnz[pn][*pnk[pn]] = z;
          pnx[pn][*pnk[pn]] = x;
          pny[pn][*pnk[pn]] = y;
          ++(*pnk[pn]);
          gene[i].feature.size = ccv_max(gene[i].pk, gene[i].nk);
          decay = gene[i].age = 0;
          break;
        case 1:                                             /* remove */
          if (gene[i].pk + gene[i].nk <= CCV_BBF_POINT_MIN) /* at least 3 points have to be examed */
            break;
          while (*pnk[pn] - 1 <= 0) // || *pnk[pn] + *pnk[!pn] - 1 < CCV_BBF_POINT_MIN)
            pn = gsl_rng_uniform_int(rng, 2);
          victim = gsl_rng_uniform_int(rng, *pnk[pn]);
          for (j = victim; j < *pnk[pn] - 1; j++)
          {
            pnz[pn][j] = pnz[pn][j + 1];
            pnx[pn][j] = pnx[pn][j + 1];
            pny[pn][j] = pny[pn][j + 1];
          }
          pnz[pn][*pnk[pn] - 1] = -1;
          --(*pnk[pn]);
          gene[i].feature.size = ccv_max(gene[i].pk, gene[i].nk);
          decay = gene[i].age = 0;
          break;
        case 2: /* refine */
          pnm = gsl_rng_uniform_int(rng, *pnk[pn]);
          do
          {
            z = gsl_rng_uniform_int(rng, 3);
            x = gsl_rng_uniform_int(rng, cols[z]);
            y = gsl_rng_uniform_int(rng, rows[z]);
          } while (_ccv_bbf_exist_gene_feature(&gene[i], x, y, z));
          pnz[pn][pnm] = z;
          pnx[pn][pnm] = x;
          pny[pn][pnm] = y;
          decay = gene[i].age = 0;
          break;
        }
      } while (decay);
    }
    for (i = ftnum + mnum; i < ftnum + mnum + hnum; i++)
    {
      /* hybrid strategy: taking positive points from dad, negative points from mum */
      int dad, mum;
      do
      {
        dad = gsl_rng_uniform_int(rng, ftnum);
        mum = gsl_rng_uniform_int(rng, ftnum);
      } while (dad == mum || gene[dad].pk + gene[mum].nk < CCV_BBF_POINT_MIN); /* at least 3 points have to be examed */
      for (j = 0; j < CCV_BBF_POINT_MAX; j++)
      {
        gene[i].feature.pz[j] = -1;
        gene[i].feature.nz[j] = -1;
      }
      gene[i].pk = gene[dad].pk;
      for (j = 0; j < gene[i].pk; j++)
      {
        gene[i].feature.pz[j] = gene[dad].feature.pz[j];
        gene[i].feature.px[j] = gene[dad].feature.px[j];
        gene[i].feature.py[j] = gene[dad].feature.py[j];
      }
      gene[i].nk = gene[mum].nk;
      for (j = 0; j < gene[i].nk; j++)
      {
        gene[i].feature.nz[j] = gene[mum].feature.nz[j];
        gene[i].feature.nx[j] = gene[mum].feature.nx[j];
        gene[i].feature.ny[j] = gene[mum].feature.ny[j];
      }
      gene[i].feature.size = ccv_max(gene[i].pk, gene[i].nk);
      gene[i].age = 0;
    }
    for (i = ftnum + mnum + hnum; i < ftnum + mnum + hnum + rnum; i++)
      _ccv_bbf_randomize_gene(rng, &gene[i], rows, cols);
    timer = _ccv_bbf_time_measure();
#ifdef USE_OPENMP
#pragma omp parallel for private(i) schedule(dynamic)
#endif
    for (i = 0; i < pnum; i++)
      gene[i].error = _ccv_bbf_error_rate(&gene[i].feature, posdata, posnum, negdata, negnum, size, pw, nw);
    timer = _ccv_bbf_time_measure() - timer;
    for (i = 0; i < pnum; i++)
      _ccv_bbf_genetic_fitness(&gene[i]);
  }
  ccfree(gene);
  gsl_rng_free(rng);
  return best;
}

#define less_than(fit1, fit2, aux) ((fit1).error < (fit2).error)
static CCV_IMPLEMENT_QSORT(_ccv_bbf_best_qsort, ccv_bbf_gene_t, less_than)
#undef less_than

    static ccv_bbf_gene_t _ccv_bbf_best_gene(ccv_bbf_gene_t *gene, int pnum, int point_min, unsigned char **posdata, int posnum, unsigned char **negdata, int negnum, ccv_size_t size, double *pw, double *nw)
{
  int i;
  unsigned int timer = _ccv_bbf_time_measure();
#ifdef USE_OPENMP
#pragma omp parallel for private(i) schedule(dynamic)
#endif
  for (i = 0; i < pnum; i++)
    gene[i].error = _ccv_bbf_error_rate(&gene[i].feature, posdata, posnum, negdata, negnum, size, pw, nw);
  timer = _ccv_bbf_time_measure() - timer;
  _ccv_bbf_best_qsort(gene, pnum, 0);
  int min_id = 0;
  double min_err = gene[0].error;
  for (i = 0; i < pnum; i++)
    if (gene[i].nk + gene[i].pk >= point_min)
    {
      min_id = i;
      min_err = gene[i].error;
      break;
    }
  PRINT(CCV_CLI_INFO, "local best bbf feature with error %f\n|-size: %d\n|-positive point: ", min_err, gene[min_id].feature.size);
  for (i = 0; i < gene[min_id].feature.size; i++)
    PRINT(CCV_CLI_INFO, "(%d %d %d), ", gene[min_id].feature.px[i], gene[min_id].feature.py[i], gene[min_id].feature.pz[i]);
  PRINT(CCV_CLI_INFO, "\n|-negative point: ");
  for (i = 0; i < gene[min_id].feature.size; i++)
    PRINT(CCV_CLI_INFO, "(%d %d %d), ", gene[min_id].feature.nx[i], gene[min_id].feature.ny[i], gene[min_id].feature.nz[i]);
  PRINT(CCV_CLI_INFO, "\nthe computation takes %d ms\n", timer / 1000);
  return gene[min_id];
}

static ccv_bbf_feature_t _ccv_bbf_convex_optimize(unsigned char **posdata, int posnum, unsigned char **negdata, int negnum, ccv_bbf_feature_t *best_feature, ccv_size_t size, double *pw, double *nw)
{
  ccv_bbf_gene_t best_gene;
  /* seed (random method) */
  gsl_rng_env_setup();
  gsl_rng *rng = gsl_rng_alloc(gsl_rng_default);
  union {
    unsigned long int li;
    double db;
  } dbli;
  dbli.db = pw[0] + nw[0];
  gsl_rng_set(rng, dbli.li);
  int i, j, k, q, p, g, t;
  int rows[] = {size.height, size.height >> 1, size.height >> 2};
  int cols[] = {size.width, size.width >> 1, size.width >> 2};
  int pnum = rows[0] * cols[0] + rows[1] * cols[1] + rows[2] * cols[2];
  ccv_bbf_gene_t *gene = (ccv_bbf_gene_t *)ccmalloc((pnum * (CCV_BBF_POINT_MAX * 2 + 1) * 2 + CCV_BBF_POINT_MAX * 2 + 1) * sizeof(ccv_bbf_gene_t));
  if (best_feature == 0)
  {
    /* bootstrapping the best feature, start from two pixels, one for positive, one for negative
		 * the bootstrapping process go like this: first, it will assign a random pixel as positive
		 * and enumerate every possible pixel as negative, and pick the best one. Then, enumerate every
		 * possible pixel as positive, and pick the best one, until it converges */
    memset(&best_gene, 0, sizeof(ccv_bbf_gene_t));
    for (i = 0; i < CCV_BBF_POINT_MAX; i++)
      best_gene.feature.pz[i] = best_gene.feature.nz[i] = -1;
    best_gene.pk = 1;
    best_gene.nk = 0;
    best_gene.feature.size = 1;
    best_gene.feature.pz[0] = gsl_rng_uniform_int(rng, 3);
    best_gene.feature.px[0] = gsl_rng_uniform_int(rng, cols[best_gene.feature.pz[0]]);
    best_gene.feature.py[0] = gsl_rng_uniform_int(rng, rows[best_gene.feature.pz[0]]);
    for (t = 0;; ++t)
    {
      g = 0;
      if (t % 2 == 0)
      {
        for (i = 0; i < 3; i++)
          for (j = 0; j < cols[i]; j++)
            for (k = 0; k < rows[i]; k++)
              if (i != best_gene.feature.pz[0] || j != best_gene.feature.px[0] || k != best_gene.feature.py[0])
              {
                gene[g] = best_gene;
                gene[g].pk = gene[g].nk = 1;
                gene[g].feature.nz[0] = i;
                gene[g].feature.nx[0] = j;
                gene[g].feature.ny[0] = k;
                g++;
              }
      }
      else
      {
        for (i = 0; i < 3; i++)
          for (j = 0; j < cols[i]; j++)
            for (k = 0; k < rows[i]; k++)
              if (i != best_gene.feature.nz[0] || j != best_gene.feature.nx[0] || k != best_gene.feature.ny[0])
              {
                gene[g] = best_gene;
                gene[g].pk = gene[g].nk = 1;
                gene[g].feature.pz[0] = i;
                gene[g].feature.px[0] = j;
                gene[g].feature.py[0] = k;
                g++;
              }
      }
      PRINT(CCV_CLI_INFO, "bootstrapping round : %d\n", t);
      ccv_bbf_gene_t local_gene = _ccv_bbf_best_gene(gene, g, 2, posdata, posnum, negdata, negnum, size, pw, nw);
      if (local_gene.error >= best_gene.error - 1e-10)
        break;
      best_gene = local_gene;
    }
  }
  else
  {
    best_gene.feature = *best_feature;
    best_gene.pk = best_gene.nk = best_gene.feature.size;
    for (i = 0; i < CCV_BBF_POINT_MAX; i++)
      if (best_feature->pz[i] == -1)
      {
        best_gene.pk = i;
        break;
      }
    for (i = 0; i < CCV_BBF_POINT_MAX; i++)
      if (best_feature->nz[i] == -1)
      {
        best_gene.nk = i;
        break;
      }
  }
  /* after bootstrapping, the float search technique will do the following permutations:
	 * a). add a new point to positive or negative
	 * b). remove a point from positive or negative
	 * c). move an existing point in positive or negative to another position
	 * the three rules applied exhaustively, no heuristic used. */
  for (t = 0;; ++t)
  {
    g = 0;
    for (i = 0; i < 3; i++)
      for (j = 0; j < cols[i]; j++)
        for (k = 0; k < rows[i]; k++)
          if (!_ccv_bbf_exist_gene_feature(&best_gene, j, k, i))
          {
            /* add positive point */
            if (best_gene.pk < CCV_BBF_POINT_MAX - 1)
            {
              gene[g] = best_gene;
              gene[g].feature.pz[gene[g].pk] = i;
              gene[g].feature.px[gene[g].pk] = j;
              gene[g].feature.py[gene[g].pk] = k;
              gene[g].pk++;
              gene[g].feature.size = ccv_max(gene[g].pk, gene[g].nk);
              g++;
            }
            /* add negative point */
            if (best_gene.nk < CCV_BBF_POINT_MAX - 1)
            {
              gene[g] = best_gene;
              gene[g].feature.nz[gene[g].nk] = i;
              gene[g].feature.nx[gene[g].nk] = j;
              gene[g].feature.ny[gene[g].nk] = k;
              gene[g].nk++;
              gene[g].feature.size = ccv_max(gene[g].pk, gene[g].nk);
              g++;
            }
            /* refine positive point */
            for (q = 0; q < best_gene.pk; q++)
            {
              gene[g] = best_gene;
              gene[g].feature.pz[q] = i;
              gene[g].feature.px[q] = j;
              gene[g].feature.py[q] = k;
              g++;
            }
            /* add positive point, remove negative point */
            if (best_gene.pk < CCV_BBF_POINT_MAX - 1 && best_gene.nk > 1)
            {
              for (q = 0; q < best_gene.nk; q++)
              {
                gene[g] = best_gene;
                gene[g].feature.pz[gene[g].pk] = i;
                gene[g].feature.px[gene[g].pk] = j;
                gene[g].feature.py[gene[g].pk] = k;
                gene[g].pk++;
                for (p = q; p < best_gene.nk - 1; p++)
                {
                  gene[g].feature.nz[p] = gene[g].feature.nz[p + 1];
                  gene[g].feature.nx[p] = gene[g].feature.nx[p + 1];
                  gene[g].feature.ny[p] = gene[g].feature.ny[p + 1];
                }
                gene[g].feature.nz[gene[g].nk - 1] = -1;
                gene[g].nk--;
                gene[g].feature.size = ccv_max(gene[g].pk, gene[g].nk);
                g++;
              }
            }
            /* refine negative point */
            for (q = 0; q < best_gene.nk; q++)
            {
              gene[g] = best_gene;
              gene[g].feature.nz[q] = i;
              gene[g].feature.nx[q] = j;
              gene[g].feature.ny[q] = k;
              g++;
            }
            /* add negative point, remove positive point */
            if (best_gene.pk > 1 && best_gene.nk < CCV_BBF_POINT_MAX - 1)
            {
              for (q = 0; q < best_gene.pk; q++)
              {
                gene[g] = best_gene;
                gene[g].feature.nz[gene[g].nk] = i;
                gene[g].feature.nx[gene[g].nk] = j;
                gene[g].feature.ny[gene[g].nk] = k;
                gene[g].nk++;
                for (p = q; p < best_gene.pk - 1; p++)
                {
                  gene[g].feature.pz[p] = gene[g].feature.pz[p + 1];
                  gene[g].feature.px[p] = gene[g].feature.px[p + 1];
                  gene[g].feature.py[p] = gene[g].feature.py[p + 1];
                }
                gene[g].feature.pz[gene[g].pk - 1] = -1;
                gene[g].pk--;
                gene[g].feature.size = ccv_max(gene[g].pk, gene[g].nk);
                g++;
              }
            }
          }
    if (best_gene.pk > 1)
      for (q = 0; q < best_gene.pk; q++)
      {
        gene[g] = best_gene;
        for (i = q; i < best_gene.pk - 1; i++)
        {
          gene[g].feature.pz[i] = gene[g].feature.pz[i + 1];
          gene[g].feature.px[i] = gene[g].feature.px[i + 1];
          gene[g].feature.py[i] = gene[g].feature.py[i + 1];
        }
        gene[g].feature.pz[gene[g].pk - 1] = -1;
        gene[g].pk--;
        gene[g].feature.size = ccv_max(gene[g].pk, gene[g].nk);
        g++;
      }
    if (best_gene.nk > 1)
      for (q = 0; q < best_gene.nk; q++)
      {
        gene[g] = best_gene;
        for (i = q; i < best_gene.nk - 1; i++)
        {
          gene[g].feature.nz[i] = gene[g].feature.nz[i + 1];
          gene[g].feature.nx[i] = gene[g].feature.nx[i + 1];
          gene[g].feature.ny[i] = gene[g].feature.ny[i + 1];
        }
        gene[g].feature.nz[gene[g].nk - 1] = -1;
        gene[g].nk--;
        gene[g].feature.size = ccv_max(gene[g].pk, gene[g].nk);
        g++;
      }
    gene[g] = best_gene;
    g++;
    PRINT(CCV_CLI_INFO, "float search round : %d\n", t);
    ccv_bbf_gene_t local_gene = _ccv_bbf_best_gene(gene, g, CCV_BBF_POINT_MIN, posdata, posnum, negdata, negnum, size, pw, nw);
    if (local_gene.error >= best_gene.error - 1e-10)
      break;
    best_gene = local_gene;
  }
  ccfree(gene);
  gsl_rng_free(rng);
  return best_gene.feature;
}

static int _ccv_write_bbf_stage_classifier(const char *file, ccv_bbf_stage_classifier_t *classifier)
{
  FILE *w = fopen(file, "wb");
  if (w == 0)
    return -1;
  fprintf(w, "%d\n", classifier->count);
  union {
    float fl;
    int i;
  } fli;
  fli.fl = classifier->threshold;
  fprintf(w, "%d\n", fli.i);
  int i, j;
  for (i = 0; i < classifier->count; i++)
  {
    fprintf(w, "%d\n", classifier->feature[i].size);
    for (j = 0; j < classifier->feature[i].size; j++)
    {
      fprintf(w, "%d %d %d\n", classifier->feature[i].px[j], classifier->feature[i].py[j], classifier->feature[i].pz[j]);
      fprintf(w, "%d %d %d\n", classifier->feature[i].nx[j], classifier->feature[i].ny[j], classifier->feature[i].nz[j]);
    }
    union {
      float fl;
      int i;
    } flia, flib;
    flia.fl = classifier->alpha[i * 2];
    flib.fl = classifier->alpha[i * 2 + 1];
    fprintf(w, "%d %d\n", flia.i, flib.i);
  }
  fclose(w);
  return 0;
}

static int _ccv_read_background_data(const char *file, unsigned char **negdata, int *negnum, ccv_size_t size)
{
  int stat = 0;
  FILE *r = fopen(file, "rb");
  if (r == 0)
    return -1;
  stat |= fread(negnum, sizeof(int), 1, r);
  int i;
  int isizs012 = _ccv_width_padding(size.width) * size.height +
                 _ccv_width_padding(size.width >> 1) * (size.height >> 1) +
                 _ccv_width_padding(size.width >> 2) * (size.height >> 2);
  for (i = 0; i < *negnum; i++)
  {
    negdata[i] = (unsigned char *)ccmalloc(isizs012);
    stat |= fread(negdata[i], 1, isizs012, r);
  }
  fclose(r);
  return 0;
}

static int _ccv_write_background_data(const char *file, unsigned char **negdata, int negnum, ccv_size_t size)
{
  FILE *w = fopen(file, "w");
  if (w == 0)
    return -1;
  fwrite(&negnum, sizeof(int), 1, w);
  int i;
  int isizs012 = _ccv_width_padding(size.width) * size.height +
                 _ccv_width_padding(size.width >> 1) * (size.height >> 1) +
                 _ccv_width_padding(size.width >> 2) * (size.height >> 2);
  for (i = 0; i < negnum; i++)
    fwrite(negdata[i], 1, isizs012, w);
  fclose(w);
  return 0;
}

static int _ccv_resume_bbf_cascade_training_state(const char *file, int *i, int *k, int *bg, double *pw, double *nw, int posnum, int negnum)
{
  int stat = 0;
  FILE *r = fopen(file, "r");
  if (r == 0)
    return -1;
  stat |= fscanf(r, "%d %d %d", i, k, bg);
  int j;
  union {
    double db;
    int i[2];
  } dbi;
  for (j = 0; j < posnum; j++)
  {
    stat |= fscanf(r, "%d %d", &dbi.i[0], &dbi.i[1]);
    pw[j] = dbi.db;
  }
  for (j = 0; j < negnum; j++)
  {
    stat |= fscanf(r, "%d %d", &dbi.i[0], &dbi.i[1]);
    nw[j] = dbi.db;
  }
  fclose(r);
  return 0;
}

static int _ccv_save_bbf_cacade_training_state(const char *file, int i, int k, int bg, double *pw, double *nw, int posnum, int negnum)
{
  FILE *w = fopen(file, "w");
  if (w == 0)
    return -1;
  fprintf(w, "%d %d %d\n", i, k, bg);
  int j;
  union {
    double db;
    int i[2];
  } dbi;
  for (j = 0; j < posnum; ++j)
  {
    dbi.db = pw[j];
    fprintf(w, "%d %d ", dbi.i[0], dbi.i[1]);
  }
  fprintf(w, "\n");
  for (j = 0; j < negnum; ++j)
  {
    dbi.db = nw[j];
    fprintf(w, "%d %d ", dbi.i[0], dbi.i[1]);
  }
  fprintf(w, "\n");
  fclose(w);
  return 0;
}

void ccv_bbf_classifier_cascade_new(ccv_dense_matrix_t **posimg, int posnum, char **bgfiles, int bgnum, int negnum, ccv_size_t size, const char *dir, ccv_bbf_new_param_t params)
{
  int i, j, k;
  /* allocate memory for usage */
  ccv_bbf_classifier_cascade_t *cascade = (ccv_bbf_classifier_cascade_t *)ccmalloc(sizeof(ccv_bbf_classifier_cascade_t));
  cascade->count = 0;
  cascade->size = size;
  cascade->stage_classifier = (ccv_bbf_stage_classifier_t *)ccmalloc(sizeof(ccv_bbf_stage_classifier_t));
  unsigned char **posdata = (unsigned char **)ccmalloc(posnum * sizeof(unsigned char *));
  unsigned char **negdata = (unsigned char **)ccmalloc(negnum * sizeof(unsigned char *));
  double *pw = (double *)ccmalloc(posnum * sizeof(double));
  double *nw = (double *)ccmalloc(negnum * sizeof(double));
  float *peval = (float *)ccmalloc(posnum * sizeof(float));
  float *neval = (float *)ccmalloc(negnum * sizeof(float));
  double inv_balance_k = 1. / params.balance_k;
  /* balance factor k, and weighted with 0.01 */
  params.balance_k *= 0.01;
  inv_balance_k *= 0.01;

  int steps[] = {_ccv_width_padding(cascade->size.width),
                 _ccv_width_padding(cascade->size.width >> 1),
                 _ccv_width_padding(cascade->size.width >> 2)};
  int isizs0 = steps[0] * cascade->size.height;
  int isizs01 = isizs0 + steps[1] * (cascade->size.height >> 1);

  i = 0;
  k = 0;
  int bg = 0;
  int cacheK = 10;
  /* state resume code */
  char buf[1024];
  sprintf(buf, "%s/stat.txt", dir);
  _ccv_resume_bbf_cascade_training_state(buf, &i, &k, &bg, pw, nw, posnum, negnum);
  if (i > 0)
  {
    cascade->count = i;
    ccfree(cascade->stage_classifier);
    cascade->stage_classifier = (ccv_bbf_stage_classifier_t *)ccmalloc(i * sizeof(ccv_bbf_stage_classifier_t));
    for (j = 0; j < i; j++)
    {
      sprintf(buf, "%s/stage-%d.txt", dir, j);
      _ccv_read_bbf_stage_classifier(buf, &cascade->stage_classifier[j]);
    }
  }
  if (k > 0)
    cacheK = k;
  int rpos, rneg = 0;
  if (bg)
  {
    sprintf(buf, "%s/negs.txt", dir);
    _ccv_read_background_data(buf, negdata, &rneg, cascade->size);
  }

  for (; i < params.layer; i++)
  {
    if (!bg)
    {
      rneg = _ccv_prepare_background_data(cascade, bgfiles, bgnum, negdata, negnum);
      /* save state of background data */
      sprintf(buf, "%s/negs.txt", dir);
      _ccv_write_background_data(buf, negdata, rneg, cascade->size);
      bg = 1;
    }
    double totalw;
    /* save state of cascade : level, weight etc. */
    sprintf(buf, "%s/stat.txt", dir);
    _ccv_save_bbf_cacade_training_state(buf, i, k, bg, pw, nw, posnum, negnum);
    ccv_bbf_stage_classifier_t classifier;
    if (k > 0)
    {
      /* resume state of classifier */
      sprintf(buf, "%s/stage-%d.txt", dir, i);
      _ccv_read_bbf_stage_classifier(buf, &classifier);
    }
    else
    {
      /* initialize classifier */
      for (j = 0; j < posnum; j++)
        pw[j] = params.balance_k;
      for (j = 0; j < rneg; j++)
        nw[j] = inv_balance_k;
      classifier.count = k;
      classifier.threshold = 0;
      classifier.feature = (ccv_bbf_feature_t *)ccmalloc(cacheK * sizeof(ccv_bbf_feature_t));
      classifier.alpha = (float *)ccmalloc(cacheK * 2 * sizeof(float));
    }
    _ccv_prepare_positive_data(posimg, posdata, cascade->size, posnum);
    rpos = _ccv_prune_positive_data(cascade, posdata, posnum, cascade->size);
    PRINT(CCV_CLI_INFO, "%d postivie data and %d negative data in training\n", rpos, rneg);
    /* reweight to 1.00 */
    totalw = 0;
    for (j = 0; j < rpos; j++)
      totalw += pw[j];
    for (j = 0; j < rneg; j++)
      totalw += nw[j];
    for (j = 0; j < rpos; j++)
      pw[j] = pw[j] / totalw;
    for (j = 0; j < rneg; j++)
      nw[j] = nw[j] / totalw;
    for (;; k++)
    {
      /* get overall true-positive, false-positive rate and threshold */
      double tp = 0, fp = 0, etp = 0, efp = 0;
      _ccv_bbf_eval_data(&classifier, posdata, rpos, negdata, rneg, cascade->size, peval, neval);
      _ccv_sort_32f(peval, rpos, 0);
      classifier.threshold = peval[(int)((1. - params.pos_crit) * rpos)] - 1e-6;
      for (j = 0; j < rpos; j++)
      {
        if (peval[j] >= 0)
          ++tp;
        if (peval[j] >= classifier.threshold)
          ++etp;
      }
      tp /= rpos;
      etp /= rpos;
      for (j = 0; j < rneg; j++)
      {
        if (neval[j] >= 0)
          ++fp;
        if (neval[j] >= classifier.threshold)
          ++efp;
      }
      fp /= rneg;
      efp /= rneg;
      PRINT(CCV_CLI_INFO, "stage classifier real TP rate : %f, FP rate : %f\n", tp, fp);
      PRINT(CCV_CLI_INFO, "stage classifier TP rate : %f, FP rate : %f at threshold : %f\n", etp, efp, classifier.threshold);
      if (k > 0)
      {
        /* save classifier state */
        sprintf(buf, "%s/stage-%d.txt", dir, i);
        _ccv_write_bbf_stage_classifier(buf, &classifier);
        sprintf(buf, "%s/stat.txt", dir);
        _ccv_save_bbf_cacade_training_state(buf, i, k, bg, pw, nw, posnum, negnum);
      }
      if (etp > params.pos_crit && efp < params.neg_crit)
        break;
      /* TODO: more post-process is needed in here */

      /* select the best feature in current distribution through genetic algorithm optimization */
      ccv_bbf_feature_t best;
      if (params.optimizer == CCV_BBF_GENETIC_OPT)
      {
        best = _ccv_bbf_genetic_optimize(posdata, rpos, negdata, rneg, params.feature_number, cascade->size, pw, nw);
      }
      else if (params.optimizer == CCV_BBF_FLOAT_OPT)
      {
        best = _ccv_bbf_convex_optimize(posdata, rpos, negdata, rneg, 0, cascade->size, pw, nw);
      }
      else
      {
        best = _ccv_bbf_genetic_optimize(posdata, rpos, negdata, rneg, params.feature_number, cascade->size, pw, nw);
        best = _ccv_bbf_convex_optimize(posdata, rpos, negdata, rneg, &best, cascade->size, pw, nw);
      }
      double err = _ccv_bbf_error_rate(&best, posdata, rpos, negdata, rneg, cascade->size, pw, nw);
      double rw = (1 - err) / err;
      totalw = 0;
      /* reweight */
      for (j = 0; j < rpos; j++)
      {
        unsigned char *u8[] = {posdata[j], posdata[j] + isizs0, posdata[j] + isizs01};
        if (!_ccv_run_bbf_feature(&best, steps, u8))
          pw[j] *= rw;
        pw[j] *= params.balance_k;
        totalw += pw[j];
      }
      for (j = 0; j < rneg; j++)
      {
        unsigned char *u8[] = {negdata[j], negdata[j] + isizs0, negdata[j] + isizs01};
        if (_ccv_run_bbf_feature(&best, steps, u8))
          nw[j] *= rw;
        nw[j] *= inv_balance_k;
        totalw += nw[j];
      }
      for (j = 0; j < rpos; j++)
        pw[j] = pw[j] / totalw;
      for (j = 0; j < rneg; j++)
        nw[j] = nw[j] / totalw;
      double c = log(rw);
      PRINT(CCV_CLI_INFO, "coefficient of feature %d: %f\n", k + 1, c);
      classifier.count = k + 1;
      /* resizing classifier */
      if (k >= cacheK)
      {
        ccv_bbf_feature_t *feature = (ccv_bbf_feature_t *)ccmalloc(cacheK * 2 * sizeof(ccv_bbf_feature_t));
        memcpy(feature, classifier.feature, cacheK * sizeof(ccv_bbf_feature_t));
        ccfree(classifier.feature);
        float *alpha = (float *)ccmalloc(cacheK * 4 * sizeof(float));
        memcpy(alpha, classifier.alpha, cacheK * 2 * sizeof(float));
        ccfree(classifier.alpha);
        classifier.feature = feature;
        classifier.alpha = alpha;
        cacheK *= 2;
      }
      /* setup new feature */
      classifier.feature[k] = best;
      classifier.alpha[k * 2] = -c;
      classifier.alpha[k * 2 + 1] = c;
    }
    cascade->count = i + 1;
    ccv_bbf_stage_classifier_t *stage_classifier = (ccv_bbf_stage_classifier_t *)ccmalloc(cascade->count * sizeof(ccv_bbf_stage_classifier_t));
    memcpy(stage_classifier, cascade->stage_classifier, i * sizeof(ccv_bbf_stage_classifier_t));
    ccfree(cascade->stage_classifier);
    stage_classifier[i] = classifier;
    cascade->stage_classifier = stage_classifier;
    k = 0;
    bg = 0;
    for (j = 0; j < rpos; j++)
      ccfree(posdata[j]);
    for (j = 0; j < rneg; j++)
      ccfree(negdata[j]);
  }

  ccfree(neval);
  ccfree(peval);
  ccfree(nw);
  ccfree(pw);
  ccfree(negdata);
  ccfree(posdata);
  ccfree(cascade);
}
#else
void ccv_bbf_classifier_cascade_new(ccv_dense_matrix_t **posimg, int posnum, char **bgfiles, int bgnum, int negnum, ccv_size_t size, const char *dir, ccv_bbf_new_param_t params)
{
  fprintf(stderr, " ccv_bbf_classifier_cascade_new requires libgsl support, please compile ccv with libgsl.\n");
}
#endif

static int _ccv_is_equal(const void *_r1, const void *_r2, void *data)
{
  const ccv_comp_t *r1 = (const ccv_comp_t *)_r1;
  const ccv_comp_t *r2 = (const ccv_comp_t *)_r2;
  int distance = (int)(r1->rect.width * 0.25 + 0.5);

  return r2->rect.x <= r1->rect.x + distance &&
         r2->rect.x >= r1->rect.x - distance &&
         r2->rect.y <= r1->rect.y + distance &&
         r2->rect.y >= r1->rect.y - distance &&
         r2->rect.width <= (int)(r1->rect.width * 1.5 + 0.5) &&
         (int)(r2->rect.width * 1.5 + 0.5) >= r1->rect.width;
}

static int _ccv_is_equal_same_class(const void *_r1, const void *_r2, void *data)
{
  const ccv_comp_t *r1 = (const ccv_comp_t *)_r1;
  const ccv_comp_t *r2 = (const ccv_comp_t *)_r2;
  int distance = (int)(r1->rect.width * 0.25 + 0.5);

  return r2->classification.id == r1->classification.id &&
         r2->rect.x <= r1->rect.x + distance &&
         r2->rect.x >= r1->rect.x - distance &&
         r2->rect.y <= r1->rect.y + distance &&
         r2->rect.y >= r1->rect.y - distance &&
         r2->rect.width <= (int)(r1->rect.width * 1.5 + 0.5) &&
         (int)(r2->rect.width * 1.5 + 0.5) >= r1->rect.width;
}

ccv_array_t *ccv_bbf_detect_objects(ccv_dense_matrix_t *a, ccv_bbf_classifier_cascade_t **_cascade, int count, ccv_bbf_param_t params)
{
  int hr = a->rows / params.size.height;
  int wr = a->cols / params.size.width;
  double scale = pow(2., 1. / (params.interval + 1.));
  int next = params.interval + 1;
  int scale_upto = (int)(log((double)ccv_min(hr, wr)) / log(scale));
  ccv_dense_matrix_t **pyr = (ccv_dense_matrix_t **)alloca((scale_upto + next * 2) * 4 * sizeof(ccv_dense_matrix_t *));
  memset(pyr, 0, (scale_upto + next * 2) * 4 * sizeof(ccv_dense_matrix_t *));
  if (params.size.height != _cascade[0]->size.height || params.size.width != _cascade[0]->size.width)
    ccv_resample(a, &pyr[0], 0, a->rows * _cascade[0]->size.height / params.size.height, a->cols * _cascade[0]->size.width / params.size.width, CCV_INTER_AREA);
  else
    pyr[0] = a;
  int i, j, k, t, x, y, q;
  for (i = 1; i < ccv_min(params.interval + 1, scale_upto + next * 2); i++)
    ccv_resample(pyr[0], &pyr[i * 4], 0, (int)(pyr[0]->rows / pow(scale, i)), (int)(pyr[0]->cols / pow(scale, i)), CCV_INTER_AREA);
  for (i = next; i < scale_upto + next * 2; i++)
    ccv_sample_down(pyr[i * 4 - next * 4], &pyr[i * 4], 0, 0, 0);
  if (params.accurate)
    for (i = next * 2; i < scale_upto + next * 2; i++)
    {
      ccv_sample_down(pyr[i * 4 - next * 4], &pyr[i * 4 + 1], 0, 1, 0);
      ccv_sample_down(pyr[i * 4 - next * 4], &pyr[i * 4 + 2], 0, 0, 1);
      ccv_sample_down(pyr[i * 4 - next * 4], &pyr[i * 4 + 3], 0, 1, 1);
    }
  ccv_array_t *idx_seq;
  ccv_array_t *seq = ccv_array_new(sizeof(ccv_comp_t), 64, 0);
  ccv_array_t *seq2 = ccv_array_new(sizeof(ccv_comp_t), 64, 0);
  ccv_array_t *result_seq = ccv_array_new(sizeof(ccv_comp_t), 64, 0);
  /* detect in multi scale */
  for (t = 0; t < count; t++)
  {
    ccv_bbf_classifier_cascade_t *cascade = _cascade[t];
    float scale_x = (float)params.size.width / (float)cascade->size.width;
    float scale_y = (float)params.size.height / (float)cascade->size.height;
    ccv_array_clear(seq);
    for (i = 0; i < scale_upto; i++)
    {
      int dx[] = {0, 1, 0, 1};
      int dy[] = {0, 0, 1, 1};
      int i_rows = pyr[i * 4 + next * 8]->rows - (cascade->size.height >> 2);
      int steps[] = {pyr[i * 4]->step, pyr[i * 4 + next * 4]->step, pyr[i * 4 + next * 8]->step};
      int i_cols = pyr[i * 4 + next * 8]->cols - (cascade->size.width >> 2);
      int paddings[] = {pyr[i * 4]->step * 4 - i_cols * 4,
                        pyr[i * 4 + next * 4]->step * 2 - i_cols * 2,
                        pyr[i * 4 + next * 8]->step - i_cols};
      for (q = 0; q < (params.accurate ? 4 : 1); q++)
      {
        unsigned char *u8[] = {pyr[i * 4]->data.u8 + dx[q] * 2 + dy[q] * pyr[i * 4]->step * 2, pyr[i * 4 + next * 4]->data.u8 + dx[q] + dy[q] * pyr[i * 4 + next * 4]->step, pyr[i * 4 + next * 8 + q]->data.u8};
        for (y = 0; y < i_rows; y++)
        {
          for (x = 0; x < i_cols; x++)
          {
            float sum;
            int flag = 1;
            ccv_bbf_stage_classifier_t *classifier = cascade->stage_classifier;
            for (j = 0; j < cascade->count; ++j, ++classifier)
            {
              sum = 0;
              float *alpha = classifier->alpha;
              ccv_bbf_feature_t *feature = classifier->feature;
              for (k = 0; k < classifier->count; ++k, alpha += 2, ++feature)
                sum += alpha[_ccv_run_bbf_feature(feature, steps, u8)];
              if (sum < classifier->threshold)
              {
                flag = 0;
                break;
              }
            }
            if (flag)
            {
              ccv_comp_t comp;
              comp.rect = ccv_rect((int)((x * 4 + dx[q] * 2) * scale_x + 0.5), (int)((y * 4 + dy[q] * 2) * scale_y + 0.5), (int)(cascade->size.width * scale_x + 0.5), (int)(cascade->size.height * scale_y + 0.5));
              comp.neighbors = 1;
              comp.classification.id = t;
              comp.classification.confidence = sum;
              ccv_array_push(seq, &comp);
            }
            u8[0] += 4;
            u8[1] += 2;
            u8[2] += 1;
          }
          u8[0] += paddings[0];
          u8[1] += paddings[1];
          u8[2] += paddings[2];
        }
      }
      scale_x *= scale;
      scale_y *= scale;
    }

    /* the following code from OpenCV's haar feature implementation */
    if (params.min_neighbors == 0)
    {
      for (i = 0; i < seq->rnum; i++)
      {
        ccv_comp_t *comp = (ccv_comp_t *)ccv_array_get(seq, i);
        ccv_array_push(result_seq, comp);
      }
    }
    else
    {
      idx_seq = 0;
      ccv_array_clear(seq2);
      // group retrieved rectangles in order to filter out noise
      int ncomp = ccv_array_group(seq, &idx_seq, _ccv_is_equal_same_class, 0);
      ccv_comp_t *comps = (ccv_comp_t *)ccmalloc((ncomp + 1) * sizeof(ccv_comp_t));
      memset(comps, 0, (ncomp + 1) * sizeof(ccv_comp_t));

      // count number of neighbors
      for (i = 0; i < seq->rnum; i++)
      {
        ccv_comp_t r1 = *(ccv_comp_t *)ccv_array_get(seq, i);
        int idx = *(int *)ccv_array_get(idx_seq, i);

        if (comps[idx].neighbors == 0)
          comps[idx].classification.confidence = r1.classification.confidence;

        ++comps[idx].neighbors;

        comps[idx].rect.x += r1.rect.x;
        comps[idx].rect.y += r1.rect.y;
        comps[idx].rect.width += r1.rect.width;
        comps[idx].rect.height += r1.rect.height;
        comps[idx].classification.id = r1.classification.id;
        comps[idx].classification.confidence = ccv_max(comps[idx].classification.confidence, r1.classification.confidence);
      }

      // calculate average bounding box
      for (i = 0; i < ncomp; i++)
      {
        int n = comps[i].neighbors;
        if (n >= params.min_neighbors)
        {
          ccv_comp_t comp;
          comp.rect.x = (comps[i].rect.x * 2 + n) / (2 * n);
          comp.rect.y = (comps[i].rect.y * 2 + n) / (2 * n);
          comp.rect.width = (comps[i].rect.width * 2 + n) / (2 * n);
          comp.rect.height = (comps[i].rect.height * 2 + n) / (2 * n);
          comp.neighbors = comps[i].neighbors;
          comp.classification.id = comps[i].classification.id;
          comp.classification.confidence = comps[i].classification.confidence;
          ccv_array_push(seq2, &comp);
        }
      }

      // filter out small face rectangles inside large face rectangles
      for (i = 0; i < seq2->rnum; i++)
      {
        ccv_comp_t r1 = *(ccv_comp_t *)ccv_array_get(seq2, i);
        int flag = 1;

        for (j = 0; j < seq2->rnum; j++)
        {
          ccv_comp_t r2 = *(ccv_comp_t *)ccv_array_get(seq2, j);
          int distance = (int)(r2.rect.width * 0.25 + 0.5);

          if (i != j &&
              r1.classification.id == r2.classification.id &&
              r1.rect.x >= r2.rect.x - distance &&
              r1.rect.y >= r2.rect.y - distance &&
              r1.rect.x + r1.rect.width <= r2.rect.x + r2.rect.width + distance &&
              r1.rect.y + r1.rect.height <= r2.rect.y + r2.rect.height + distance &&
              (r2.neighbors > ccv_max(3, r1.neighbors) || r1.neighbors < 3))
          {
            flag = 0;
            break;
          }
        }

        if (flag)
          ccv_array_push(result_seq, &r1);
      }
      ccv_array_free(idx_seq);
      ccfree(comps);
    }
  }

  ccv_array_free(seq);
  ccv_array_free(seq2);

  ccv_array_t *result_seq2;
  /* the following code from OpenCV's haar feature implementation */
  if (params.flags & CCV_BBF_NO_NESTED)
  {
    result_seq2 = ccv_array_new(sizeof(ccv_comp_t), 64, 0);
    idx_seq = 0;
    // group retrieved rectangles in order to filter out noise
    int ncomp = ccv_array_group(result_seq, &idx_seq, _ccv_is_equal, 0);
    ccv_comp_t *comps = (ccv_comp_t *)ccmalloc((ncomp + 1) * sizeof(ccv_comp_t));
    memset(comps, 0, (ncomp + 1) * sizeof(ccv_comp_t));

    // count number of neighbors
    for (i = 0; i < result_seq->rnum; i++)
    {
      ccv_comp_t r1 = *(ccv_comp_t *)ccv_array_get(result_seq, i);
      int idx = *(int *)ccv_array_get(idx_seq, i);

      if (comps[idx].neighbors == 0 || comps[idx].classification.confidence < r1.classification.confidence)
      {
        comps[idx].classification.confidence = r1.classification.confidence;
        comps[idx].neighbors = 1;
        comps[idx].rect = r1.rect;
        comps[idx].classification.id = r1.classification.id;
      }
    }

    // calculate average bounding box
    for (i = 0; i < ncomp; i++)
      if (comps[i].neighbors)
        ccv_array_push(result_seq2, &comps[i]);

    ccv_array_free(result_seq);
    ccfree(comps);
  }
  else
  {
    result_seq2 = result_seq;
  }

  for (i = 1; i < scale_upto + next * 2; i++)
    ccv_matrix_free(pyr[i * 4]);
  if (params.accurate)
    for (i = next * 2; i < scale_upto + next * 2; i++)
    {
      ccv_matrix_free(pyr[i * 4 + 1]);
      ccv_matrix_free(pyr[i * 4 + 2]);
      ccv_matrix_free(pyr[i * 4 + 3]);
    }
  if (params.size.height != _cascade[0]->size.height || params.size.width != _cascade[0]->size.width)
    ccv_matrix_free(pyr[0]);

  return result_seq2;
}

ccv_bbf_classifier_cascade_t *ccv_bbf_read_classifier_cascade(const char *directory)
{
  char buf[1024];
  sprintf(buf, "%s/cascade.txt", directory);
  int s, i;
  FILE *r = fopen(buf, "r");
  if (r == 0)
    return 0;
  ccv_bbf_classifier_cascade_t *cascade = (ccv_bbf_classifier_cascade_t *)ccmalloc(sizeof(ccv_bbf_classifier_cascade_t));
  s = fscanf(r, "%d %d %d", &cascade->count, &cascade->size.width, &cascade->size.height);
  assert(s > 0);
  cascade->stage_classifier = (ccv_bbf_stage_classifier_t *)ccmalloc(cascade->count * sizeof(ccv_bbf_stage_classifier_t));
  for (i = 0; i < cascade->count; i++)
  {
    sprintf(buf, "%s/stage-%d.txt", directory, i);
    if (_ccv_read_bbf_stage_classifier(buf, &cascade->stage_classifier[i]) < 0)
    {
      cascade->count = i;
      break;
    }
  }
  fclose(r);
  return cascade;
}

ccv_bbf_classifier_cascade_t *ccv_bbf_classifier_cascade_read_binary(char *s)
{
  int i;
  ccv_bbf_classifier_cascade_t *cascade = (ccv_bbf_classifier_cascade_t *)ccmalloc(sizeof(ccv_bbf_classifier_cascade_t));
  memcpy(&cascade->count, s, sizeof(cascade->count));
  s += sizeof(cascade->count);
  memcpy(&cascade->size.width, s, sizeof(cascade->size.width));
  s += sizeof(cascade->size.width);
  memcpy(&cascade->size.height, s, sizeof(cascade->size.height));
  s += sizeof(cascade->size.height);
  ccv_bbf_stage_classifier_t *classifier = cascade->stage_classifier = (ccv_bbf_stage_classifier_t *)ccmalloc(cascade->count * sizeof(ccv_bbf_stage_classifier_t));
  for (i = 0; i < cascade->count; i++, classifier++)
  {
    memcpy(&classifier->count, s, sizeof(classifier->count));
    s += sizeof(classifier->count);
    memcpy(&classifier->threshold, s, sizeof(classifier->threshold));
    s += sizeof(classifier->threshold);
    classifier->feature = (ccv_bbf_feature_t *)ccmalloc(classifier->count * sizeof(ccv_bbf_feature_t));
    classifier->alpha = (float *)ccmalloc(classifier->count * 2 * sizeof(float));
    memcpy(classifier->feature, s, classifier->count * sizeof(ccv_bbf_feature_t));
    s += classifier->count * sizeof(ccv_bbf_feature_t);
    memcpy(classifier->alpha, s, classifier->count * 2 * sizeof(float));
    s += classifier->count * 2 * sizeof(float);
  }
  return cascade;
}

int ccv_bbf_classifier_cascade_write_binary(ccv_bbf_classifier_cascade_t *cascade, char *s, int slen)
{
  int i;
  int len = sizeof(cascade->count) + sizeof(cascade->size.width) + sizeof(cascade->size.height);
  ccv_bbf_stage_classifier_t *classifier = cascade->stage_classifier;
  for (i = 0; i < cascade->count; i++, classifier++)
    len += sizeof(classifier->count) + sizeof(classifier->threshold) + classifier->count * sizeof(ccv_bbf_feature_t) + classifier->count * 2 * sizeof(float);
  if (slen >= len)
  {
    memcpy(s, &cascade->count, sizeof(cascade->count));
    s += sizeof(cascade->count);
    memcpy(s, &cascade->size.width, sizeof(cascade->size.width));
    s += sizeof(cascade->size.width);
    memcpy(s, &cascade->size.height, sizeof(cascade->size.height));
    s += sizeof(cascade->size.height);
    classifier = cascade->stage_classifier;
    for (i = 0; i < cascade->count; i++, classifier++)
    {
      memcpy(s, &classifier->count, sizeof(classifier->count));
      s += sizeof(classifier->count);
      memcpy(s, &classifier->threshold, sizeof(classifier->threshold));
      s += sizeof(classifier->threshold);
      memcpy(s, classifier->feature, classifier->count * sizeof(ccv_bbf_feature_t));
      s += classifier->count * sizeof(ccv_bbf_feature_t);
      memcpy(s, classifier->alpha, classifier->count * 2 * sizeof(float));
      s += classifier->count * 2 * sizeof(float);
    }
  }
  return len;
}

void ccv_bbf_classifier_cascade_free(ccv_bbf_classifier_cascade_t *cascade)
{
  int i;
  for (i = 0; i < cascade->count; ++i)
  {
    ccfree(cascade->stage_classifier[i].feature);
    ccfree(cascade->stage_classifier[i].alpha);
  }
  ccfree(cascade->stage_classifier);
  ccfree(cascade);
}