<template>
  <section class="B2B_HomeTrust">
    <div class="Container">
      <div class="Content">
        <div v-if="!is_desktop" @click="$PageController.OpenModal('b2b_request')" class="B2B_Button">Request a demo</div>
        <div class="Left">
          <template v-if="!video.is_playing">
            <div @click="VideoStart" class="Splash" :class="{'processing_start': video.processing_start, 'processing_load': video.processing_load}">
              <div class="Image"></div>
              <div class="ImageSplash"></div>
              <i class="bi bi-play"></i>
              <div class="Visual"></div>
            </div>
          </template>
          <template v-else>
            <div @click="VideoStop" class="Splash stop">
              <i class="bi bi-stop"></i>
            </div>
          </template>
          <video id="video" @ended="VideoEnd" :controls="video.is_controls">
            <source src="/engine/assets/movies/omara.mp4" type="video/mp4">
          </video>
        </div>
        <div class="Right">
          <div class="Title">{{ is_desktop ? 'Who trust us' : 'As seen in' }}</div>
          <div class="Cards">
            <img class="i1" src="/engine/assets/img/b2b/1/news/news.png" />
            <img class="i2" src="/engine/assets/img/b2b/1/news/ap.png" />
            <img class="i3" src="/engine/assets/img/b2b/1/news/fox.png" />
            <img class="i4" src="/engine/assets/img/b2b/1/news/abc_news.png" />
            <img class="i5" src="/engine/assets/img/b2b/1/news/ifbb.png" />
          </div>
          <div class="Text">Supported by Michael O'Mara<br>Director of IFBB Western Australi</div>
          <div class="separator"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'B2B_HomeTrust',
  data(){
    return {
      video: {
        el: null,
        is_playing: false,
        is_controls: false,
        processing_load: false,
        processing_start: false,
        processing_stoping: false
      },
      is_desktop: this.$state.page_state.width > 1050
    }
  },
  methods: {
    async VideoEnd(){
      this.video.is_playing = false;
      this.video.processing_start = true;
      this.video.processing_stoping = true;
      await this.$Func.Sleep(30);
      this.video.processing_start = false;
      await this.$Func.Sleep(500);
      this.video.processing_stoping = false;
    },
    async VideoStop(){
      if(this.video.processing_load || this.video.processing_start || !this.video.is_playing || this.video.processing_stoping) return;
      this.video.el?.pause();
      this.VideoEnd();
    },
    async VideoStart(){
      if(this.video.processing_load || this.video.processing_start || this.video.is_playing) return;
      this.video.el = document.getElementById("video");

      this.video.processing_load = true;
      await this.$Func.Sleep(300);
      this.video.processing_load = false;
      await this.$Func.Sleep(30);
      this.video.processing_start = true;
      await this.$Func.Sleep(300);
      this.video.processing_start = false;
      if(!this.video.el) return;
      this.video.el?.play();
      this.video.is_playing = true;
    },
    async VideoStartTest(){
      this.video.processing_load = true;
      await this.$Func.Sleep(1000);
      this.video.processing_load = false;
      await this.$Func.Sleep(30);
      this.video.processing_start = true;
      await this.$Func.Sleep(300);
      this.video.processing_start = false;
      this.video.is_playing = true;
      await this.$Func.Sleep(1000);
      this.video.is_playing = false;
    }
  },
  watch: {
    '$state.page_state.width'(v){
      this.is_desktop = v > 1050;
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
</style>