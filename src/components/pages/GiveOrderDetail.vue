<template>
  <div class="rightSide">
    <loading :active.sync="isLoading"></loading>
    <h2>送物訂單明細</h2>
    <div class="divider"></div>
    <div class="giveWrap">
      <img
        :src="orderProduct.imageUrl"
        alt
      />
      <div class="divider giveLine"></div>
      <div class="giveDetail">
        <tbody class="giveDetail-tbody">
          <tr>
            <td><span>訂單編號</span><span>{{ getOrderID() }}</span></td>
            <td><span>取物者</span><span>{{ orderRequester.name }}</span></td>
            <td><span>手機</span><span>{{ orderRequester.phone }}</span></td>
            <td><span>取物者LINE ID</span><span>{{ orderRequester.lineID }}</span></td>
            <td><span>取物名稱</span><span>{{ orderProduct.title }}</span></td>
            <td><span>取物說明</span><span class="giveDetail-info">{{ orderRequester.message }}</span></td>
            <td><span>是否接單</span><span>
                <div
                  class="giveBtns"
                  v-if="showBTN"
                >
                  <button
                    class="cancelBtn"
                    @click="noRequest"
                    v-if="hideBtn"
                  >
                    取消
                  </button>
                  <button
                    class="getBtn"
                    @click="saveOrder"
                    v-if="hideBtn"
                  >
                    接收
                  </button>
                  <button
                    class="doneBtn"
                    v-else
                    @click="doneOrder"
                  >完成</button>
                </div>
              </span></td>
          </tr>
        </tbody>

        <!-- <div class="getngive">
          <span>訂單編號</span>
          <span>{{ getOrderID() }}</span>
        </div>
        <div class="getngive">
          <span>取物者</span>
          <span>{{ orderRequester.name }}</span>
        </div>
        <div class="getngive">
          <span>手機</span>
          <span>{{ orderRequester.phone }}</span>
        </div>
        <div class="getngive">
          <span>取物者LINE ID</span>
          <span>{{ orderRequester.lineID }}</span>
        </div>
        <div class="getngive">
          <span>取物名稱</span>
          <span>{{ orderProduct.title }}</span>
        </div>
        <div class="getngive">
          <span>取物說明</span>
          <span>{{ orderRequester.message }}</span>
        </div>
        <div class="getngive">
          <span>是否接單</span>
          <div
            class="giveBtns"
            v-if="showBTN"
          >
            <button
              class="cancelBtn"
              @click="noRequest"
              v-if="hideBtn"
            >
              取消
            </button>
            <button
              class="getBtn"
              @click="saveOrder"
              v-if="hideBtn"
            >
              接收
            </button>
            <button
              class="doneBtn"
              v-else
              @click="doneOrder"
            >完成</button>
          </div> -->
      </div>
      <button
        class="checkGiveOrderBtn"
        @click="back"
      >
        查詢其他送物訂單
      </button>
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
      showBTN: false,
      hideBtn: true,
      requestBTN: {
        submit: "", // 0取消 | 1完成 | 2提交 | 3接受
      },
      isLoading: false,
    };
  },
  methods: {
    getGoodsDetail() {
      let apiUrl = `${process.env.APIPATH}/api/orders`;
      let vm = this;
      vm.isLoading = true;
      this.$http.get(apiUrl).then((response) => {
        console.log(response.data);
        let getorderID = this.$route.params.goods_id; //抓路由的 id
        //抓路由 id 塞對應的資料
        //console.log("response.data.orders", response.data.orders);
        response.data.orders.forEach((product) => {
          if (getorderID == product.id) {
            console.log("product", product);
            let getOrderInfo = Object.assign({}, product);
            console.log("getOrderInfo", getOrderInfo);
            console.log("status", getOrderInfo.status);
            vm.orderRequester = getOrderInfo.requester;
            vm.orderProduct = getOrderInfo.product;
            vm.orderID = getOrderInfo.id;
            vm.orderStatus = getOrderInfo.status;
            vm.orderPoster = getOrderInfo.poster;
          }
          if (this.orderStatus == "2") {
            this.showBTN = true;
          }
          if (this.orderStatus == "0") {
            this.showBTN = false;
          }
          if (this.orderStatus == "3") {
            this.showBTN = true;
            this.hideBtn = false;
          }
        });
        vm.isLoading = false;
      });
    },
    getOrderID() {
      let orderID = this.orderID.split("-")[0];
      return orderID;
    },

    // 取消取物
    noRequest() {
      let vm = this;
      let id = vm.orderID;
      vm.requestBTN.submit = "0";
      console.log("取消");
      let apiUrl = `${process.env.APIPATH}/api/order/${id}`;
      console.log(vm.requestBTN);
      vm.$http.put(apiUrl, vm.requestBTN).then((response) => {
        console.log("test");
        console.log("response.data", response.data);
        if (response.data.success) {
          this.$swal("取消訂單成功!", "", "success");
          this.getGoodsDetail();
          this.$router.push("/admin/giveorder");
        }
      });
    },
    doneOrder() {
      let vm = this;
      let id = vm.orderID;
      vm.requestBTN.submit = "1";
      console.log(vm.requestBTN);
      console.log("完成");
      let apiUrl = `${process.env.APIPATH}/api/order/${id}`;
      vm.$http.put(apiUrl, vm.requestBTN).then((response) => {
        console.log("response.data", response.data);
        if (response.data.success) {
          this.$swal("完成訂單嚕！", "", "success");
          this.getGoodsDetail();
          this.$router.push("/admin/giveorder");
        }
      });
    },
    saveOrder() {
      let vm = this;
      let id = vm.orderID;
      vm.requestBTN.submit = "3";
      console.log(vm.requestBTN);
      console.log("接收");
      let apiUrl = `${process.env.APIPATH}/api/order/${id}`;
      vm.$http.put(apiUrl, vm.requestBTN).then((response) => {
        console.log("response.data", response.data);
        if (response.data.success) {
          this.$swal("接收訂單嚕！", "", "success");
          this.getGoodsDetail();
          this.$router.push("/admin/giveorder");
        }
      });
    },
    back() {
      this.$router.go(-1); //返回上一层
    },
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  },
  created() {
    this.getGoodsDetail();
    this.getOrderID();
    this.getOrderStatus();
  },
  //日期
  filters: {
    time(value) {
      let time = new Date(value);
      let newTime = time.toString();
      console.log(newTime.split(" ", 4).join(" "));
      return newTime.split(" ", 4).join(" ");
    },
  },
};
</script>