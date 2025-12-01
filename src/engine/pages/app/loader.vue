<template>
  <div class="welcome loader">
    <div class="container loader__content">
      <AppText tag="h2" classes="text_theme_dark text_size_xl text_weight_semibold loader__title" :text="$t('app.general.loader')" />

      <div class="loader__circle">
        <svg class="loader__circle-icon" :style="{ '--percent': progress }">
          <circle cx="132" cy="132" r="132"></circle>
          <circle cx="132" cy="132" r="132"></circle>
        </svg>
        <span class="loader__circle-text">{{ progress }} %</span>
      </div>
    </div>
  </div>
</template>

<script>
import AppText from "@/engine/components/app/AppText.vue";

export default {
  name: 'AppLoaderPage',
  data() {
    return {
      interval: null,
      progress: 0,
    }
  },
  mounted(){
    this.$state.app.hide_ui = true;

    this.interval = setInterval(() => {
      if(this.progress === 100){
        clearInterval(this.interval);
        this.$router.push('/app');
        return
      }

      this.progress += 1;
    }, 50);
  },
  beforeUnmount(){
    clearInterval(this.interval);
    this.$state.app.hide_ui = false;
  },
  components: {
    AppText,
  }
}
</script>
