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
