<template>
  <section class="App">
    <div class="App_Content">
      <img class="App_Circle" src="/engine/assets/img/index/circle.png">
      <img class="App_CircleBig" src="/engine/assets/img/index/circle-big.png">
      <div class="App_Left">
        <img class="App_Image" src="/engine/assets/img/index/phone-full.png">
      </div>
      <div class="App_Right">
        <h2 class="App_Title" v-html="$t('pages.main.app_title')"></h2>
        <h2 class="App_Text">{{ $t('pages.main.app_text') }}</h2>
        <div @click="MakeMagic" class="App_Button">{{ $t('pages.main.app_button') }}</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AppSection',
  methods: {
    MakeMagic(){
      this.$Func.GoToFrame(this);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>