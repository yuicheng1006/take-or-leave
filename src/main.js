// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import App from "./App";
import router from "./router";

// alert 套件
import VueSweetalert2 from "vue-sweetalert2";

import "sweetalert2/dist/sweetalert2.min.css";

Vue.use(VueSweetalert2);



// Loading 套件
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

Vue.component("Loading", Loading);

Vue.use(VueAxios, axios);

axios.defaults.withCredentials = true;

Vue.config.productionTip = false;


// alert 套件
// const options = {
//   confirmButtonColor: "#41b882",
//   cancelButtonColor: "#ff7674"
// };

// Vue.use(VueSweetalert2, options);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: {
    App
  },
  template: "<App/>"
});
