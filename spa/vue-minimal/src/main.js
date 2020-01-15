import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import PageWrapper from './components/PageWrapper.vue';

Vue.config.productionTip = false;
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: '/magnoliaAuthor',
  routes: [{ path: '/vue-demo', component: PageWrapper }, { path: '/vue-demo/contact', component: PageWrapper }]
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
