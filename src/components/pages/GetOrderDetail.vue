<template>
  <div class="rightSide">
    <loading :active.sync="isLoading"></loading>
    <h2>取物訂單明細</h2>
    <div class="divider"></div>
    <div class="giveWrap">
      <img :src="orderProduct.imageUrl" alt />
      <div class="divider giveLine"></div>
      <div class="giveDetail">
        <div class="getngive">
          <span>送物者</span>
          <span>{{orderPoster.name}}</span>
        </div>
        <div class="getngive">
          <span>送物時間</span>
          <span>{{orderProduct.create_time | time}}</span>
        </div>
        <div class="getngive">
          <span>送物者LINE ID</span>
          <span>{{orderPoster.lineID}}</span>
        </div>
        <div class="getngive">
          <span>訂單編號</span>
          <span>{{getOrderID() }}</span>
        </div>
        <div class="getngive">
          <span>送物名稱</span>
          <span>{{orderProduct.title}}</span>
        </div>
        <div class="getngive">
          <span>取物說明</span>
          <span class="storySpan">{{orderRequester.message}}</span>
        </div>
        <div class="getngive">
          <span>訂單狀態</span>
          <span>{{getOrderStatus()}}</span>
        </div>
      </div>
      <div class="getBtns">
        <button class="noRequestBtn" @click="noRequest">取消請求</button>
        <button class="checkGetOrderBtn" @click="back">查詢其他取物訂單</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderRequester: {},
      orderProduct: {},
      orderPoster: {},
      orderID: "",
      orderStatus: "",
      isLoading: true,
      requestBTN: {
        submit: "" // 0取消 | 1完成 | 2提交 | 3接受
      }
    };
  },
  methods: {
    getGoodsDetail() {
      let apiUrl = `${process.env.APIPATH}/api/orders`;
      let vm = this;
      this.$http.get(apiUrl).then(response => {
        let getorderID = this.$route.params.goods_id; //抓路由的 id
        //抓路由 id 塞對應的資料
        console.log(getorderID);
        console.log(response.data);
        response.data.orders.forEach(product => {
          console.log(product.id);
          if (getorderID == product.id) {
            console.log("product.id", product.id);
            let getOrderInfo = Object.assign({}, product);
            console.log("getOrderInfo", getOrderInfo);
            vm.orderRequester = getOrderInfo.requester;
            vm.orderProduct = getOrderInfo.product;
            vm.orderID = getOrderInfo.id;
            vm.orderStatus = getOrderInfo.status;
            vm.orderPoster = getOrderInfo.poster;
          }
        });
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
    getOrderID() {
      let orderID = this.orderID.split("-", 1);
      return orderID[0];
    },
    getOrderStatus() {
      if (this.orderStatus == "0") {
        return "已取消";
      }
      if (this.orderStatus == "1") {
        return "已完成";
      }
      if (this.orderStatus == "2") {
        return "已提交";
      }
      if (this.orderStatus == "3") {
        return "已接受";
      }
    },
    back() {
      this.$router.go(-1); //返回上一层
    },
    // 取消取物
    noRequest() {
      let vm = this;
      let id = vm.orderID;
      let apiUrl = `${process.env.APIPATH}/api/order/${id}`;
      vm.requestBTN.submit = "0";
      this.$swal({
        title: "你確定要取消訂單嗎?",
        text: "哭哭，不要取消喇",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "確定取消"
      }).then(result => {
        if (result.value) {
          vm.$http.put(apiUrl, vm.requestBTN).then(response => {
            console.log("response.data", response.data);
            if (response.data.success) {
              this.$swal("取消訂單成功!", "", "success");
              this.getGoodsDetail();
              this.$router.push("/admin/getorder");
            }
          });
        }
      });
      if (vm.orderStatus == "0") {
        this.$swal({
          type: "error",
          title: "Oops",
          text: "訂單已取消"
        });
      }
      if (vm.orderStatus == "1") {
        this.$swal({
          type: "error",
          title: "Oops",
          text: "訂單已完成"
        });
      }
      if (vm.orderStatus == "3") {
        this.$swal({
          type: "error",
          title: "Oops",
          text: "對方已接受訂單"
        });
      }
      this.$router.push("/admin/getorder");
    }
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  },
  created() {
    this.getGoodsDetail();
    this.getOrderID();
    this.getLogInStatus();
    this.getOrderStatus();
  },
  //日期
  filters: {
    time(value) {
      let time = new Date(value);
      let newTime = time.toString();
      console.log(newTime.split(" ", 4).join(" "));
      return newTime.split(" ", 4).join(" ");
    }
  }
};
</script>