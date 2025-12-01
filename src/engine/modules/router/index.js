import state from '@/state.js'
import Storage from '@/engine/modules/Storage.js'

export default {
	routes: [
    {
      path: '/',
      name: 'p_main',
      // component: () => import(/* webpackChunkName: "nfitnity-site" */ "@/engine/pages/Main")
      component: () => import(/* webpackChunkName: "nfitnity-site" */ "@/engine/pages/b2b/Home")
    },
    {
      path: '/registration',
      name: 'p_reg',
      component: () => import(/* webpackChunkName: "nfitnity-reg" */ "@/engine/pages/Registration")
    },
    {
      path: '/get',
      name: 'p_get_app',
      component: () => import(/* webpackChunkName: "nfitnity-get" */ "@/engine/pages/GetApp")
    },
    // {
    //   path: '/corporate',
    //   name: 'p_b2b',
    //   component: () => import(/* webpackChunkName: "nfitnity-b2b" */ "@/engine/pages/b2b/Home")
    // },
    {
      path: '/corporate/health',
      name: 'l_b2b_health',
      component: () => import(/* webpackChunkName: "nfitnity-health" */ "@/engine/pages/b2b/Health")
    },

    /**
     * App
     */
    {
      path: '/app',
      name: 'nFitnity Application',
      component: () => import(/* webpackChunkName: "nfitnity-app" */ "@/engine/pages/app/main"),
    },
    {
      path: '/app/welcome',
      name: 'app_welcome',
      component: () => import(/* webpackChunkName: "app-welcome" */ "@/engine/pages/app/welcome"),
    },
    {
      path: '/app/main',
      name: 'app_main',
      component: () => import(/* webpackChunkName: "app-main" */ "@/engine/pages/app/main"),
    },
    {
      path: '/app/awards',
      name: 'app_awards',
      component: () => import(/* webpackChunkName: "app-awards" */ "@/engine/pages/app/awards"),
    },
    {
      path: '/app/code',
      name: 'app_code',
      component: () => import(/* webpackChunkName: "app-code" */ "@/engine/pages/app/code"),
    },
    {
      path: '/app/forgot',
      name: 'app_forgot',
      component: () => import(/* webpackChunkName: "app-forgot" */ "@/engine/pages/app/forgot"),
    },
    {
      path: '/app/loader',
      name: 'app_loader',
      component: () => import(/* webpackChunkName: "app-loader" */ "@/engine/pages/app/loader"),
    },
    {
      path: '/app/login',
      name: 'app_login',
      component: () => import(/* webpackChunkName: "app-login" */ "@/engine/pages/app/login"),
    },
    {
      path: '/app/params',
      name: 'app_params',
      component: () => import(/* webpackChunkName: "app-params" */ "@/engine/pages/app/params"),
    },
    {
      path: '/app/session',
      name: 'app_session',
      component: () => import(/* webpackChunkName: "app-session" */ "@/engine/pages/app/session"),
    },
    {
      path: '/app/exercise/change',
      name: 'app_exercise_change',
      component: () => import(/* webpackChunkName: "app-exercise-change" */ "@/engine/pages/app/exercise/change"),
    },
    {
      path: '/app/signup',
      name: 'app_signup',
      component: () => import(/* webpackChunkName: "app-signup" */ "@/engine/pages/app/signup"),
    },
    {
      path: '/app/reg',
      name: 'app_registration',
      component: () => import(/* webpackChunkName: "app-registration" */ "@/engine/pages/app/reg"),
    },
    {
      path: '/app/profile',
      name: 'app_profile',
      component: () => import(/* webpackChunkName: "app-profile" */ "@/engine/pages/app/profile/index"),
    },
    {
      path: '/app/profile/edit',
      name: 'app_profile_edit',
      component: () => import(/* webpackChunkName: "app-profile_edit" */ "@/engine/pages/app/profile/edit"),
    },
    {
      path: '/app/settings',
      name: 'app_settings',
      component: () => import(/* webpackChunkName: "app-settings" */ "@/engine/pages/app/settings/index"),
    },
    {
      path: '/app/settings/edit',
      name: 'app_settings_edit',
      component: () => import(/* webpackChunkName: "app-settings_edit" */ "@/engine/pages/app/settings/edit"),
    },
    {
      path: '/app/guide',
      name: 'app_guide',
      component: () => import(/* webpackChunkName: "app-guide" */ "@/engine/pages/app/guide/index"),
    },
    {
      path: '/app/logs',
      name: 'app_logs',
      component: () => import(/* webpackChunkName: "app-logs" */ "@/engine/pages/app/logs/index"),
    },
    {
      path: '/app/ai-coach',
      name: 'app_ai_coach',
      component: () => import(/* webpackChunkName: "app-ai-coach" */ "@/engine/pages/app/ai-coach"),
    },
    /* Errors */
    {
      path: "/:catchAll(.*)",
      name: 'Page Not Found',
      component: () => import(/* webpackChunkName: "page-not-found" */ "@/engine/pages/system/NotFound")
    }
  ],
  beforeEach(to, from, next) {
    // Проверяем онбординг СИНХРОННО через Storage напрямую
    const hasCompletedOnboarding = Storage.get('onboarding_completed', true) === 'true';

    // Список страниц, которые разрешены БЕЗ завершения онбординга
    const allowedWithoutOnboarding = [
      '/app/welcome',
      '/app/ai-coach',
      '/app/login',
      '/app/signup',
      '/app/reg',
      '/app/code',
      '/app/forgot',
      '/app/loader'
    ];

    // Проверяем: если онбординг не завершен И пользователь пытается попасть на защищенную страницу
    if (!hasCompletedOnboarding &&
        to.path.startsWith('/app') &&
        !allowedWithoutOnboarding.includes(to.path)) {
      // БЛОКИРУЕМ переход и перенаправляем на welcome
      console.log('🚫 Navigation blocked: Onboarding not completed. Redirecting to /app/welcome');
      next('/app/welcome');
    } else {
      // Разрешаем навигацию
      next();
    }
  },
  afterEach(to) {
    if(to.fullPath.indexOf('/app') !== -1) state.app.active = true;
    else state.app.active = false;
  }
}
