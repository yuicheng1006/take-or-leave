<template>
  <div class="leftSide">
    <ul class="memberList">
      <li class="mli memberCenter active">會員中心</li>
      <li class="mli memberInfo">
        基本資料
        <ul class="memberInfoList">
          <li class="memberModify">
            <router-link to="/admin/membermodify">個人帳戶管理</router-link>
          </li>
          <li class="memberModifyPassword">
            <router-link to="/admin/membermodifypassword">密碼修改</router-link>
          </li>
        </ul>
      </li>

      <li class="mli orderList">
        訂單查詢
        <ul class="memberEachOrder">
          <li class="myGivesOrder">
            <router-link to="/admin/giveorder">我的送物</router-link>
          </li>
          <li class="myGetOrder">
            <router-link to="/admin/getorder">我的取物</router-link>
          </li>
        </ul>
      </li>
      <li class="mli wishList">
        <router-link to="/admin/wishlist">追蹤清單</router-link>
      </li>
      <li class="mli memberShelves">
        <router-link to="/admin/givesshelves">我的送物</router-link>
      </li>
      <li class="mli logOut" @click="signout">會員登出</li>
    </ul>
  </div>
</template>

<script>
const auth = firebase.auth();

export default {
  data() {
    return {};
  },
  methods: {
    signout() {
      console.log("登出");
      auth.signOut().then(() => {
        this.axios.post(`${process.env.APIPATH}/api/logout`).then(response => {
          setTimeout(() => {}, 1000);
          console.log(response.data);
          if (response.data.success) {
            this.$swal("登出成功：）");
            this.$router.push("/home");
          }
        });
      });
    }
  }
};
</script>

<style scoped>
.mli a {
  color: #4c4c4c;
}
.mli a:hover {
  color: #000;
}
.mli > ul > li a {
  color: #4c4c4c;
}
.mli > ul > li a:hover {
  color: #000;
}
</style>
