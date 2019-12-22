<template>
  <div class="rightSide">
    <loading :active.sync="isLoading"></loading>
    <h2>上架送物</h2>
    <div class="divider"></div>
    <div class="giveWrap">
      <div class="giveDetail">
        <div class="givesshelvesFormWrap">
          <span>會員名稱</span>
          <!-- <input type="text" class="givesUp" v-model="tempGood.poster" /> -->
          <span>{{userInfo.displayName}}</span>
        </div>
        <div class="givesshelvesFormWrap">
          <span>類別</span>
          <select name id="classSelect" v-model="tempGood.category">
            <option value="makeups">makeups</option>
            <option value="shoes">shoes</option>
            <option value="clothing">clothing</option>
            <option value="3C">3C</option>
            <option value="other">other</option>
          </select>
        </div>
        <div class="givesshelvesFormWrap">
          <span>上傳圖片</span>
          <input type="file" class="givesUp" ref="files" @change="uploadImg" />
        </div>
        <div class="givesshelvesFormWrap">
          <span>上傳圖片</span>
          <input type="text" class="givesUp" v-model="tempGood.imageUrl" />
        </div>
        <div class="givesshelvesFormWrap">
          <span>送物名稱</span>
          <input type="text" class="givesUp" v-model="tempGood.title" />
        </div>
        <div class="givesshelvesFormWrap">
          <span>送物故事</span>
          <textarea
            cols="30"
            rows="3"
            type="text"
            class="givesUp imgUpdate"
            v-model="tempGood.description"
          />
        </div>
        <div class="givesshelvesFormWrap">
          <span>面交地點</span>
          <input type="text" class="givesUp imgUpdate" v-model="tempGood.location" />
        </div>
        <div class="givesshelvesFormWrap">
          <span>取物者LINE ID</span>
          <input type="text" class="givesUp imgUpdate" v-model="tempGood.lineID" />
        </div>
        <div class="upBtn">
          <button class="shelvesBtn" @click="updateGood">上架</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      goods: [],
      tempGood: {
        // poster: "",
        category: "makeups"
      },
      isLoading: true,
      userInfo: {
        displayName: ""
      }
    };
  },
  methods: {
    getGoods() {
      let apiUrl = `${process.env.APIPATH}/api/admin/products`;
      let vm = this;
      this.$http.get(apiUrl).then(response => {
        let goods_id = this.$route.params.goods_id; //抓路由的 id
        //抓路由 id 塞對應的資料
        response.data.products.forEach(product => {
          if (goods_id == product.id) {
            //console.log("product.id", product.id);
            //console.log("product", product);
            let productInfo = Object.assign({}, product);
            // console.log("productInfo", productInfo);
            vm.tempGood = productInfo;
            vm.goods = productInfo;
          } else if (!goods_id) {
            vm.goods = response.data.products;
          }
        });
      });
    },
    updateGood() {
      let apiUrl = `${process.env.APIPATH}/api/admin/product`;
      const vm = this;
      let httpMethod = "post";
      let checkURL = location.href.split("givesshelvesform/");
      console.log(checkURL);
      if (checkURL[1] == "" || checkURL[1] == undefined) {
        apiUrl = `${process.env.APIPATH}/api/admin/product`;
        httpMethod = "post";
      } else {
        apiUrl = `${process.env.APIPATH}/api/admin/product/${vm.tempGood.id}`;
        httpMethod = "put";
      }
      //新增修改
      this.$http[httpMethod](apiUrl, vm.tempGood).then(response => {
        console.log(response.data);
        if (response.data.success) {
          this.$swal("新增成功！", "", "success");
          vm.getGoods();
          vm.$router.push("/admin/givesshelves");
        } else {
          vm.getGoods();
          this.$swal({
            type: "error",
            title: "Oops",
            text: "新增失敗"
          });
        }
      });
    },
    uploadImg(e) {
      const vm = this;
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      const apiUrl = `${process.env.APIPATH}/api/admin/upload`;
      this.axios
        .post(apiUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          console.log(response.data);
          if (response.data.success) {
            // vm.tempGood.image = response.data.imageUrl;
            console.log(vm.tempGood);
            vm.$set(vm.tempGood, "imageUrl", response.data.imageUrl); //強制 set 進去，後面是欄位名稱，並將路徑強制寫入
          }
        });
    },
    getLogInStatus() {
      const apiUrl = `${process.env.APIPATH}/api/login`;
      const vm = this;
      this.$http.get(apiUrl).then(response => {
        console.log("login", response.data);
        this.userInfo = response.data.userInfo;
        console.log("userInfo", this.userInfo);
        if (!response.data.success) {
          this.$route.push("/home");
        }
        // this.tempGood.poster = this.userInfo.displayName;
        // console.log(this.tempGood);
      });
    }
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  },
  created() {
    this.getGoods();
    this.getLogInStatus();
  }
};
</script>
