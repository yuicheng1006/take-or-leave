<template>
  <div class="wrap">
    <loading :active.sync="isLoading"></loading>
    <a name="HEAD"></a>
    <Navbar />
    <Slick />

    <ul class="classification">
      <li
        v-for="(title,index) in category.titles"
        :key="index"
        @click="visibility = title"
      >
        <span class="amount-wrap">{{title}}<span class="amount">{{getGoodsLength(title)}}</span></span>
      </li>

    </ul>
    <!-- 送物清單 -->
    <ul class="giveListWrap">
      <li
        class="giveInfo-wrap"
        v-for="(good,index) in filterGoods"
        :key="good.id"
        :id="good.id"
      >
        <div
          class="giveInfo"
          :style="{ backgroundImage: 'url(' + good.imageUrl + ')' }"
          @click="getGoodsID(good.id)"
        >

        </div>
        <div
          class="heart"
          @click="addtoWish(good.id)"
        >
          <i
            class="far fa-heart"
            v-if="getWishStatus(good.id)?isLiked:disLiked"
          ></i>
          <i
            class="fas fa-heart"
            v-else
            @click="delWish(good.id)"
          ></i>

        </div>

        <p>{{ good.title }}</p>

      </li>
    </ul>
    <div class="pageWrap">
      <div
        class="page pre"
        v-if="pagination.has_pre?!disabled:disabled"
        @click.prevent="getGoods(pagination.current_page-1)"
      >←</div>
      <div
        class="page pOne"
        v-for="page in pagination.total_pages"
        :key="page.id"
        :class="{classPage:pagination.current_page==page}"
        @click.prevent="getGoods(page)"
      >{{page}}</div>
      <div
        class="page latest"
        v-if="pagination.has_next?!disabled:disabled"
        @click.prevent="getGoods(parseInt(pagination.current_page)+1)"
      >→</div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "../Navbar";
import Footer from "../Footer";
import Slick from "./Slick";
import { mapActions } from "vuex";

