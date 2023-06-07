import * as VueRouter from 'vue-router';
import PageLoader from './helpers/PageLoader';

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory('/'),
  routes: [{ path: '/:pathMatch(.*)*', component: PageLoader }]
});

export default router;
