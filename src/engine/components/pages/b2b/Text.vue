<template>
  <section class="B2B_Text">
    <div class="Head">
      <text>Schedule a Demo</text>
    </div>
    <div class="Container">
      <div class="Content">
        <text>Discover the nFitnity Difference: Ready to see how nFitnity can transform the fitness and wellness experience in your facility?</text>
        <text>Schedule a live demo today and explore the benefits of our AI-driven fitness coaching for resident health and satisfaction</text>
        <div @click="$PageController.OpenModal('b2b_request')" class="B2B_Button">Request a demo</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'B2B_Text',
  components: {}
}
</script>

<style lang="scss" scoped>
</style>