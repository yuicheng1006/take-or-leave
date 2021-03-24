<template>
  <div class="wrap">
    <!-- 首頁 -->
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
      <h3>SIGN UP</h3>
      <div class="signupInfo">
        <h4>User Name</h4>
        <input
          type="text"
          name="displayName"
          :class="{ 'is-invalid': usernameError }"
          v-model="newUser.displayName"
        />
        <span>{{errMessage}}</span>
        <h4>Phone</h4>
        <input
          type="text"
          v-model="newUser.phone"
        />
        <span>{{phoneErrMsg}}</span>
        <h4>Email address</h4>
        <input
          type="email"
          required
          v-model="newUser.email"
        />
        <span>{{emailErrMsg}}</span>
        <h4>Password</h4>
        <input
          type="password"
          v-model="newUser.password"
        />
        <span>{{passErrMsg}}</span>
        <h4>Reconfirm the Password</h4>
        <input
          type="password"
          v-model="newUser.passwordCheck"
        />
      </div>
      <button
        class="signupBtn"
        @click="signUp"
      >SIGN UP</button>
    </div>
  </div>
</template>

<script>
import Navbar from "../Navbar";

const auth = firebase.auth();
// console.log("auth: ", auth);

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      newUser: {
        displayName: "",
        phone: "",
        email: "",
        password: "",
        passwordCheck: "",
      },
      usernameError: false,
      errMessage: "",
      passwordError: false,
      passErrMsg: "",
      phoneError: false,
      phoneErrMsg: "",
      emailError: false,
      emailErrMsg: "",
    };
  },
  watch: {
    newUser: {
      handler(value) {
        // displayName 的驗證
        let isText = /^[a-zA-Z0-9]+$/;
        console.log(value.displayName);
        if (value.displayName == "") {
          this.usernameError = false;
          this.errMessage = "";
        } else if (!isText.test(value.displayName)) {
          this.usernameError = true;
          this.errMessage = "請勿包含特殊字元";
        } else if (value.displayName.length > 10) {
          this.usernameError = true;
          this.errMessage = "請勿超過10個字";
        } else {
          this.usernameError = false;
          this.errMessage = "";
        }
        //電話驗證
        if (value.phone == "") {
          this.phoneError = false;
          this.phoneErrMsg = "";
        } else if (value.phone.length > 10 || value.phone.length < 10) {
          this.phoneError = true;
          this.phoneErrMsg = "電話格式錯誤";
        } else {
          this.phoneError = false;
          this.phoneErrMsg = "";
        }

        //信箱驗證
        let isMail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
        if (value.email == "") {
          this.emailError = false;
          this.emailErrMsg = "";
        } else if (!isMail.test(value.email)) {
          this.emailError = true;
          this.emailErrMsg = "email格式錯誤";
        } else {
          this.emailError = false;
          this.emailErrMsg = "";
        }
        //密碼驗證
        let isPassword = /^[a-zA-Z0-9]+$/;
        let inclde = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;
        if (value.password == "") {
          this.passwordError = false;
          this.passErrMsg = "";
        } else if (!isPassword.test(value.password)) {
          this.passwordError = true;
          this.passErrMsg = "請勿包含特殊字元";
        } else if (value.password.length < 12) {
          this.passwordError = true;
          this.passErrMsg = "請勿少於12個字";
        } else if (value.password.length > 16) {
          this.passwordError = true;
          this.passErrMsg = "請勿超過16個字";
        } else {
          this.passwordError = false;
          this.passErrMsg = "";
        }
      },
      deep: true,
    },
  },
  methods: {
    signUp() {
      let apiUrl = `${process.env.APIPATH}/api/user`;
      console.log(apiUrl);
      let vm = this;
      console.log(vm);

      //把登入資料存進資料庫
      console.log(vm.newUser);
      vm.$http.post(apiUrl, vm.newUser).then((response) => {
        console.log(response.data);
        if (!response.data.success) {
          this.$swal({
            type: "error",
            title: "Oops",
            text: `${response.data.message}`,
          });
        }
        // Send Email Verification
        auth
          .signInWithEmailAndPassword(vm.newUser.email, vm.newUser.password)
          .then((res) => {
            if (res.user && !res.user.emailVerified) {
              res.user
                .sendEmailVerification()
                .then(() => {
                  this.newUser = {};
                  console.log("成功");
                  this.$swal("註冊成功，請驗證信箱並重新登入", "", "success");
                  vm.$router.push("/login");
                })
                .catch((err) => {
                  console.log(err);
                  // 寄信出錯，註冊太多次被封鎖
                  this.$swal({
                    type: "error",
                    title: "Oops",
                    text: "寄送驗證信失敗，請重新登入並至會員頁面操作",
                  });
                });
            }
            this.signout();
          })
          .catch((err) => {
            console.log(err);
            // 登入出錯
            this.$swal({
              type: "error",
              title: "Oops",
              text: "寄送驗證信失敗，請重新登入並至會員頁面操作",
            });
          });
      });
    },
    //登出
    signout() {
      console.log("登出");
      auth.signOut().then(() => {
        this.axios
          .post(`${process.env.APIPATH}/api/logout`)
          .then((response) => {
            setTimeout(() => {}, 1000);
            console.log(response.data);
            if (response.data.success) {
              // this.$swal("登出成功：）");
              vm.$router.push("/login");
            }
          });
      });
    },
  },

  created() {
    // this.signUp();
  },
};
</script>
<style scoped>
.signupInfo span {
  font-size: 14px;
  color: red;
}
</style>