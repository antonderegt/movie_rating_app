// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App';
import router from './router';
//import VueSweetalert2 from 'vue-sweetalert2'

Vue.config.productionTip = false;
Vue.use(Vuetify);
//Vue.use(VueSweetalert2);

/* eslint-disable */
new Vue({
 el: '#app',
 router,
 template: '<App/>',
 components: { App },
});

require('./assets/stylesheets/main.scss')

