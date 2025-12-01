<template>
  <div class="Info">
    <div class="Info_Title">{{ title }}</div>
    <div class="Info_Text">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: 'InfoCard',
  props: {
    title: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
  }
}
</script>

<style lang="scss" scoped>
</style>