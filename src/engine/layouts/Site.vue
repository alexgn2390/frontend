<template>
  <RouterView />
  
  <MainModal id="b2b_request" name="B2B_Request" />
</template>

<script>
import MainModal from "@/engine/components/app/modals/MainModal.vue";

export default {
  name: 'SiteLayout',
  components: {
    MainModal,
  }
}
</script>

<style lang="scss">
@import "@/engine/assets/scss/_style.scss";
</style>