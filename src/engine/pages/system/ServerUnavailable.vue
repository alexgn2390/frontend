<template>
  <div class="ErrorCard">
    <div class="ErrorCard_content">
      <div class="ErrorCard_title">{{ $t('header.titles.server_error') }}</div>
      <div class="ErrorCard_message">{{ $t('header.descriptions.server_error') }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServerUnavailable',
  created(){ this.$PageController.pageSettings('Server Unavailable', 'server_error'); },
  mounted(){ this.$PageController.pageMounted(); },
  beforeUnmount(){ this.$PageController.pageUnmounted(); }
}
</script>