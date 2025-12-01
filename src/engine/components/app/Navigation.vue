<template>
  <nav class="nav">
    <ul class="list nav__list" :style="DisableLinks">
      <li @click="CloseModals" class="nav__item">
        <!-- <router-link to="/app/awards" class="nav__link">
          <BaseIcon
            width="24"
            height="24"
            view-box="0 0 24 24"
            class="nav__icon"
          >
            <icon-awards />
          </BaseIcon>
          <span class="text text_size_md nav__text">Awards</span>
        </router-link> -->
        <router-link to="/app/logs" class="nav__link">
          <BaseIcon
            width="22"
            height="24"
            view-box="0 0 22 24"
            class="nav__icon"
          >
            <IconLog />
          </BaseIcon>
          <span class="text text_size_md nav__text">Log</span>
        </router-link>
      </li>
      <li @click="CloseModals" class="nav__item">
        <router-link to="/app" class="nav__link">
          <BaseIcon
            width="24"
            height="24"
            view-box="0 0 24 24"
            class="nav__icon"
          >
            <icon-home />
          </BaseIcon>
          <span class="text text_size_md nav__text">Home</span>
        </router-link>
      </li>
      <li @click="CloseModals" class="nav__item">
        <router-link to="/app/profile" class="nav__link">
          <BaseIcon
            width="19"
            height="24"
            view-box="0 0 19 24"
            class="nav__icon"
          >
            <IconProfile />
          </BaseIcon>
          <span class="text text_size_md nav__text">Profile</span>
        </router-link>
      </li>
      <li @click="openAICoach" class="nav__item">
        <a class="nav__link">
          <img
            src="/engine/assets/img/nfitAI.svg"
            class="nav__icon"
            width="50"
            height="50"
          />

          <!-- <BaseIcon width="24" height="24" view-box="0 0 24 24" class="nav__icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="currentColor"/>
            </svg>
          </BaseIcon> -->
          <!-- <span class="text text_size_md nav__text">nAI</span> -->
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
import BaseIcon from "./BaseIcon.vue";
//import IconAwards from "./icons/IconAwards.vue";
import IconLog from "./icons/IconLog.vue";
import IconHome from "./icons/IconHome.vue";
import IconProfile from "./icons/IconProfile.vue";
//import IconSettings from "./icons/IconSettings.vue";

export default {
  name: "AppNavigation",
  methods: {
    CloseModals() {
      this.$PageController.CloseAllModals();
    },
    openAICoach() {
      this.CloseModals();
      this.$parent.$parent.toggleAICoach();
    },
  },
  computed: {
    DisableLinks() {
      // Блокируем навигацию если онбординг не завершен
      // Используем реактивный флаг из userdata
      if (!this.$user.onboarding_completed) {
        return "pointer-events: none; opacity: .5;";
      }

      if (!this.$User.isAuthed()) return "pointer-events: none; opacity: .5;";
      return "";
    },
  },
  components: {
    BaseIcon,
    //IconAwards,
    IconLog,
    IconHome,
    IconProfile,
    //IconSettings,
  },
};
</script>
