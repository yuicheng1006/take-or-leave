<template>
  <div class="navWrap">
    <div class="navWrap-nav">
      <div class="logo">
        <router-link to="/home">
          <img
            src="../assets/img/take-or-leave.png"
            alt="take-or-leave"
          />
        </router-link>
      </div>
      <!-- 電腦版選單 -->
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
              <div class="heartAmount">{{ getWish() }}</div>
            </i>
          </router-link>
        </li>
        <!-- <li>
          <i class="fas fa-search"></i>
        </li>-->
        <li>
          <router-link to="/login">
            <i class="far fa-user-circle"></i>
          </router-link>
        </li>
      </ul>
      <!-- 手機選單 -->

      <div class="mobile-nav">
        <div class="mobile-nav-wrap">
          <p>
            <router-link to="/giveslist">GIVEs</router-link>
          </p>
          <div @click="toggleMenu">
            <i class="far fa-user-circle"></i>
          </div>
        </div>
      </div>
      <ul
        class="ham-menu"
        :class="{ active: showMenu }"
      >
        <li
          v-for="(link, index) in $store.state.link"
          :key="index"
        >
          <span @click="toggleSubNav(link.title)">
            {{ !link.link ? link.title : "" }}
          </span>
          <span @click="toggleMenu">
            <router-link
              :to="link.link"
              v-if="link.link"
            >{{
            link.title
          }}</router-link>
          </span>
          <!-- 子選單 -->
          <ul
            v-for="(subNav, index) in subNav"
            :key="index"
            v-if="link.title===menuSubNav && showSubNav"
          >
            <li @click="toggleMenu">
              <router-link :to="subNav.path">
                {{subNav.title}}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      wishGoods: [],
      menu: [],
      subNav: [],
      showMenu: false,
      menuSubNav: "",
      showSubNav: false,
    };
  },
  methods: {
    toggleMenu() {
      const apiUrl = `${process.env.APIPATH}/api/login`;
      const vm = this;
      this.$http.get(apiUrl).then((response) => {
        //console.log(response.data);
        if (response.data.success == false) {
          vm.$router.push("/login");
        } else {
          this.showMenu = !this.showMenu;
          this.showSubNav = false;
        }
      });
    },
    toggleSubNav(value) {
      console.log("this.subNav", this.subNav);
      this.$store.state.link.map((link) => {
        if (value === link.title) {
          this.menuSubNav = link.title;
          this.subNav = link.subNav;
          this.showSubNav = true;
        }
      });
    },
    getWishGoods() {
      this.isLoading = true;
      let apiUrl = `${process.env.APIPATH}/api/like`;
      this.$http.get(apiUrl).then((response) => {
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
    },
  },
  created() {
    // this.LoginorCenter();
    this.getWishGoods();
  },
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
