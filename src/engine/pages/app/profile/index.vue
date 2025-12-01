<template>
  <div class="section section_theme_lightblue">
    <Header :title="$t('app.profile.title')" class="section__header_type_two" back_link="/app" />

    <div class="section__logo">
      <img src="/engine/assets/img/app/profile.png" />
    </div>

    <div class="container section__container">
      <ul class="list params__info">
        <li class="params__info-item">
          <span class="text text_theme_dark text_size_md text_weight_normal">
            {{ $t('app.general.name') }}
          </span>
          <span class="text text_theme_gray text_size_md text_weight_normal params__info-text">
            {{ $user.name }}
          </span>
        </li>
        <li class="params__info-item">
          <span class="text text_theme_dark text_size_md text_weight_normal">
            {{ $t('app.general.phone') }}
          </span>
          <span class="text text_theme_gray text_size_md text_weight_normal params__info-text">
            {{ $user.phone }}
          </span>
        </li>
        <li class="params__info-item">
          <span class="text text_theme_dark text_size_md text_weight_normal">
            {{ $t('app.general.email') }}
          </span>
          <span class="text text_theme_gray text_size_md text_weight_normal params__info-text">
            {{ $user.email }}
          </span>
        </li>
      </ul>

      <router-link to="/app/profile/edit" class="button button_theme_default button_size_md button_is_wide">
        {{ $t('app.profile.btn_edit') }}
      </router-link>

      <button type="button" class="button button_theme_default button_size_md button_is_wide" style="margin-bottom: 15px" @click="logout">
        {{ $t('app.profile.btn_logout') }}
      </button>
    </div>
  </div>
</template>

<script>
import Header from "@/engine/components/app/Header.vue";

export default {
  name: 'AppProfileIndexPage',
  data() {
    return {}
  },
  methods: {
    logout() {
      this.$User.logOut();
    }
  },
  components: {
    Header
  }
}
</script>
