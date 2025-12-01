<template>
  <div class="checkbox-row">
    <div @click="Switched" class="checkbox-btn" :class="[classes, {'error': is_error, 'checkbox-on': selected, 'checkbox-off': disabled, 'checkbox-bad': bad}]" ></div>
    <div @click="Switched" v-if="title" class="checkbox-label pointer unselectable">{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: 'CheckBox',
  emits: ['switched'],
  props: {
    title: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: 'default'
    },
    selected: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    bad: {
      type: Boolean,
      default: false
    },
    is_error: {
      type: Boolean,
      default: false
    },
    classes: {
      type: [String, Array, Object],
      default: ''
    }
  },
  methods: {
    Switched(){
      if(this.disabled) return;
      this.$emit('switched', this.name, !this.selected);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>