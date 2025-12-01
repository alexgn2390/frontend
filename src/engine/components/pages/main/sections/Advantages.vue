<template>
  <section class="Advantages">
    <div class="Cards_Content">
      <Card :title="$t('pages.main.advantages.solution_title')" :text="$t('pages.main.advantages.solution_text')" ico="/engine/assets/img/advantages/solution.png" />
      <Card :title="$t('pages.main.advantages.intensity_title')" :text="$t('pages.main.advantages.intensity_text')" ico="/engine/assets/img/advantages/intensity.png" :min="true" />
      <Card :title="$t('pages.main.advantages.approach_title')" :text="$t('pages.main.advantages.approach_text')" ico="/engine/assets/img/advantages/approach.png" />
    </div>
  </section>
</template>

<script>
import Card from '@/engine/components/pages/main/cards/Card'

export default {
  name: 'AdvantagesSection',
  components: {
    Card
  }
}
</script>

<style lang="scss" scoped>
</style>