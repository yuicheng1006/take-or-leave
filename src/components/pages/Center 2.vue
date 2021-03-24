<template>
  <div class="rightSide">
    {{ this.$store.state.userInfo }}{{ this.$store.state.isLogin }}
    <h2>會員中心首頁</h2>
    <div class="divider"></div>
    <h3>追蹤清單</h3>
    <ul class="heartImg">
      <li
        v-for="getWishList in getWishLists"
        :key="getWishList.id"
      >
        <img
          :src="getWishList.imageUrl"
          :id="getWishList.id"
          @click="toGoodInfo"
          alt
        />
      </li>
    </ul>
    <h3 class="myGiveorder">我的取物</h3>

    <div class="myOrderList">
      <ul class="myOrder">
        <span>訂單編號</span>
        <li
          class="orderNO"
          v-for="orderID in orderIDs"
          :key="orderID.id"
          v-show="orderID[5]"
          :id="orderID"
          @click="toGetOrderDetail"
        >
          {{ orderID.split("-")[0] }}
        </li>
      </ul>
      <ul class="myOrder">
        <span>商品名稱</span>
        <li
          v-for="orderProduct in orderProducts"
          :key="orderProduct.id"
        >
          {{ orderProduct.title }}
        </li>
      </ul>

      <ul class="myOrder">
        <span>送物者</span>
        <li
          v-for="orderProduct in orderProducts"
          :key="orderProduct.id"
        >
          {{ orderProduct.poster }}
        </li>
      </ul>
      <ul class="myOrder">
        <span>訂單狀態</span>
        <li
          v-for="status in orderStatus"
          :key="status.id"
        >
          {{ getOrderStatus(status) }}
        </li>
      </ul>
    </div>
    <!-- 手機版 -->
    <tbody>

      <tr
        v-for="(order,index) in GiveorderAlls"
        :key="index"
      >
        <td><span>訂單編號</span><span class="oid">{{order.id}}</span></td>
        <td><span>商品名稱</span><span>{{order.product.title}}</span></td>
        <td><span>送物者</span><span>{{order.poster.name}}</span></td>
        <td><span>訂單狀態</span><span>{{getOrderStatus(order.status)}}</span></td>

      </tr>

    </tbody>
    <h3 class="myGiveorder">我的送物</h3>

    <div class="myOrderList">
      <ul class="myOrder">
        <span>訂單編號</span>
        <li
          class="orderNO"
          v-for="giveorderID in giveorderIDs"
          :key="giveorderID.id"
          :id="giveorderID"
          @click="toGiveOrderDetail"
        >
          {{ giveorderID.split("-")[0] }}
        </li>
      </ul>
      <ul class="myOrder">
        <span>商品名稱</span>
        <li
          v-for="giveorderProduct in giveorderProducts"
          :key="giveorderProduct.id"
        >
          {{ giveorderProduct.title }}
        </li>
      </ul>
      <ul class="myOrder">
        <span>取物者</span>
        <li
          v-for="giveorderRequester in giveorderRequesters"
          :key="giveorderRequester.id"
        >
          {{ giveorderRequester.name }}
        </li>
      </ul>
      <ul class="myOrder">
        <span>訂單狀態</span>
        <li
          v-for="status in giveorderStatus"
          :key="status.id"
        >
          {{ getOrderStatus(status) }}
        </li>
      </ul>
    </div>
    <!-- 手機版 -->
    <tbody>
      <tr
        v-for="(giveorder,index) in giveGiveorderAlls"
        :key="index"
      >
        <td><span>訂單編號</span><span class="oid">{{giveorder.id}}</span></td>
        <td><span>商品名稱</span><span>{{giveorder.product.title}}</span></td>
        <td><span>送物者</span><span>{{giveorder.requester.name}}</span></td>
        <td><span>訂單狀態</span><span>{{getOrderStatus(giveorder.status)}}</span></td>

      </tr>

    </tbody>
  </div>
