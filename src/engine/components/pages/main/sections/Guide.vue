<template>
  <section class="Guide">
    <img class="Guide_Background" src="/engine/assets/img/index/center-pattern.png">
    <div class="Guide_Content">
      <h2 class="Guide_Title" v-html="$t('pages.main.guide_title')"></h2>
      <div class="Guide_Body">
        <div class="Guide_Left">
          <h3 class="Guide_SubTitle" v-html="$t('pages.main.guide_text')"></h3>
          <p class="Guide_Text" v-html="$t('pages.main.guide_1')"></p>
          <p class="Guide_Text" v-html="$t('pages.main.guide_2')"></p>
          <p class="Guide_Text" v-html="$t('pages.main.guide_3')"></p>
          <p class="Guide_Text" v-html="$t('pages.main.guide_4')"></p>
          <p class="Guide_Text" v-html="$t('pages.main.guide_5')"></p>
          <div @click="MyMagic" class="Guide_Button">{{ $t('pages.main.guide_button') }}</div>
        </div>
        <div class="Guide_Right">
          <img class="Guide_Image" src="/engine/assets/img/index/guide.png">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'GuideSection',
  methods: {
    MyMagic(){
      this.$Func.GoToFrame(this);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>