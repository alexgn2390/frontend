<template>
  <div class="msize" :style="`height: ${height};`">
    <swiper
        :style="{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff'
        }"
        :loop="true"
        :speed="1000"
        :autoplay='{
          "delay": 5000,
          "disableOnInteraction": false
        }'
        :parallax="true"
        :pagination="{
          dynamicBullets: false,
          clickable: false,
        }"
        :allowTouchMove="true"
        :navigation="false"
        class="mySwiper"
      >
      <swiper-slide v-for="item in slide" :key="item.title">
        <div
          class="parallax-bg"
          :style="getStyleImg(item.img)"
          :data-swiper-parallax="getPrallax"
        ></div>
        <div class="slide" :class="item.position ? item.position : 'bottom-right'">
          <div class="title" data-swiper-parallax="-300">{{item.title}}</div>
          <div class="subtitle" data-swiper-parallax="-600">{{item.subtitle}}</div>
          <div class="text" data-swiper-parallax="-900">
            <p class="caption">
              {{item.caption}}
            </p>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { Parallax, EffectCoverflow, Pagination, Autoplay } from "swiper/core";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
SwiperCore.use([Parallax, EffectCoverflow, Pagination, Autoplay]);

export default {
  name: 'ParalaxSlider',
  data(){
    return {
      iPrallax: 100
    }
  },
  methods: {
    getStyleImg: function (img){
      return `background-image:url(${img});`;
    },
    getPrallax: function (){
      return this.iPrallax + 300;
    }
  },
  props: {
    slide: {
      type: Array
    },
    height: {
      type: String,
      default: "500px"
    }
  },
  components: {
    Swiper,
    SwiperSlide
  }
}
</script>

<style lang="scss">
@import "@/engine/assets/scss/components/sliders/SwiperSlide.scss";
</style>

<style lang="scss" scoped>
@import "@/engine/assets/scss/components/sliders/ParalaxSlider.scss";

.animation {
  animation : panimation 4.01s infinite;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

@media (max-width: 1899px){
	.animation { background-size: 110%; }
}

@media (max-width: 1499px){
	.animation { background-size: 120%; }
}

@media (max-width: 799px){
	.animation { background-size: 140%; }
}

@media (max-width: 599px){
	.animation { animation : unset; background-size: cover; }
}

@keyframes panimation {
  0% {
    background-position: -500px 0;
  }
  80% {
    background-position: 0px 0;
  }
  100% {
    background-position: -500px 0;
  }
}
</style>