<template>
  <div class="wrap">
    <a name="HEAD"></a>
    <Navbar />
    <!-- 輪播圖 -->
    <Slick />
    <div class="concept-wrap">
      <div
        data-aos="zoom-in"
        data-aos-delay="300"
      >
        <div class="concept-img">
          <img
            src="../../assets/img/concept.png"
            alt=""
          >
        </div>
      </div>
      <div class="concept-info">
        <div
          data-aos="zoom-in"
          data-aos-delay="500"
        >
          <p class="info-title">讓東西找到更好的歸屬</p>
          <p>將自己不需要的送給有需要的人，讓還可以使用的物品重啟新生命，減少浪費來改變現今社會過量的消費模式。</p>
        </div>
      </div>
    </div>
    <div class="order-info-wrap">
      <div
        data-aos="zoom-in"
        data-aos-delay="700"
      >
        <p class="order-info-title">我們可以怎麼做？</p>
      </div>
      <div
        data-aos="zoom-in"
        data-aos-delay="1000"
      >
        <div class="order-info">
          <div class="order-content img">
            <img
              src="../../assets/img/chat.png"
              alt="take or leave chat"
            >
            <vue-typed-js
              :strings="['哈囉哈囉', '請問怎麼跟您拿取物品ㄋ？']"
              :loop="true"
              :typeSpeed="100"
              :backSpeed="60"
              :cursorChar="'|'"
            >
              <span class="typing-1"><span class="typing"></span></span>
            </vue-typed-js>

          </div>
          <div class="order-content info">
            <img
              src="../../assets/img/border-01.png"
              alt="border"
            >
            <p>取得自己需要的物品訂單後，即可取得對方聯絡資訊。並與對方聯繫並與對方聯繫如何拿取
            </p>

          </div>
        </div>
      </div>

    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "../Navbar";
import Footer from "../Footer";
import Slick from "./Slick";

export default {
  components: {
    Navbar,
    Footer,
    Slick,
  },
  data() {
    return {
      settings: {
        dots: true,
        dotsClass: "slick-dots custom-dot-class",
        edgeFriction: 0.35,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      },
      slickImg: [
        {
          title: "take or leave banner for info",
          path: "../../assets/img/slide/banner01.png",
        },
      ],
    };
  },
  mounted() {
    this.aos.init({});
  },
};
</script>