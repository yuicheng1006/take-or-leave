<template>
  <div class="rightSide">
    <loading :active.sync="isLoading"></loading>
    <h2>送物訂單查詢</h2>
    <div class="divider"></div>

    <div class="itemWrap">
      <!-- 電腦版 -->
      <ul class="orderItem">
        <h3>訂單編號</h3>
        <li
          class="orderItemLI"
          v-for="orderID in orderIDs"
          :key="orderID.id"
        >
          <span
            class="orderNO"
            :id="orderID"
            @click="toOrderDetail"
          >{{orderID.split("-")[0]}}</span>

        </li>
      </ul>
      <ul class="orderItem">
        <h3>商品名稱</h3>
        <li
          class="orderItemLI"
          v-for="orderProduct in orderProducts"
          :key="orderProduct.id"
        >
          <span>{{ orderProduct.title }}</span>
        </li>
      </ul>
      <ul class="orderItem">
        <h3>取物者</h3>
        <li
          class="orderItemLI"
          v-for="orderRequester in orderRequesters"
          :key="orderRequester.id"
        >
          <span>{{ orderRequester.name }}</span>
        </li>
      </ul>
      <ul class="orderItem">
        <h3>訂單狀態</h3>
        <li
          class="orderItemLI"
          v-for="status in orderStatus"
          :key="status.id"
        >
          <span>{{ getOrderStatus(status) }}</span>
        </li>
      </ul>
    </div>
    <!-- 手機版 -->

    <tbody>
      <tr
        v-for="(order,index) in GiveorderAlls"
        :key="index"
      >
        <td><span>訂單編號</span><span
            class="oid"
            :id="order.id"
            @click="toOrderDetail"
          >{{order.id}}</span></td>
        <td><span>商品名稱</span><span>{{order.product.title}}</span></td>
        <td><span>送物者</span><span>{{order.poster.name}}</span></td>
        <td><span>訂單狀態</span><span>{{getOrderStatus(order.status)}}</span></td>

      </tr>
    </tbody>
  </div>
</template>
// <script>
export default {
  data() {
    return {
      GiveorderAlls: [],
      orderAlls: [],
      orderIDs: [],
      orderRequesters: [],
      orderProducts: [],
      orderType: 0,
      isLoading: true,
      orderStatus: [],
      ulShow: false,
    };
  },
  methods: {
    getGoodsDetail() {
      let apiUrl = `${process.env.APIPATH}/api/orders`;
      let vm = this;
      this.$http.get(apiUrl).then((response) => {
        vm.orderAlls = response.data.orders;
        vm.orderAlls.forEach((typeGood) => {
          if (typeGood.type === 0) {
            console.log("typeGood", typeGood);
            vm.GiveorderAlls.push(typeGood);
            console.log("GiveorderAll", vm.GiveorderAlls);
            let GoodInfo = Object.assign([], typeGood);
            vm.orderIDs.push(GoodInfo.id); //訂單編號
            vm.orderRequesters.push(GoodInfo.requester);
            vm.orderProducts.push(GoodInfo.product);
            vm.orderStatus.push(GoodInfo.status);
            // vm.orderType = GoodInfo.type;
            vm.ulShow = true;
            vm.getOrderStatus();
          }
        });
      });
    },

    getOrderStatus(item) {
      if (item == 0) {
        return "已取消";
      }
      if (item == 1) {
        return "已完成";
      }
      if (item == 2) {
        return "已提交";
      }
      if (item == 3) {
        return "已接受";
      }
    },
    toOrderDetail(e) {
      let id = e.target.id;
      let vm = this;
      vm.$router.push(`/admin/giveorderdetail/${id}`);
    },
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  },
  created() {
    this.getGoodsDetail();
  },
};
</script>
<style scoped>
.orderItem li h3,
.orderItem li span {
  color: #4c4c4c;
  padding: 0px 5px;
}

.orderNO {
  cursor: pointer;
  color: #fff !important;
  background: #9baaa4;
}
</style>