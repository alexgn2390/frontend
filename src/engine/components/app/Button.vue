<template>
  <button @click="Clicked" :type="buttonType">{{ buttonText }}</button>
</template>

<script>
export default {
  name: 'AppButton',
  emits: ['сlicked'],
  props: {
    buttonType: {
      type: String,
      default: "button",
    },
    buttonText: {
      type: String,
      default: "",
    },
  },
  methods: {
    Clicked(){
      this.$emit('сlicked');
    }
  }
}
</script>
