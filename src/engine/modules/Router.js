import { createWebHistory, createRouter } from "vue-router";
import PageController from '@/engine/modules/PageController.js'
import Debug from '@/engine/modules/Debug.js'
import User from '@/engine/modules/User.js'
import config from '@/config.js'

import IndexPages from '@/engine/modules/router/index.js'
import NotFoundPages from '@/engine/modules/router/notfound.js'

export default{
  _routeBlock: [],
  addBlockListener(func){ this._routeBlock.push(func); },
  removeBlockListener(func){ this._routeBlock = this._routeBlock.filter(f => f != func); },
  isRouteBlocked(to, from){
    let blocked = false;
    this._routeBlock.forEach(f => {
      if(f(to, from)) blocked = true;
    });

    return blocked;
  },
  setup(){
    const AppPages = this.getSubDomainPages();

    const router = createRouter({
      history: createWebHistory(),
      routes: AppPages.routes
    });

    router.beforeEach((to, from, _next) => {
      let next = (options) => {
        if(options == undefined) Debug.custom('Router', 'Page navigation allowed!');
        else if(options === false) Debug.custom('Router', 'Page navigation blocked');
        else Debug.custom('Router', `Page redirecting to: ${options.path}`);
        _next(options);
        return true;
      };

      if (this.isRouteBlocked(to, from)) next(false);
      else if (AppPages.beforeEach(to, from, next)) next()
      else if (config.router.AllowUnAuthed.indexOf(to.path) == -1 && !User.isLogined()) next({ path: '/app/welcome' });
      else if (config.router.OnlyUnAuthed.indexOf(to.path) != -1 && User.isLogined()) next({ path: '/app' });
      else next()
    });
  
    router.afterEach((to, from) => {
      AppPages.afterEach(to, from);
      PageController.subPageMounted();
    });

    return router;
  },
  getSubDomainPages(){
    const host = window.location.host;
    const parts = host.split('.');
    const domainLength = 3;
  
    if (parts.length === (domainLength - 1) || parts.length === (domainLength - 2) || parts[0] === 'www') return IndexPages;
    else if (parts[0] === 'app') return IndexPages;
    else return NotFoundPages;
  }
}