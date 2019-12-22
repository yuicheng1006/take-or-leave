<template>
  <div class="wrap">
    <Navbar />
    <div class="logWrap">
      <div class="accountLink">
        <h4>HOME</h4>
        <h4>/</h4>
        <span>account</span>
      </div>
      <h2>密碼修改</h2>
      <div class="logInfo">
        <h4>新的密碼</h4>
        <input type="email" v-model="resetEmail" />
      </div>
      <button class="sendBtn mailPwdBtn" @click="forgetPassword">送出</button>
    </div>
  </div>
</template>

<script>
import Navbar from "../Navbar";

const auth = firebase.auth();
console.log("auth: ", auth);

export default {
  data: {
    return: {
      resetEmail: ""
    }
  },
  components: {
    Navbar
  },
  methods: {
    forgetPassword() {
      auth
        .sendPasswordResetEmail(this.resetEmail)
        .then(() => {
          this.$swal("請至信箱更改密碼", "", "success");
          this.$router.push("/login");
        })
        .catch(err => {
          let { message } = err;
          if (err.code === "auth/user-not-found") {
            this.$swal({
              type: "error",
              title: "Oops",
              text: "查無此信箱"
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
  created() {
    this.getLogInStatus();
  }
};
</script>