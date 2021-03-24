<template>
  <div class="coverflow homeFlow">
    <VueSlickCarousel v-bind="settings">
      <img
        v-for="(slickImg,index) in slickImgs"
        :key="index"
        :src="slickImg.path"
        :alt="slickImg.title"
      />
    </VueSlickCarousel>
    <!-- 輪播圖點選 -->
  </div>
</template>
<script>
export default {
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
        arrows: false,
      },
      slickImgs: [
        {
          title: "take or leave banner for info",
          path: require("../../assets/img/slide/banner01.png"),
        },
        {
          title: "take or leave banner for activity",
          path: require("../../assets/img/slide/banner02.png"),
        },
      ],
    };
  },
};
</script>