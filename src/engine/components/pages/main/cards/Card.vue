<template>
  <div class="Card">
    <div class="CardHeader">
      <div class="Card_IconWrapper">
        <img class="Card_Icon" :src="ico">
      </div>
      <h2 class="Card_Title" :class="{ 'min': min }">{{ title }}</h2>
    </div>
    <p class="CardText">{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: 'CardsCard',
  props: {
    title: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    ico: {
      type: String,
      default: ""
    },
    min: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>