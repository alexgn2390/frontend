<template>
  <div class="welcome">
    <div class="welcome__logo">
      <img src="/engine/assets/img/app/logo.png" style="width: 70%;" />
    </div>
    <div class="welcome__content">
      <AppText tag="h2" classes="text text_theme_dark text_size_xl text_weight_semibold welcome__title" :text="$t('app.welcome.title')" />
      <p class="text text_theme_gray text_size_md text_font_secondary text_weight_normal welcome__text">
        {{ $t('app.welcome.text') }}
      </p>
      <Button @Click="GetStarted" button-type="button" :button-text="$t('app.welcome.button')" class="button button_theme_default button_size_md button_is_wide" />
    </div>
  </div>
</template>

<script>
import AppText from "@/engine/components/app/AppText.vue";
import Button from "@/engine/components/app/Button.vue";

export default {
  name: 'AppWelcomePage',
  methods: {
    async GetStarted(){
      // Инициализируем временного пользователя
      await this.$User.initTempUser();

      // Перенаправляем на страницу онбординга
      this.$router.push('/app/ai-coach?onboarding=true');
    }
  },
  components: {
    AppText,
    Button,
  }
}
</script>