var test;
export default {
  components: {
    Navbar,
    Footer,
    Slick,
  },
  data() {
    return {
      goods: [],
      isLoading: false,
      visibility: "ALL",
      pagination: {},
      classPage: "classPage",
      disabled: false,
      wishGood: {
        product_id: "",
      },
      wishIDs: [],
      getWishLists: "",
      isSuccess: false,
      isDanger: false,
      category: {
        titles: ["ALL", "Makeups", "Shoes", "Clothing", "3C", "Other"],
      },
      isLiked: false,
      disLiked: true,
    };
  },
  //取得物品
  methods: {
    getGoods(page = 1) {
      const apiUrl = `${process.env.APIPATH}/api/products?page=${page}`;
      const vm = this;
      // console.log(apiUrl);
      vm.isLoading = true;
      this.$http.get(apiUrl).then((response) => {
        console.log("response.data.success", response.data);
        if (response.data.success) {
          vm.isLoading = false;
          vm.goods = response.data.products;
          vm.pagination = response.data.pagination;
          console.log("vm.goods", this.goods);
          //點擊分頁，網頁至頂部
          window.scrollTo(0, 0);
        }
      });
    },

    //分類的總數

    getGoodsLength(value) {
      let ammount = 0;
      let newGoods = [];
      const vm = this;
      if (value === "ALL") {
        ammount = vm.goods.length;
      } else if (value === "Makeups") {
        vm.goods.forEach((count) => {
          let categories = count.category;
          if (categories == "makeups") {
            newGoods.push(count);
            ammount = newGoods.length;
          }
        });
      } else if (value === "Shoes") {
        vm.goods.forEach((count) => {
          let categories = count.category;
          if (categories == "shoes") {
            newGoods.push(count);
            ammount = newGoods.length;
          }
        });
      } else if (value === "Clothing") {
        vm.goods.forEach((count) => {
          let categories = count.category;
          if (categories == "clothing") {
            newGoods.push(count);
            ammount = newGoods.length;
          }
        });
      } else if (value === "3C") {
        vm.goods.forEach((count) => {
          let categories = count.category;
          if (categories == "3C") {
            newGoods.push(count);
            ammount = newGoods.length;
          }
        });
      } else if (value === "Other") {
        vm.goods.forEach((count) => {
          let categories = count.category;
          if (categories == "other") {
            newGoods.push(count);
            ammount = newGoods.length;
          }
        });
      }
      return ammount;
    },

    //取商品的 id 導向商品資訊
    getGoodsID(value) {
      let vm = this;
      vm.$router.push(`/givesinfo/${value}`);
    },
    //加入追蹤
    addtoWish(value) {
      let vm = this;
      vm.wishGood.product_id = value;
      let apiUrl = `${process.env.APIPATH}/api/like`;
      this.$http.post(apiUrl, vm.wishGood).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          this.$swal({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            type: "success",
            title: "你ㄉ眼光不錯ㄛ",
          });
        } else {
          this.$swal({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1000,
            type: "info",
            title: "已經加入最愛囉",
          });
        }
      });
      this.getWishInfo();
    },
    async getWishInfo() {
      const vm = this;
      let apiUrl = `${process.env.APIPATH}/api/like`;
      await this.$http.get(apiUrl).then((response) => {
        console.log("response.data.like123", response.data.likes);
        vm.getWishLists = response.data.likes;
      });
    },

    getWishStatus(value) {
      const vm = this;
      let wishStatus;
      if (vm.getWishLists) {
        vm.getWishLists.forEach((item) => {
          if (value === item.id) {
            wishStatus = true;
          }
        });
      }

      return wishStatus;
    },
    delWish(value) {
      let apiUrl = `${process.env.APIPATH}/api/like/${value}`;
      this.$http.delete(apiUrl).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          this.$swal({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            type: "warning",
            title: "QQ 不喜歡我ㄌ嗎",
          });
        }
        this.getWishInfo();
      });
    },
  },

  //過濾分類
  computed: {
    filterGoods: function () {
      const vm = this;
      console.log("111", vm.visibility);
      if (vm.visibility == "ALL") {
        vm.category.length = vm.goods.length;
        return vm.goods;
      } else if (this.visibility == "Makeups") {
        let makeupGood = [];
        vm.goods.forEach((item) => {
          // console.log(item);
          if (item.category == "makeups") {
            console.log("點makeups");
            makeupGood.push(item);
            vm.category.length = makeupGood.length;
          }
        });
        return makeupGood;
      } else if (this.visibility == "Shoes​") {
        let shoesGood = [];
        vm.goods.forEach((item) => {
          if (item.category == "shoes") {
            console.log("點shoes​");
            shoesGood.push(item);
            console.log(shoesGood);
            vm.category.length = shoesGood.length;
          }
        });
        return shoesGood;
      } else if (this.visibility == "Clothing") {
        let clothingGood = [];
        vm.goods.forEach((item) => {
          if (item.category == "clothing") {
            console.log("點clothing");
            clothingGood.push(item);
            vm.category.length = clothingGood.length;
          }
        });
        return clothingGood;
      } else if (this.visibility == "3C") {
        let elcGood = [];
        vm.goods.forEach((item) => {
          if (item.category == "3C") {
            console.log("點3c");
            elcGood.push(item);
            vm.category.length = elcGood.length;
          }
        });
        return elcGood;
      } else if (this.visibility == "Other") {
        let otherGood = [];
        vm.goods.forEach((item) => {
          if (item.category == "other") {
            console.log("點other");
            otherGood.push(item);
            vm.category.length = otherGood.length;
          }
        });
        return otherGood;
      }
    },
  },
  created() {
    this.getGoods();
    this.getWishInfo();
  },
};
</script>
<style scoped>
.classPage {
  color: #4c4c4c;
}
</style>