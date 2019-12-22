<template>
  <div class="rightSide">
    <h2>密碼修改</h2>
    <div class="divider"></div>
    <div class="accountWrap">
      <div class="accountInfo">
        <span>請輸入新密碼</span>
        <input type="password" v-model="tempPassword.newPassword" />
      </div>
      <span class="passErr">{{passErrMsg}}</span>
      <div class="accountInfo">
        <span>新密碼再確認</span>
        <input type="password" v-model="tempPassword.newPasswordConfirm" />
      </div>

      <button class="accountBtn" @click="editPassword">確認修改</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      getAdminInfo: {},
      tempPassword: {
        newPassword: "",
        newPasswordConfirm: ""
      },
      passwordError: false,
      passErrMsg: ""
    };
  },
  watch: {
    tempPassword: {
      handler(value) {
        //密碼驗證
        let isPassword = /^[a-zA-Z0-9]+$/;
        let inclde = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;
        if (value.newPassword == "") {
          this.passwordError = false;
          this.passErrMsg = "";
        } else if (!isPassword.test(value.newPassword)) {
          this.passwordError = true;
          this.passErrMsg = "請勿包含特殊字元";
        } else if (value.newPassword.length < 12) {
          this.passwordError = true;
          this.passErrMsg = "請勿少於12個字";
        } else if (value.newPassword.length > 16) {
          this.passwordError = true;
          this.passErrMsg = "請勿超過16個字";
        } else {
          this.passwordError = false;
          this.passErrMsg = "";
        }
      },
      deep: true
    }
  },

  methods: {
    getAdmin() {
      let apiUrl = `${process.env.APIPATH}/api/user?isPassword=true`;
      let vm = this;
      this.$http.get(apiUrl).then(response => {
        if (response.data.success) {
          console.log(response.data);
          vm.getAdminInfo = response.data.userInfo;

          console.log("vm.getAdminInfo", vm.getAdminInfo);
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
    },
    editPassword() {
      let apiUrl = `${process.env.APIPATH}/api/user?isPassword=true`;
      let vm = this;
      vm.$http.put(apiUrl, vm.tempPassword).then(response => {
        console.log(response.data);
        if (response.data.success) {
          this.$swal("更新成功嚕！", "", "success");
          vm.getAdmin();
        } else {
          vm.getAdmin();
          this.$swal({
            type: "error",
            title: "Oops",
            text: "更新失敗"
          });
        }
      });
    }
  },
  created() {
    this.getAdmin();
    this.getLogInStatus();
  }
};
</script>
<style scoped>
.passErr {
  font-size: 14px;
  color: red;
  margin-left: 200px;
}
</style>