</template>
<script>
export default {
  data() {
    return {
      giveGiveorderAlls: [],
      giveorderAlls: [],
      giveorderIDs: [],
      giveorderRequesters: [],
      giveorderProducts: [],
      orderType: 0,
      isLoading: true,
      giveorderStatus: [],
      GiveorderAlls: [],
      orderAlls: [],
      orderIDs: [],
      orderRequesters: [],
      orderProducts: [],
      orderType: 0,
      isLoading: true,
      orderStatus: [],
      getWishLists: [],
    };
  },
  mounted() {
    this.$store.dispatch("getLoginStatus");
    this.$slots.commit("LOGINSTATUS");
  },
  methods: {
    // 我的送物
    getgiveGoods() {
      let apiUrl = `${process.env.APIPATH}/api/orders`;
      let vm = this;
      this.$http.get(apiUrl).then((response) => {
        vm.giveorderAlls = response.data.orders;
        vm.giveorderAlls.forEach((typeGood) => {
          if (typeGood.type === 0) {
            console.log("typeGood.type === 0", typeGood);
            vm.giveGiveorderAlls.push(typeGood);
            console.log("我的送物", vm.giveGiveorderAlls);
            // console.log("GiveorderAll", vm.giveGiveorderAlls);
            let GoodInfo = Object.assign([], typeGood);
            vm.giveorderIDs.push(GoodInfo.id);
            vm.giveorderRequesters.push(GoodInfo.requester);
            vm.giveorderProducts.push(GoodInfo.product);
            vm.giveorderStatus.push(GoodInfo.status);
            // vm.orderType = GoodInfo.type;
            vm.ulShow = true;
            vm.getOrderStatus();
          }
        });
      });
    },
    // 我的取物
    getGoodsDetail() {
      let apiUrl = `${process.env.APIPATH}/api/orders`;
      let vm = this;
      this.$http.get(apiUrl).then((response) => {
        vm.orderAlls = response.data.orders;

        vm.orderAlls.forEach((typeGood) => {
          if (typeGood.type === 1) {
            console.log("typeGood.type === 1", typeGood);
            vm.GiveorderAlls.push(typeGood);
            console.log("我的取物", vm.GiveorderAlls);
            let GoodInfo = Object.assign([], typeGood);
            vm.orderIDs.push(GoodInfo.id);
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
    getWishInfo() {
      this.isLoading = true;
      let apiUrl = `${process.env.APIPATH}/api/like`;
      this.$http.get(apiUrl).then((response) => {
        console.log(response.data);
        this.getWishLists = response.data.likes;
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
      console.log(id);
      let vm = this;
      vm.$router.push(`/admin/getorderdetail/${id}`);
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
    toGoodInfo(e) {
      let goods_id = e.target.id;
      this.$router.push(`/givesinfo/${goods_id}`);
    },
    toGetOrderDetail(e) {
      let id = e.target.id;
      console.log(id);
      let vm = this;
      vm.$router.push(`/admin/getorderdetail/${id}`);
    },
    toGiveOrderDetail(e) {
      let id = e.target.id;
      let vm = this;
      vm.$router.push(`/admin/giveorderdetail/${id}`);
    },
    //判斷是否登入（以前寫法）
    getLogInStatus() {
      const apiUrl = `${process.env.APIPATH}/api/login`;
      const vm = this;
      this.$http.get(apiUrl).then((response) => {
        console.log("login", response.data);
        if (!response.data.success) {
          this.$router.push("/home");
        }
      });
    },
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  },
  created() {
    this.getgiveGoods();
    this.getGoodsDetail();
    this.getWishInfo();
    // this.getLogInStatus();
  },
};
</script>
<style scoped>
.myGiveorder {
  margin-top: 50px;
}
.myOrder li {
  color: #4c4c4c;
  padding: 5px;
}
.orderNO {
  cursor: pointer;
  color: #fff !important;
  display: block;
  background: #9baaa4;
}
</style>
