export default {
	routes: [
		{
      path: "/server_unavailable",
      name: 'Server Unavailable',
      component: () => import(/* webpackChunkName: "server-unavailable" */ "@/engine/pages/system/ServerUnavailable")
    },
    {
      path: "/:catchAll(.*)",
      name: 'Page Not Found',
      component: () => import(/* webpackChunkName: "page-not-found" */ "@/engine/pages/system/NotFound")
    }
	],
	beforeEach() {
    
	},
	afterEach() {
		
	}
}