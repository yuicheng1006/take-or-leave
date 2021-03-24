<template>
  <div class="rightSide">
    <loading :active.sync="isLoading"></loading>
    <h2>我的送物</h2>
    <div class="divider"></div>
    <div class="updateWrap">
      <button
        class="updateBtn"
        @click="toGivesForm"
      >新增</button>
    </div>
    <!-- 電腦版 -->
    <ul
      class="givesshelvesWrap"
      v-for="good in goods"
      :key="good.id"
    >
      <div class="imgName">
        <li>

          <img
            :src="good.imageUrl"
            alt
          />
        </li>
        <li>
          <h5 class="givesshelvestName">{{ good.title }}</h5>
        </li>
      </div>
      <li>
        <div class="givesshelvesBtns">
          <button
            class="givesDetailBtn"
            :id="good.id"
            @click="toDetail"
          >
            送物明細
          </button>
          <button
            class="editBtn"
            :id="good.id"
            @click="toEditForm"
          >
            編輯
          </button>
        </div>
      </li>
      <li
        :id="good.id"
        @click="delGoods"
      >
        <i
          class="fas fa-times"
          :id="good.id"
          @click="delGoods"
        ></i>
      </li>
    </ul>
    <!-- 手機版 -->
    <tbody>
      <tr
        v-for="good in goods"
        :key="good.id"
      >
        <td><img
            :src="good.imageUrl"
            alt
          /></td>
        <td><span>名稱</span><span>{{ good.title }}</span></td>
        <td><span>送物資訊</span>
          <div class="givesshelvesBtns">
            <button
              class="givesDetailBtn"
              :id="good.id"
              @click="toDetail"
            >
              送物明細
            </button>
            <button
              class="editBtn"
              :id="good.id"
              @click="toEditForm"
            >
              編輯
            </button>
          </div>
        </td>

        <td><span>刪除</span><span><button
              class="addtoBag"
              :id="good.id"
              @click="delGoods"
            >刪除</button></span></td>
      </tr>
    </tbody>
  </div>
</template>

<script>
const auth = firebase.auth();
console.log("auth: ", auth);

export default {
  data() {
    return {
      goods: [],
      isLoading: false,
      tempID: "",
      pagination: {},
    };
  },
  methods: {
    getGoods(page = 1) {
      const apiUrl = `${process.env.APIPATH}/api/admin/products`;
      const vm = this;
      //console.log(apiUrl);
      vm.isLoading = true;
      this.$http.get(apiUrl).then((response) => {
        //console.log(response.data);
        vm.isLoading = false;
        vm.goods = response.data.products;
        vm.pagination = response.data.pagination;
        console.log(vm.goods);
      });
    },

    toGivesForm() {
      let vm = this;
      vm.$router.push("/admin/givesshelvesform");
    },
    toEditForm(e) {
      let goods_id = e.target.id;
      console.log(goods_id);
      console.log("/admin/givesshelvesform/" + goods_id);
      let vm = this;
      vm.$router.push(`/admin/givesshelvesform/${goods_id}`);
    },
    toDetail(e) {
      let goods_id = e.target.id;
      let vm = this;
      vm.$router.push(`/admin/givesdetail/${goods_id}`);
    },
    delGoods(e) {
      let delID = e.target.id;
      this.$swal({
        title: "你確定要刪掉物品嗎?",
        text: "哭哭，不要下架喇",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#4c4c4c",
        cancelButtonColor: "#d33",
        confirmButtonText: "確定刪除",
      }).then((result) => {
        if (result.value) {
          const apiUrl = `${process.env.APIPATH}/api/admin/product/${delID}`;
          console.log(apiUrl);
          this.$http.delete(apiUrl).then((response) => {
            console.log(response.data);
            if (response.data.success) {
              this.getGoods();
            } else {
              this.getGoods();
            }
          });
          this.$swal("刪除成功!", "", "success");
        }
      });
    },
  },

  created() {
    this.getGoods();
  },
};
</script>
<style scoped>
.classPage {
  color: #4c4c4c;
}
</style>