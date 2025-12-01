<template>
  <div class="container login login_type_center">
    <div class="login__head">
      <AppText tag="h2" classes="text_size_xl text_weight_semibold text_theme_dark login__text" text="Gym Registration Code" />
      <p class="text text_theme_gray text_size_sm text_font_secondary text_weight_normal login__text">
        Do you have GYM registration code?
      </p>
      <form class="form login__form-code">
        <div class="login__code">
          <Input aria-label="Enter registration code" input-type="text" input-placeholder="GYM registration code" classes="input_theme_default input_size_md" />
        </div>

        <Button button-type="submit" button-text="Continue" class="button button_theme_default button_size_md button_is_wide" />
      </form>

      <router-link to="/app" class="text text_theme_purple text_size_md text_weight_medium">
        I don’t have any registration code
      </router-link>
    </div>
  </div>
</template>

<script>
import AppText from "@/engine/components/app/AppText.vue";
import Input from "@/engine/components/app/Input.vue";
import Button from "@/engine/components/app/Button.vue";

export default {
  name: 'AppCodePage',
  components: {
    AppText,
    Input,
    Button,
  }
}
</script>
