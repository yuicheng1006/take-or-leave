<template>
  <div class="rightSide">
    <loading :active.sync="isLoading"></loading>
    <h2>個人帳戶管理</h2>
    <div class="divider"></div>
    <div class="accountWrap">
      <div class="accountInfo">
        <span>帳號</span>
        <span>{{ tempAdmin.email }}</span>
      </div>
      <div class="accountInfo">
        <span>會員名稱</span>
        <input type="text" v-model="tempAdmin.displayName" />
      </div>
      <div class="accountInfo">
        <span>行動電話</span>
        <input type="text" v-model="tempAdmin.phone" />
      </div>

      <div class="accountInfo">
        <span>LINE ID</span>
        <input type="text" v-model="tempAdmin.lineID" />
      </div>
      <button class="accountBtn" @click="editInfo">確認修改</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      getAdminInfo: [],
      tempAdmin: {
        displayName: "",
      },
      isLoading: true,
    };
  },
  methods: {
    getAdmin() {
      let apiUrl = `${process.env.APIPATH}/api/user?isPassword=false`;
      let vm = this;
      this.$http.get(apiUrl).then((response) => {
        if (response.data.success) {
          // console.log(response.data.userInfo);
          vm.tempAdmin = response.data.userInfo;
          vm.getAdminInfo = response.data.userInfo;
          console.log("vm.getAdminInfo", vm.getAdminInfo);
        }
      });
    },
    editInfo() {
      let apiUrl = `${process.env.APIPATH}/api/user?isPassword=false`;
      let vm = this;
      vm.$http.put(apiUrl, vm.tempAdmin).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          this.$swal("更新成功嚕！", "", "success");
          vm.getAdmin();
        } else {
          vm.getAdmin();
          this.$swal({
            type: "error",
            title: "Oops",
            text: "更新失敗",
          });
        }
      });
    },
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  },
  created() {
    this.getAdmin();
  },
};
</script>
<style scoped>
.accountInfo input {
  color: #4c4c4c;
}
</style>