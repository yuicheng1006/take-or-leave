<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  // created() {
  //   const apiUrl = `${process.env.APIPATH}/api/products?page=1`;
  //   // API 伺服器的路徑
  //   // 所申請的 APIPath
  //   console.log(process.env.APIPATH);
  //   this.$http.get(apiUrl).then(response => {
  //     console.log(response.data);
  //   });
  // }
};
</script>

<style>
@import "../src/assets/css/reset.css";
@import "../src/assets/css/animate.css";
@import "../src/assets/css/style.css";
@import "../src/assets/css/mediaqueries.css";

@import url("https://pro.fontawesome.com/releases/v5.11.1/css/all.css");
</style>
