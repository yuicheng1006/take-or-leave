<template>
  <div class="wrap">
    <Navbar />

    <div class="logWrap">
      <div class="accountLink">
        <h4>HOME</h4>
        <h4>/</h4>
        <span>account</span>
      </div>
      <h2>取物者資料</h2>
      <span class="accountLine"></span>
      <div class="formWrap">
        <div class="leftForm">
          <div class="givesNo">
            <span>送物編號</span>
            <span>{{getInfoID()}}</span>
          </div>
          <div class="givesNo">
            <span>送物名稱</span>
            <span>{{goods.title}}</span>
          </div>
        </div>
        <div class="getGivesLine"></div>
        <div class="rightForm">
          <div class="givesNo">
            <span>姓名</span>
            <input type="text" v-model="userForm.name" />
          </div>
          <div class="givesNo">
            <span>聯絡電話</span>
            <input type="text" v-model="userForm.phone" />
          </div>
          <div class="givesNo">
            <span>LINE ID</span>
            <input type="text" v-model="userForm.lineID" />
          </div>
          <div class="givesNo">
            <span>取物說明</span>
            <textarea type="text" cols="21" rows="3" v-model="userForm.message" />
          </div>
          <button class="formBtn" @click="postForm">確認送出</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../Navbar";
export default {
  components: {
    Navbar
  },
  data() {
    return {
      goods: [],
      isLoading: false,
      user: {},
      userForm: {
        phone: "",
        lineID: "",
        name: ""
      }
    };
  },
  methods: {
    getUser() {
      const apiUrl = `${process.env.APIPATH}/api/user`;
      const vm = this;
      console.log(vm.$route.params.goods_id);
      this.$http.get(apiUrl).then(response => {
        console.log(response.data);
        if (response.data.success) {
          vm.user = response.data.userInfo;
          vm.userForm.product_id = vm.$route.params.goods_id;
          console.log(vm.user.displayName);
          vm.userForm.lineID = vm.user.lineID;
          vm.userForm.phone = vm.user.phone;
          vm.userForm.name = vm.user.displayName;
          console.log("login", response.data);
        }
      });
    },
    getGoods() {
      const vm = this;
      vm.isLoading = true;
      const apiUrl = `${process.env.APIPATH}/api/products`;
      let goods_id = this.$route.params.goods_id; //抓路由的 id
      console.log("goods_id", goods_id);
      //抓路由 id 塞對應的資料
      this.$http.get(apiUrl).then(response => {
        response.data.products.forEach(products => {
          if (goods_id == products.id) {
            let oneGoodInfo = products;
            vm.goods = oneGoodInfo;
          }
        });
      });
    },
    getInfoID() {
      let goodID = this.goods.id.split("-", 1);
      return goodID[0];
    },
    postForm() {
      const apiUrl = `${process.env.APIPATH}/api/order`;
      const vm = this;
      this.$http.post(apiUrl, vm.userForm).then(response => {
        console.log(response.data);
        if (response.data.success) {
          this.$swal("送出成功！", "", "success");
          vm.$router.push("/admin/getorder");
        } else {
          this.$swal({
            type: "error",
            title: "Oops",
            text: "不能下標自己商品喇～"
          });
        }
      });
    },
    getLogInStatus() {
      const apiUrl = `${process.env.APIPATH}/api/login`;
      const vm = this;
      this.$http.get(apiUrl).then(response => {
        console.log("login", response.data);
        if (!response.data.success) {
          this.$router.push("/home");
        }
      });
    }
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  },
  created() {
    this.getUser();

    this.getGoods();
    this.getLogInStatus();
  }
};
</script>