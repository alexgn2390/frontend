<template>
  <div class="login__footer">
    <AppText tag="h3" classes="text_size_lg text_theme_dark login__footer-text" text="Sign in with" />

    <div class="login__socials">
      <a href="#" aria-label="Login with Apple">
        <BaseIcon>
          <icon-apple />
        </BaseIcon>
      </a>
      <a href="#" aria-label="Login with Facebook">
        <BaseIcon>
          <icon-facebook />
        </BaseIcon>
      </a>
      <a href="#" aria-label="Login with Google">
        <BaseIcon>
          <icon-google />
        </BaseIcon>
      </a>
    </div>
  </div>
</template>

<script>
import AppText from "@/engine/components/app/AppText.vue";

import BaseIcon from "@/engine/components/app/BaseIcon.vue";
import IconApple from "@/engine/components/app/icons/IconApple.vue";
import IconFacebook from "@/engine/components/app/icons/IconFacebook.vue";
import IconGoogle from "@/engine/components/app/icons/IconGoogle.vue";

export default {
  name: 'AppSocials',
  components: {
    AppText,
    BaseIcon,
    IconApple,
    IconFacebook,
    IconGoogle,
  }
}
</script>
