<template>
  <div class="wrap">
    <loading :active.sync="isLoading"></loading>
    <a name="HEAD"></a>
    <Navbar />
    <div class="infoWrap">
      <div class="leftInfoSide">
        <div class="indexLink">
          <router-link to="/giveslist">
            <h3>GIVEs</h3>
          </router-link>
          <h3>/</h3>
          <span class="infoName">{{goods.title}}</span>
        </div>
        <div>
          <img :src="goods.imageUrl" alt />
        </div>
      </div>
      <div class="rightInfo">
        <div class="givesName">{{goods.title}}</div>
        <div class="givesNo">{{ getInfoID()}}</div>
        <div class="addHeart">
          <i class="far fa-heart"></i>
        </div>
        <div class="divider"></div>
        <p>{{goods.description}}</p>
        <div class="divider"></div>
        <div class="shelvesTime">{{goods.create_time | time}}</div>
        <button class="addBtn">ADD TO BAG</button>
        <div class="toFace">
          <span>面交:</span>
          <span class="facePlace">{{goods.location}}</span>
        </div>
      </div>
    </div>
    <div class="introInfo">
      <h3>Introduction</h3>
      <div class="divider"></div>
      <p>{{goods.description}}</p>
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
      isLoading: false
    };
  },
  //取得單一物品資訊
  methods: {
    getGoods() {
      const vm = this;
      vm.isLoading = true;
      const apiUrl = `${process.env.APIPATH}/api/products`;
      let goods_id = this.$route.params.goods_id; //抓路由的 id
      console.log("goods_id", goods_id);
      //抓路由 id 塞對應的資料
      this.$http.get(apiUrl).then(response => {
        response.data.products.forEach(products => {
          if (goods_id == products.id) {
            let oneGoodInfo = products;
            // vm.isLoading = false;
            vm.goods = oneGoodInfo;
          }
        });
      });
    },
    getInfoID() {
      let goodID = this.goods.id.split("-", 1);
      return goodID[0];
    }
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  },
  created() {
    this.getGoods();
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
