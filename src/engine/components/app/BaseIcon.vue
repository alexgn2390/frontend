<template>
  <svg aria-hidden="true" :width="width" :height="height" :viewBox="viewBox" role="presentation"
    xmlns="http://www.w3.org/2000/svg" class="icon">
    <slot />
  </svg>
</template>

<script>
export default {
  name: 'AppBaseIcon',
  props: {
    height: {
      type: [String, Number],
      default: 32,
    },
    width: {
      type: [String, Number],
      default: 32,
    },
    viewBox: {
      type: [String, Number],
      default: "0 0 32 32",
    },
  }
}
</script>

<style scoped>
.icon {
  flex-shrink: 0;
}
</style>
