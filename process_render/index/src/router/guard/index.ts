import type { Router, RouteLocationNormalized } from 'vue-router';
import { unref } from 'vue';

export function createProgressGuard(router: Router) {
    // const { getOpenNProgress } = useTransitionSetting();
    router.beforeEach(async (to) => {
      if (to.meta.loaded) {
        return true;
      }
    //   unref(getOpenNProgress) && nProgress.start();
      return true;
    });
  
    router.afterEach(async () => {
    //   unref(getOpenNProgress) && nProgress.done();
      return true;
    });
  }