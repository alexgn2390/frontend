<template>
  <div class="ErrorCard">
    <div class="ErrorCard_content">
      <div class="ErrorCard_title">{{ $t('header.titles.site_error') }}</div>
      <div class="ErrorCard_message">{{ error_name ? $t(`errors.${error_name}`) : ($state.site_unavailable ? $state.site_unavailable : $t('errors.unknown_error')) }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SiteUnavailable',
  props: {
    error_name: {
      type: String,
      default: ""
    }
  },
  created(){ this.$PageController.pageSettings('Site Unavailable', 'site_error'); },
  mounted(){ this.$PageController.pageMounted(); },
  beforeUnmount(){ this.$PageController.pageUnmounted(); }
}
</script>

<style lang="scss" scoped></style>