<template>
  <div class="wrap">
    <a name="HEAD"></a>
    <Navbar />
    <!-- 輪播圖 -->
    <div class="coverflow homeFlow">
      <img src="../../assets/img/slide/slide.jpg" alt />
      <h2 class="animated slideInRight">Wall Clock</h2>
      <h3 class="animated slideInRight">Other</h3>
      <div class="animated slideInRight bLine"></div>
      <div class="slideLine">
        <div class="slideLeft"></div>
        <span>01</span>
      </div>
      <div class="slideLine slideRight">
        <span>02</span>
        <div class="slideLeft"></div>
      </div>
      <!-- 輪播圖點選 -->
    </div>
    <div class="slideBox">
      <div class="boxAll box_1"></div>
      <div class="boxAll box_1"></div>
      <div class="boxAll box_1"></div>
    </div>
    <div class="whyDo">
      <div class="whyImg"></div>
      <h2 class="animated slideInLeft">why</h2>
      <span class="animated slideInLeft">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Voluptate molestias, delectus commodi nobis
        pariatur ipsum, aut eveniet ullam veritatis maxime voluptatum illo! Eligendi nostrum iure temporibus
        blanditiis? Omnis, et amet.
      </span>
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
  }
};
</script>