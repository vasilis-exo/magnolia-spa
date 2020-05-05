import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import PageLoader from './helpers/PageLoader.vue';

Vue.config.productionTip = false;
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: '/magnoliaAuthor/vue-minimal',
  routes: [{ path: '*', component: PageLoader }],
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
