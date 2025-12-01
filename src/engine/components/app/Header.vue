<template>
  <header class="header">
    <div class="container header__container">
      <BackButton @click="BackClick" class="header__back" :back_link="back_link" />
      <div class="header__wrapper">
        <i v-if="icon" :class="icon"></i>
        <img v-if="img_icon" :src="img_icon" />
        <AppText tag="h2" :text="title" classes="text_theme_dark text_size_lg text_weight_medium header__title" />
      </div>
    </div>
  </header>
</template>

<script>
import BackButton from "./BackButton.vue";
import AppText from "./AppText.vue";

export default {
  name: 'AppHeader',
  emits: ['bClick'],
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    img_icon: {
      type: String,
      default: ''
    },
    back_link: {
      type: String,
      default: ''
    }
  },
  methods: {
    BackClick(){
      this.$emit('bClick');
    }
  },
  components: {
    BackButton,
    AppText
  }
}
</script>
