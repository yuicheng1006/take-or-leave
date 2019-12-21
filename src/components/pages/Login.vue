<template>
  <div class="wrap">
    <a name="HEAD"></a>
    <Navbar />
    <div class="logWrap">
      <div class="accountLink">
        <h4>HOME</h4>
        <h4>/</h4>
        <span>account</span>
      </div>
      <h2>ACCOUNT</h2>
      <span class="accountLine"></span>
      <h3>Login</h3>
      <div class="logInfo">
        <h4>Email address</h4>
        <input type="text" v-model="user.email" />
        <h4>Password</h4>
        <input type="password" v-model="user.password" />
      </div>
      <div class="fgtPSD" @click="forgetPassword">
        <span>Lost your password?</span>
      </div>
      <button class="sendBtn logInBtn" @click="logIn">SIGN IN</button>
      <div class="logBrWrap">
        <div class="logBr"></div>
        <span>OR</span>
        <div class="logBr"></div>
      </div>
      <h5 @click="toCreatAccount">CREATE AN ACCOUNT</h5>
    </div>
  </div>
</template>

<script>
import Navbar from "../Navbar";

const auth = firebase.auth();
console.log("auth: ", auth);

export default {
  components: {
    Navbar
  },
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      resetEmail: ""
    };
  },
  methods: {
    logIn() {
      let vm = this;
      // sign in
      // console.log(this.user);
      auth
        .signInWithEmailAndPassword(vm.user.email, vm.user.password)
        .then(response => {
          response.user.getIdToken().then(idToken => {
            console.log(idToken);
            this.axios
              .post(`${process.env.APIPATH}/api/login`, { idToken })
              .then(res => {
                console.log(res.data);
                if (res.data.success) {
                  this.$swal("登入成功", "", "success");
                  vm.$router.push("/admin/center");
                }
                if (!res.data.userInfo.emailVerified) {
                  this.$swal({
                    type: "error",
                    title: "Oops",
                    text: "請至信箱驗證"
                  });
                }
              });
          });
        })
        .catch(err => {
          console.log(err);
          // 登入出錯
          if (err.code == "auth/user-not-found") {
            this.$swal({
              type: "error",
              title: "Oops",
              text: "查無此用戶，請再次確認帳號密碼"
            });
          }
          if (err.code == "auth/invalid-email") {
            this.$swal({
              type: "error",
              title: "Oops",
              text: "請輸入正確的 email 格式"
            });
          }
          if (err.code == "auth/wrong-password") {
            this.$swal({
              type: "error",
              title: "Oops",
              text: "使用者帳號或密碼錯誤"
            });
          }
        });
    },
    toCreatAccount() {
      this.$router.push("/signup");
    },
    forgetPassword() {
      this.$router.push("/forgetpassword");
    }
  }
};
</script>
