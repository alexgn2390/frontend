<template>
  <div class="ErrorCard">
    <div class="ErrorCard_content">
      <div class="ErrorCard_title">{{ $t('header.titles.session_error') }}</div>
      <div class="ErrorCard_message">{{ $t('header.descriptions.session_error') }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SessionUnavailable',
  created(){ this.$PageController.pageSettings('Session Unavailable', 'session_error'); },
  mounted(){ this.$PageController.pageMounted(); },
  beforeUnmount(){ this.$PageController.pageUnmounted(); }
}
</script>