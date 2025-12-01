<template>
  <label class="check">
    <input @click="value" type="checkbox" role="checkbox" aria-checked="false" class="check__native" v-model="model" />
    <span class="check__box"></span>
    <span class="text text_size_sm text_theme_textgray text_font_secondary text_weight_normal check__text">
      {{ checkText }}
    </span>
  </label>
</template>

<script>
export default {
  name: 'AppCheckBox',
  emits: ['update:value'],
  data(){
    return {
      model: false
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    checkText: {
      type: String,
      default: "",
    },
  },
  methods: {
    click(e){
      const { value } = e.target;
      this.$emit('update:value', value);
    },
  }
}
</script>
