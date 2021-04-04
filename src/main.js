// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import App from "./App";
import router from "./router";
import Vuex from 'vuex';
import 'es6-promise/auto';
import store from './store'


Vue.use(Vuex);

// alert 套件
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
// slick 套件
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

// Loading 套件
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

// type 套件
import VueTypedJs from 'vue-typed-js'

Vue.use(VueTypedJs);
Vue.use(VueSweetalert2);
Vue.use(VueAxios, axios);
Vue.component("VueSlickCarousel", VueSlickCarousel);
Vue.component("Loading", Loading);

import AOS from 'aos'
import 'aos/dist/aos.css'
Vue.prototype.aos = AOS;

axios.defaults.withCredentials = true;
Vue.config.productionTip = false;


router.beforeEach(async(to, from, next) => {
  
  // to: Route: 即將要進入的目標 路由物件
  // from: Route: 當前導航正要離開的路由
  // next: Function: 一定要呼叫該方法來 resolve 這個鉤子。執行效果依賴 next 方法的呼叫引數。

  // 未登入狀態；當路由到route指定頁時，跳轉至login
  const route = ['admin'];
  const apiUrl = `${process.env.APIPATH}/api/login`;
    await axios.get(apiUrl).then(async(response) => {
      if (route.indexOf(to.path.split('/')[1]) >= 0) {
        console.log("VUEXlogin", response.data);
        console.log('emailVerified', response.data.userInfo.emailVerified);
        
        if (!response.data.success) {
          console.log('沒有登入狀態');
          await router.push('/login');
          
        }
      }
      // 已登入狀態；當路由到login時，跳轉至home 
        if (response.data.success && to.name === 'Login') {
        console.log('Login');
          await router.push({ path: '/admin/center', });
        }
      
    });
  
  next();
});


/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: {
    App
  },
  template: "<App/>"
});
