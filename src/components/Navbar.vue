<template>
  <div class="navWrap">
    <div class="logo">
      <router-link to="/home">
        <img src="../assets/img/logo_black.png" alt />
      </router-link>
    </div>
    <ul class="nav">
      <li>
        <router-link to="/home">HOME</router-link>
      </li>
      <li>
        <router-link to="/giveslist">GIVEs</router-link>
      </li>
      <li>
        <router-link to="/admin/wishlist">
          <i class="far fa-heart">
            <div class="heartAmount">{{getWish()}}</div>
          </i>
        </router-link>
      </li>
      <!-- <li>
        <i class="fas fa-search"></i>
      </li>-->
      <li @click="LoginorCenter">
        <i class="far fa-user-circle"></i>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      wishGoods: []
    };
  },
  methods: {
    LoginorCenter() {
      const apiUrl = `${process.env.APIPATH}/api/login`;
      const vm = this;
      this.$http.get(apiUrl).then(response => {
        //console.log(response.data);
        if (response.data.success == false) {
          vm.$router.push("/login");
        } else {
          vm.$router.push("/admin/center");
        }
      });
    },
    getWishGoods() {
      this.isLoading = true;
      let apiUrl = `${process.env.APIPATH}/api/like`;
      this.$http.get(apiUrl).then(response => {
        console.log(response.data);
        this.wishGoods = response.data.likes;
      });
    },
    //分類的總數
    getWish() {
      let ammount = 0;
      let newWish = [];
      const vm = this;
      if (vm.wishGoods) {
        //console.log(vm.goods.length);
        ammount = vm.wishGoods.length;
        // console.log("ammount", ammount);
      }
      return ammount;
    }
  },
  created() {
    // this.LoginorCenter();
    this.getWishGoods();
  }
};
</script>
<style scoped>
ul > li > a {
  color: #4c4c4c;
}
ul > li a:hover {
  color: #000;
}
</style>
