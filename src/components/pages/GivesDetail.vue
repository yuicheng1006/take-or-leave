<template>
  <div class="rightSide">
    <loading :active.sync="isLoading"></loading>
    <h2>送物資料</h2>
    <div class="divider"></div>
    <div class="giveWrap">
      <img
        :src="goods.imageUrl"
        alt
      />
      <div class="divider giveLine"></div>
      <div class="giveDetail">
        <tbody class="giveDetail-tbody">
          <tr>
            <td><span>送物編號</span><span>{{ getInfoID() }}</span></td>
            <td><span>類別</span><span>{{ goods.category }}</span></td>
            <td><span>上架時間</span><span>{{ goods.create_time | time }}</span></td>
            <td><span>送物名稱</span><span>{{ goods.title }}</span></td>
            <td><span>送物故事</span><span class="giveDetail-info">{{ goods.description }}</span></td>
            <td><span>面交地點</span><span>{{ goods.location }}</span></td>

          </tr>
        </tbody>

        <!-- <div class="getngive">
          <span>送物編號</span>
          <span>{{ getInfoID() }}</span>
        </div>
        <div class="getngive">
          <span>類別</span>
          <span>{{ goods.category }}</span>
        </div>
        <div class="getngive">
          <span>上架時間</span>
          <span>{{ goods.create_time | time }}</span>
        </div>

        <div class="getngive">
          <span>送物名稱</span>
          <span>{{ goods.title }}</span>
        </div>
        <div class="getngive">
          <span>送物故事</span>
          <span class="storySpan">{{ goods.description }}</span>
        </div>
        
        <div class="getngive">
          <span>面交地點</span>
          <span>{{ goods.location }}</span>
        </div> -->
        <button
          class="backgivesBtn"
          @click="back"
        >查看其他送物資料</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      goods: [],
      isLoading: true,
    };
  },
  methods: {
    getGoods() {
      let apiUrl = `${process.env.APIPATH}/api/admin/products`;
      let vm = this;
      this.$http.get(apiUrl).then((response) => {
        console.log(response.data.products);
        let goods_id = this.$route.params.goods_id; //抓路由的 id
        console.log("goods_id", goods_id);
        // //抓路由 id 塞對應的資料
        response.data.products.forEach((product) => {
          if (goods_id == product.id) {
            let productInfo = Object.assign({}, product);
            console.log("productInfo", productInfo);
            vm.goods = productInfo;
          }
        });
      });
    },

    getInfoID() {
      let goodID = this.goods.id.split("-");
      return goodID[0];
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
    this.getGoods();
    this.getInfoID();
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