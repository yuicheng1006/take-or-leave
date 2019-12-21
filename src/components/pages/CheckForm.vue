<template>
  <div class="wrap">
    <Navbar />

    <div class="logWrap">
      <div class="accountLink">
        <h4>HOME</h4>
        <h4>/</h4>
        <span>account</span>
      </div>
      <h2>取物者資料</h2>
      <span class="accountLine"></span>
      <div class="formWrap">
        <div class="leftForm">
          <div class="givesNo">
            <span>送物編號</span>
            <span>000006</span>
          </div>
          <div class="givesNo">
            <span>送物名稱</span>
            <span>Bottle</span>
          </div>
        </div>
        <div class="getGivesLine"></div>
        <div class="rightForm">
          <div class="givesNo">
            <span>姓名</span>
            <input type="text" />
          </div>
          <div class="givesNo">
            <span>聯絡電話</span>
            <input type="text" />
          </div>
          <div class="givesNo">
            <span>LINE ID</span>
            <input type="text" />
          </div>
          <div class="givesNo">
            <span>取物說明</span>
            <textarea type="text" cols="21" rows="3" />
          </div>
          <button class="formBtn">確認送出</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../Navbar";
export default {
  components: {
    Navbar
  }
};
</script>