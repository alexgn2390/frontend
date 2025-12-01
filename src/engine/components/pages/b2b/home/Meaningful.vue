<template>
  <section class="B2B_HomeMeaningful">
    <div class="Container">
      <div class="Content">
        <div class="Wrapper">
          <text>Meaningful<br>solutions<br v-if="is_desktop"> of nFitnity</text>
          <img src="/engine/assets/img/b2b/1/meaningful.png" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'B2B_HomeMeaningful',
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