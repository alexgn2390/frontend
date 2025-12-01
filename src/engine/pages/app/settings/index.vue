<template>
  <div class="section section_theme_lightblue">
    <Header :title="$t('app.settings.title')" class="section__header_type_one" />

    <div class="container section__container">
      <ul class="list params__info">
        <li class="params__info-item">
          <span class="text text_theme_dark text_size_md text_weight_normal">
            {{ $t('app.settings.age_group') }}
          </span>
          <span class="text text_theme_gray text_size_md text_weight_normal params__info-text">
            54 - 65
          </span>
        </li>
        <li class="params__info-item">
          <span class="text text_theme_dark text_size_md text_weight_normal">
            {{ $t('app.settings.fitness_goal') }}
          </span>
          <span class="text text_theme_gray text_size_md text_weight_normal params__info-text">
            Wellness and health
          </span>
        </li>
        <li class="params__info-item">
          <span class="text text_theme_dark text_size_md text_weight_normal">
            {{ $t('app.settings.training_type') }}
          </span>
          <span class="text text_theme_gray text_size_md text_weight_normal params__info-text">
            Full Training Program
          </span>
        </li>
      </ul>

      <router-link to="/app/settings/edit" class="button button_theme_default button_size_md button_is_wide">
        {{ $t('app.settings.edit') }}
      </router-link>
    </div>
  </div>
</template>

<script> /* eslint-disable */ 
import Header from "@/engine/components/app/Header.vue";
import Params from "@/engine/components/app/Params.vue";
import Button from "@/engine/components/app/Button.vue";

export default {
  name: 'AppSettingsIndexPage',
  data() {
    return {}
  },
  components: {
    Header,
    Params,
    Button
  }
}
</script>