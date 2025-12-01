<template>
  <section class="Inform">
    <img class="Inform_Background" src="/engine/assets/img/index/bottom-pattern.png">
    <div class="Inform_Content">
      <h2 class="Inform_SubTitle">{{ $t('pages.main.inform_health') }}</h2>
      <h2 class="Inform_TitleMobile" v-html="`${$t('pages.main.inform_health')} ${$t('pages.main.inform_title')}`"></h2>
      <h2 class="Inform_Title" v-html="$t('pages.main.inform_title')"></h2>
      <img class="Inform_Image" src="/engine/assets/img/index/grandfather-phone.png">
      <div class="Inform_Right">
        <Info :title="$t('pages.main.informs.title_1')" :text="$t('pages.main.informs.text_1')" />
        <Info :title="$t('pages.main.informs.title_2')" :text="$t('pages.main.informs.text_2')" />
        <Info :title="$t('pages.main.informs.title_3')" :text="$t('pages.main.informs.text_3')" />
        <Info :title="$t('pages.main.informs.title_4')" :text="$t('pages.main.informs.text_4')" />
      </div>
      <div class="Inform_Bottom">
        <Info :title="$t('pages.main.informs.title_5')" :text="$t('pages.main.informs.text_5')" />
        <Info :title="$t('pages.main.informs.title_6')" :text="$t('pages.main.informs.text_6')" />
      </div>
      <div @click="MyMagic" class="Inform_Button">{{ $t('pages.main.inform_button') }}</div>
    </div>
  </section>
</template>

<script>
import Info from '@/engine/components/pages/main/cards/Info'

export default {
  name: 'InformSection',
  methods: {
    MyMagic(){
      this.$Func.GoToFrame(this);
    }
  },
  components: {
    Info
  }
}
</script>

<style lang="scss" scoped>
</style>