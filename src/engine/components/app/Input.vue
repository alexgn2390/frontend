<template>
  <label class="label">
    <input :value="modelValue" :type="inputType" :placeholder="inputPlaceholder" class="input"
      :class="[classes, { input_theme_error: errorClass }]" @input="input" :maxlength="maxlength" />
  </label>
</template>

<script>
export default {
  name: 'AppInput',
  emits: ['update:modelValue'],
  props: {
    inputType: {
      type: String,
      default: "text",
    },
    inputPlaceholder: {
      type: String,
      default: "",
    },
    classes: {
      type: [String, Array, Object],
      default: "",
    },
    errorClass: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    maxlength: {
      type: Number,
      default: 255
    },
  },
  methods: {
    input(e){
      const { value } = e.target;
      this.$emit('update:modelValue', value);
    },
  }
}
</script>
