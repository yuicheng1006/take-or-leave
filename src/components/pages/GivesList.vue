<template>
  <div class="wrap">
    <loading :active.sync="isLoading"></loading>
    <a name="HEAD"></a>
    <Navbar />
    <div class="coverflow">
      <img src="../../assets/img/slide/slide.jpg" alt />
      <h2 class="animated slideInRight">Wall Clock</h2>
      <h3 class="animated slideInRight">Other</h3>
      <div class="animated slideInRight bLine"></div>
    </div>

    <ul class="classification">
      <li @click="visibility = 'all'">
        <span>ALL</span>
        <div class="amount">{{ getGoodsAll() }}</div>
      </li>
      <li @click="visibility = 'makeups​'">
        <span>makeups​</span>
        <div class="amount">{{ getGoodsMaksup() }}</div>
      </li>
      <li @click="visibility = 'shoes​'">
        <span>shoes​</span>
        <div class="amount">{{ getGoodsShoes() }}</div>
      </li>
      <li @click="visibility = 'clothing'">
        <span>clothing</span>
        <div class="amount">{{ getGoodsClothing() }}</div>
      </li>
      <li @click="visibility = '3C'">
        <span>3C</span>
        <div class="amount">{{ getGoods3C() }}</div>
      </li>
      <li @click="visibility = 'other'">
        <span>other</span>
        <div class="amount">{{ getGoodsOther() }}</div>
      </li>
    </ul>
    <!-- 送物清單 -->
    <ul class="giveListWrap">
      <li
        class="giveInfo"
        v-for="good in filterGoods"
        :key="good.id"
        :style="{ backgroundImage: 'url(' + good.imageUrl + ')' }"
        :id="good.id"
        @click="getGoodsID"
      >
        <div class="heart">
          <i class="far fa-heart"></i>
        </div>
        <div class="infoHover" :id="good.id">
          <h3>{{ good.title }}</h3>
        </div>
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

export default {
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      goods: [],
      isLoading: false,
      visibility: "all",
      pagination: {},
      classPage: "classPage",
      disabled: false
    };
  },
  //取得物品
  methods: {
    getGoods(page = 1) {
      const apiUrl = `${process.env.APIPATH}/api/products?page=${page}`;
      const vm = this;
      // console.log(apiUrl);
      vm.isLoading = true;
      this.$http.get(apiUrl).then(response => {
        vm.isLoading = false;
        vm.goods = response.data.products;
        vm.pagination = response.data.pagination;
        //點擊分頁，網頁至頂部
        window.scrollTo(0, 0);
      });
    },

    //分類的總數
    getGoodsAll() {
      // console.log("giy");
      let ammount = 0;
      let newGoods = [];
      const vm = this;
      if (vm.goods) {
        //console.log(vm.goods.length);
        ammount = vm.goods.length;
        // console.log("ammount", ammount);
      }
      return ammount;
    },
    getGoodsMaksup() {
      let ammount = 0;
      let newGoods = [];
      const vm = this;
      vm.goods.forEach(count => {
        let categories = count.category;
        if (categories == "makeups") {
          newGoods.push(count);
          ammount = newGoods.length;
        }
      });
      return ammount;
    },
    getGoodsShoes() {
      let ammount = 0;
      let newGoods = [];
      const vm = this;
      vm.goods.forEach(count => {
        let categories = count.category;
        if (categories == "shoes") {
          newGoods.push(count);
          ammount = newGoods.length;
        }
      });
      return ammount;
    },
    getGoodsClothing() {
      let ammount = 0;
      let newGoods = [];
      const vm = this;
      vm.goods.forEach(count => {
        let categories = count.category;
        if (categories == "clothing") {
          newGoods.push(count);
          ammount = newGoods.length;
        }
      });
      return ammount;
    },
    getGoods3C() {
      let ammount = 0;
      let newGoods = [];
      const vm = this;
      vm.goods.forEach(count => {
        let categories = count.category;
        if (categories == "3C") {
          newGoods.push(count);
          ammount = newGoods.length;
        }
      });
      return ammount;
    },
    getGoodsOther() {
      let ammount = 0;
      let newGoods = [];
      const vm = this;
      vm.goods.forEach(count => {
        let categories = count.category;
        // console.log("omg", categories);
        // console.log("count", count);
        if (categories == "other") {
          // console.log("123");
          // console.log("count", count);
          newGoods.push(count);
          // console.log("newGoods", newGoods);
          ammount = newGoods.length;
        }
      });
      return ammount;
    },
    //取商品的 id 導向商品資訊
    getGoodsID(e) {
      let goods_id = e.target.id;
      // console.log(goods_id);
      console.log("/givesinfo/" + goods_id);
      let vm = this;
      vm.$router.push(`/givesinfo/${goods_id}`);
    }
  },
  //過濾分類
  computed: {
    filterGoods: function() {
      const vm = this;
      // console.log(this.visibility);
      if (vm.visibility == "all") {
        return vm.goods;
      } else if (this.visibility == "makeups​") {
        let makeupGood = [];
        vm.goods.forEach(item => {
          // console.log(item);
          if (item.category == "makeups") {
            console.log("點makeups");
            makeupGood.push(item);
          }
        });
        return makeupGood;
      } else if (this.visibility == "shoes​") {
        console.log("點shoes​");
        let shoesGood = [];
        vm.goods.forEach(item => {
          console.log(item);
          if (item.category == "shoes") {
            console.log("點shoes​");
            shoesGood.push(item);
            console.log(shoesGood);
          }
        });
        return shoesGood;
      } else if (this.visibility == "clothing") {
        let clothingGood = [];
        vm.goods.forEach(item => {
          if (item.category == "clothing") {
            console.log("點clothing");
            clothingGood.push(item);
          }
        });
        return clothingGood;
      } else if (this.visibility == "3C") {
        let elcGood = [];
        vm.goods.forEach(item => {
          if (item.category == "3C") {
            console.log("點3c");
            elcGood.push(item);
          }
        });
        return elcGood;
      } else if (this.visibility == "other") {
        let otherGood = [];
        vm.goods.forEach(item => {
          if (item.category == "other") {
            console.log("點other");
            otherGood.push(item);
          }
        });
        return otherGood;
      }
    }
  },
  created() {
    this.getGoods();
    this.getGoodsAll();
    this.getGoodsMaksup();
    this.getGoodsShoes();
    this.getGoodsClothing();
    this.getGoods3C();
    this.getGoodsOther();
  }
};
</script>
<style scoped>
.classPage {
  color: #4c4c4c;
}
</style>