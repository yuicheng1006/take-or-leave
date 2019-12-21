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
        <i class="far fa-heart">
          <div class="heartAmount">0</div>
        </i>
      </li>
      <li>
        <i class="fas fa-search"></i>
      </li>
      <li @click="LoginorCenter">
        <i class="far fa-user-circle"></i>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {};
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
    }
  },
  created() {
    // this.LoginorCenter();
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
