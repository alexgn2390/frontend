<template>
  <section class="Reviews">
    <div class="Reviews_Content">
      <h2 class="Reviews_Title" v-html="$t('pages.main.review_title')"></h2>

      <div class="Reviews_Wrapper">
        <div v-if="isShowButton" @click="Prev" class="ReviewButton">
          <img class="ReviewPrev" src="/engine/assets/img/index/review-arrow.png" />
        </div>

        <Card v-for="(r, i) in render" :key="`review#${i}`" :title="r.name" :text="r.text" :ico="r.avatar" />

        <div v-if="isShowButton" @click="Next" class="ReviewButton">
          <img class="ReviewNext" src="/engine/assets/img/index/review-arrow.png" />
        </div>
      </div>


      <div class="Reviews_Pagination_Wrapper">
        <div class="Reviews_Pagination">
          <div @click="SetActive(i - 1)" v-for="i in length" :key="`pagination#${i}`" class="Pagination" :class="{ 'selected': this.active == i - 1 }"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Card from '@/engine/components/pages/main/cards/Card'

export default {
  name: 'ReviewsSection',
  data(){
    return {
      active: 0,
      length: 0,
      render: [],
      render_count: 2,
      window_width: window.innerWidth,
      config: {
        mobile_width: 1500,
        desktop_render_count: 2,
        mobile_render_count: 1
      },
      reviews: [
        {
          name: 'James B.',
          avatar: '/engine/assets/img/index/review.png',
          text: "«As someone who’s always felt overwhelmed in the gym, nFitnity has been a game-changer for me. The app is incredibly user-friendly and the instructions are so clear and easy to follow. I never thought I’d feel this confident about working out at my age!»",
        },
        {
          name: 'Margaret D.',
          avatar: '/engine/assets/img/index/review.png',
          text: "«I’ve tried various fitness programs before, but nothing compares to nFitnity. The step-by-step video guides are so helpful, and I love how the workouts are tailored to my pace and ability. It’s like having a personal trainer in my pocket!»",
        },
        {
          name: 'Robert A.',
          avatar: '/engine/assets/img/index/review.png',
          text: "«What I appreciate most about nFitnity is the clarity of the workout plans. The text and video instructions make it easy for me to understand each exercise, and I’ve noticed a significant improvement in my strength and mobility since I started using the app. Highly recommend it for seniors looking to stay active!»",
        }
      ]
    }
  },
  created(){
    this.onResize();
  },
  methods: {
    UpdateRender(){
      this.length = Math.round(this.reviews.length / this.render_count);
      if(this.reviews.length <= this.render_count) this.render = this.reviews;
      let i = this.active * this.render_count;
      this.render = this.reviews.slice(i, i + this.render_count);
    },
    SetActive(i){
      if(i >= this.length) return;
      this.active = i;
      this.UpdateRender();
    },
    Prev(){
      if(this.active <= 0) return;
      this.active--;
      this.UpdateRender();
    },
    Next(){
      if(this.active >= this.length - 1) return;
      this.active++;
      this.UpdateRender();
    },
    onResize() {
      this.window_width = window.innerWidth;

      if(this.window_width <= this.config.mobile_width) this.render_count = this.config.mobile_render_count;
      else this.render_count = this.config.desktop_render_count;

      this.UpdateRender(); // Optimization warning! This update method is always caused when the window size changes
    }
  },
  computed: {
    isShowButton(){
      return this.window_width > 1800;
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize);
  },
  components: {
    Card
  }
}
</script>

<style lang="scss" scoped>
</style>