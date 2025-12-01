<template>
  <section class="MainCards">
    <div class="Cards_Content">
      <Card :title="$t('pages.main.cards.instruction_title')" :text="$t('pages.main.cards.instruction_text')" ico="/engine/assets/img/cards/instruction.png" :min="true" />
      <Card :title="$t('pages.main.cards.video_title')" :text="$t('pages.main.cards.video_text')" ico="/engine/assets/img/cards/video.png" :min="true" />
      <Card :title="$t('pages.main.cards.library_title')" :text="$t('pages.main.cards.library_text')" ico="/engine/assets/img/cards/library.png" />
      <Card :title="$t('pages.main.cards.tracking_title')" :text="$t('pages.main.cards.tracking_text')" ico="/engine/assets/img/cards/tracking.png" />
      <Card :title="$t('pages.main.cards.plan_title')" :text="$t('pages.main.cards.plan_text')" ico="/engine/assets/img/cards/plan.png" />
      <Card :title="$t('pages.main.cards.design_title')" :text="$t('pages.main.cards.design_text')" ico="/engine/assets/img/cards/design.png" />
    </div>
  </section>
</template>

<script>
import Card from '@/engine/components/pages/main/cards/Card'

export default {
  name: 'CardsSection',
  components: {
    Card
  }
}
</script>

<style lang="scss" scoped>
</style>