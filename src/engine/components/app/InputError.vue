<template>
  <p class="text text_size_md text_font_secondary text_weight_normal text_theme_red form__error">
    <BaseIcon width="22" height="22" view-box="0 0 22 22" fill="none">
      <icon-error />
    </BaseIcon>
    <span>{{ text }}</span>
  </p>
</template>

<script>
import BaseIcon from "@/engine/components/app/BaseIcon.vue";
import IconError from "@/engine/components/app/icons/IconError.vue";

export default {
  name: 'AppInputError',
  props: {
    text: {
      type: String,
      default: "Field is required",
    },
  },
  components: {
    BaseIcon,
    IconError,
  }
}
</script>
