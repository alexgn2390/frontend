<template>
  <div class="SwitchButton">
    <div class="SwitchButton_Wrap">
      <div @click="Switched" class="switch-btn" :class="[classes, {'big': is_big, 'error': is_error, 'switch-on': selected, 'switch-off': disabled, 'switch-bad': bad}]" >
        <div class="circle">
          <i v-if="icon" :class="`bi bi-${icon}`"></i>
        </div>
      </div>
    </div>
    <div v-if="title" class="SwitchButton_Label">{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: 'SwitchButton',
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
    icon: {
      type: String,
      default: ''
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
    is_big: {
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