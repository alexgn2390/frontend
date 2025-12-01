<template>
  <div class="bg">
    <div class="main">
      <RouterView />
      <transition name="slide-fade-bottom" mode="out-in" appear>
        <Navigation v-if="shouldShowNavigation" class="main__nav" />
      </transition>
    </div>


    <!-- AI Coach Modal -->
    <transition name="slide-up">
      <div v-if="showAICoach" class="ai-coach-modal">
        <div class="ai-coach-modal__backdrop" @click="closeAICoach"></div>
        <div class="ai-coach-modal__content">
          <AICoach @close="closeAICoach" @onboarding-complete="handleOnboardingComplete" />
        </div>
      </div>
    </transition>

    <MainModal id="alert" name="Alert" />
    <MainModal id="instruction" name="Instruction" />
    <MainModal id="test" name="AlertTest" />
  </div>
</template>

<script>
import Navigation from "@/engine/components/app/Navigation.vue";
import MainModal from "@/engine/components/app/modals/MainModal.vue";
import AICoach from "@/engine/components/app/AICoach.vue";

export default {
  name: 'AppLayout',
  data() {
    return {
      showAICoach: false
    }
  },
  computed: {
    shouldShowNavigation() {
      // Скрываем навигацию на определенных страницах
      const hiddenRoutes = ['/app/welcome', '/app/ai-coach'];
      const currentPath = this.$route.path;

      // Проверяем если пользователь на странице где навигация должна быть скрыта
      if (hiddenRoutes.includes(currentPath)) {
        return false;
      }

      // Показываем навигацию только если онбординг завершен (используем реактивный флаг)
      if (!this.$user.onboarding_completed) {
        return false;
      }

      // Обычная проверка
      return this.$state.app.show_nav && !this.$state.app.hide_ui;
    }
  },
  methods: {
    toggleAICoach() {
      this.showAICoach = !this.showAICoach;

      // Предотвращаем скролл когда открыт AI Coach
      if (this.showAICoach) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    },
    closeAICoach() {
      this.showAICoach = false;
      document.body.style.overflow = '';
    },
    handleOnboardingComplete() {
      // Закрываем чат после завершения онбординга
      this.closeAICoach();
    }
  },
  created(){
    this.$User.created();
  },
  beforeUnmount() {
    // Восстанавливаем скролл при уничтожении компонента
    document.body.style.overflow = '';
  },
  components: {
    Navigation,
    MainModal,
    AICoach,
  },
}
</script>

<style lang="scss">
@import "@/engine/assets/scss/_app.scss";

// AI Coach Modal
.ai-coach-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  &__backdrop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
  }

  &__content {
    position: relative;
    width: 100%;
    max-width: 500px;
    max-height: 90vh;
    z-index: 1001;
    animation: slideUp 0.3s ease-out;
  }
}

// Animations
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.scale-fade-enter-active,
.scale-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.scale-fade-enter-from,
.scale-fade-leave-to {
  opacity: 0;
  transform: scale(0);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;

  .ai-coach-modal__backdrop {
    opacity: 0;
  }

  .ai-coach-modal__content {
    transform: translateY(50px);
  }
}

// Mobile responsiveness
@media (max-width: 768px) {
  .ai-coach-modal {
    padding: 0;

    &__content {
      max-width: 100%;
      max-height: 100vh;
      height: 100%;
      border-radius: 0;
    }
  }
}
</style>