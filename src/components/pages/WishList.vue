<template>
  <div class="rightSide">
    <loading :active.sync="isLoading"></loading>
    <h2>追蹤清單</h2>
    <div class="divider"></div>
    <!-- 電腦版 -->
    <ul
      class="heartWrap"
      v-for="getWishList in getWishLists"
      :key="getWishList.id"
    >
      <div class="wishImgName">
        <li>
          <img
            :id="getWishList.id"
            :src="getWishList.imageUrl"
            @click="toGoodInfo"
            alt
          />
        </li>
        <li>
          <h5 class="heartName">{{getWishList.title}}</h5>
        </li>
      </div>
      <li>
        <div class="wishlistBtns">
          <h5 class="heartStatus">{{ getStatus(getWishList.status)}}</h5>
          <button
            class="addtoBag"
            :id="getWishList.id"
            @click="toBag"
          >ADD TO BAG</button>
          <i
            class="fas fa-times"
            :id="getWishList.id"
            @click="delWish"
          ></i>
        </div>
      </li>
    </ul>
    <!-- 手機版 -->
    <tbody>
      <tr
        v-for="getWishList in getWishLists"
        :key="getWishList.id"
      >
        <td><img
            :id="getWishList.id"
            :src="getWishList.imageUrl"
            @click="toGoodInfo"
            alt
          /></td>
        <td><span>名稱</span><span>{{getWishList.title}}</span></td>
        <td><span>狀態</span><span :class="{'giveDetail-info':(getWishList.status)==='已下架'?false:true}">
            {{ getStatus(getWishList.status)==="已下架"?'已下架':'物品還在喲！趕快聯絡主人吧'}}</span></td>
        <td><span>帶我走</span><span><button
              class="addtoBag"
              :id="getWishList.id"
              @click="toBag"
            >ADD TO BAG</button></span></td>
        <td><span>刪除</span><span><button
              class="addtoBag"
              :id="getWishList.id"
              @click="delWish"
            >刪除</button></span></td>
      </tr>
    </tbody>
  </div>
</template>
<script>
export default {
  data() {
    return {
      getWishLists: [],
      isLoading: false,
    };
  },
  methods: {
    getWishInfo() {
      this.isLoading = true;
      let apiUrl = `${process.env.APIPATH}/api/like`;
      this.$http.get(apiUrl).then((response) => {
        console.log(response.data);
        this.getWishLists = response.data.likes;
        this.isLoading = false;
      });
    },
    getStatus(item) {
      if (item == 1) {
        return "";
      }
      if (item == 0) {
        return "已下架";
      }
    },
    toBag(e) {
      let goods_id = e.target.id;
      this.$router.push(`/checkform/${goods_id}`);
    },
    toGoodInfo(e) {
      let goods_id = e.target.id;
      this.$router.push(`/givesinfo/${goods_id}`);
    },
    delWish(e) {
      let wishID = e.target.id;
      console.log(wishID);
      let apiUrl = `${process.env.APIPATH}/api/like/${wishID}`;
      this.$http.delete(apiUrl).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          this.$swal({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            type: "success",
            title: "取消追蹤",
          });
        }
        this.getWishInfo();
      });
    },
  },
  created() {
    this.getWishInfo();
  },
};
</script>
<style >
.wishlistBtns i {
  cursor: pointer;
}
.wishImgName img {
  cursor: pointer;
}
</style>