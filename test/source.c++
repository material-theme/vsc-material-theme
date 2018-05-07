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

static inline int _ccv_run_bbf_feature(ccv_bbf_feature_t* feature, int* step, unsigned char** u8)
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

static int _ccv_read_bbf_stage_classifier(const char* file, ccv_bbf_stage_classifier_t* classifier)
{
  FILE* r = fopen(file, "r");
  if (r == 0) return -1;
  int stat = 0;
  stat |= fscanf(r, "%d", &classifier->count);
  union { float fl; int i; } fli;
  stat |= fscanf(r, "%d", &fli.i);
  classifier->threshold = fli.fl;
  classifier->feature = (ccv_bbf_feature_t*)ccmalloc(classifier->count * sizeof(ccv_bbf_feature_t));
  classifier->alpha = (float*)ccmalloc(classifier->count * 2 * sizeof(float));
  int i, j;
  for (i = 0; i < classifier->count; i++)
  {
    stat |= fscanf(r, "%d", &classifier->feature[i].size);
    for (j = 0; j < classifier->feature[i].size; j++)
    {
      stat |= fscanf(r, "%d %d %d", &classifier->feature[i].px[j], &classifier->feature[i].py[j], &classifier->feature[i].pz[j]);
      stat |= fscanf(r, "%d %d %d", &classifier->feature[i].nx[j], &classifier->feature[i].ny[j], &classifier->feature[i].nz[j]);
    }
    union { float fl; int i; } flia, flib;
    stat |= fscanf(r, "%d %d", &flia.i, &flib.i);
    classifier->alpha[i * 2] = flia.fl;
    classifier->alpha[i * 2 + 1] = flib.fl;
  }
  fclose(r);
  return 0;
}

#ifdef HAVE_GSL