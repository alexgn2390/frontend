
<template>
  <section class="B2B_HomeTop">
    <div class="Container">
      <div class="Content">
        <div class="Wrapper">
          <div class="Left">
            <div class="Title">Maximize Care/<br><span>/Minimize Costs</span></div>
            <text>nFitnity brings 24/7 top-tier AI fitness coaching to your facility at an unbeatable $10/month, slashing your staffing expenses and elevating resident care</text>
            <div @click="$PageController.OpenModal('b2b_request')" class="B2B_Button">Request a demo</div>
          </div>
          <img :src="is_desktop ? `/engine/assets/img/b2b/1/top_lines.png` : `/engine/assets/img/b2b/1/top.png`" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'B2B_HomeTop',
  data(){
    return {
      is_desktop: this.$state.page_state.width > 1050
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
