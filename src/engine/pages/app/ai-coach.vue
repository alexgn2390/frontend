<template>
  <div class="ai-coach-page">
    <!-- Анимация генерации программы -->
    <WorkoutGenerationAnimation
      v-if="showGenerationAnimation"
      @generation-complete="handleGenerationComplete"
    />

    <!-- Экран готовности программы -->
    <WorkoutReadyScreen
      v-if="showReadyScreen"
      @go-to-main="handleGoToMain"
    />

    <Header title="AI Coach" :back_link="backLinkPath" />

    <div class="ai-coach-container">
      <AICoach
        v-if="showCoach"
        @close="handleClose"
        @workout-started="handleWorkoutStarted"
        @onboarding-complete="handleOnboardingComplete"
      />

      <div v-else class="ai-coach-intro">
        <div class="intro-icon">
          <img
            src="/engine/assets/img/nfitAI_logo_138.svg"
            class="nav__icon"
            width="90"
            height="90"
          />
          <!-- <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="#6366F1"/>
          </svg> -->
        </div>
        
        <h2>Meet Your nAI Coach</h2>
        <p>Your personal fitness companion, available 24/7 to help you achieve your goals</p>
        
        <div class="intro-features">
          <div class="feature-card">
            <div class="feature-icon">💪</div>
            <h4>Personalized Workouts</h4>
            <p>Tailored to your fitness level and goals</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🎯</div>
            <h4>Adaptive Training</h4>
            <p>Adjusts based on your daily energy and stress</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🧘</div>
            <h4>Holistic Wellness</h4>
            <p>Includes recovery and stress management</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">📈</div>
            <h4>Progress Tracking</h4>
            <p>Monitors your improvement over time</p>
          </div>
        </div>
        
        <button @click="startChat" class="start-button">
          Start Conversation
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/engine/components/app/Header.vue";
import AICoach from "@/engine/components/app/AICoach.vue";
import WorkoutGenerationAnimation from "@/engine/components/app/WorkoutGenerationAnimation.vue";
import WorkoutReadyScreen from "@/engine/components/app/WorkoutReadyScreen.vue";

export default {
  name: 'AiCoachPage',
  data() {
    return {
      showCoach: false,
      showGenerationAnimation: false,
      showReadyScreen: false
    }
  },
  computed: {
    backLinkPath() {
      // Во время онбординга ВСЕГДА возвращаемся на welcome страницу
      // Это предотвращает попадание на главный экран через браузерную историю
      if (!this.$User.hasCompletedOnboarding()) {
        return '/app/welcome';
      }
      // После завершения онбординга разрешаем стандартную навигацию назад
      return '';
    }
  },
  methods: {
    startChat() {
      this.showCoach = true;

      // Check if user needs onboarding
      if (!this.$User.hasCompletedOnboarding()) {
        this.$nextTick(() => {
          this.$refs.aiCoach?.startOnboarding();
        });
      }
    },

    handleClose() {
      this.showCoach = false;
    },

    handleWorkoutStarted() {
      // Navigate to workout session
      this.$router.push('/app/session?ai=true');
    },

    handleOnboardingComplete(data) {
      // Скрываем AI Coach
      this.showCoach = false;

      // Показываем анимацию генерации
      if (data && data.showAnimation) {
        this.showGenerationAnimation = true;
      }
    },

    handleGenerationComplete() {
      // Скрываем анимацию генерации
      this.showGenerationAnimation = false;

      // Показываем экран готовности
      this.showReadyScreen = true;
    },

    async handleGoToMain() {
      // Отмечаем онбординг как завершенный
      this.$User.setOnboardingCompleted();

      // Скрываем экран готовности
      this.showReadyScreen = false;

      // Даем Vue время обработать изменения
      await this.$nextTick();

      // Перенаправляем на главную страницу
      this.$router.push('/app');
    }
  },
  async mounted() {
    // Wait for user authentication to be ready
    if (!this.$User.isAuthed()) {
      await this.$User.getMyInform();
    }
    
    // Auto-start chat if coming from registration
    if (this.$route.query.start === 'true' || this.$route.query.onboarding === 'true') {
      this.showCoach = true;
    }
  },
  components: {
    Header,
    AICoach,
    WorkoutGenerationAnimation,
    WorkoutReadyScreen
  }
}
</script>

<style lang="scss" scoped>
.ai-coach-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.ai-coach-container {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.ai-coach-intro {
  background: white;
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  
  .intro-icon {
    margin: 0 auto 24px;
    width: 80px;
    height: 80px;
    background: #FFFFFF;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    svg {
      fill: white;
    }
  }
  
  h2 {
    font-size: 28px;
    color: #2d3748;
    margin-bottom: 8px;
  }
  
  > p {
    font-size: 16px;
    color: #718096;
    margin-bottom: 40px;
  }
}

.intro-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.feature-card {
  padding: 24px;
  background: #f7fafc;
  border-radius: 12px;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }
  
  .feature-icon {
    font-size: 32px;
    margin-bottom: 12px;
  }
  
  h4 {
    font-size: 16px;
    color: #2d3748;
    margin-bottom: 8px;
  }
  
  p {
    font-size: 14px;
    color: #718096;
  }
}

.start-button {
  padding: 16px 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
  }
}

// Mobile responsiveness
@media (max-width: 768px) {
  .ai-coach-container {
    padding: 10px;
  }
  
  .ai-coach-intro {
    padding: 24px;
    
    h2 {
      font-size: 24px;
    }
  }
  
  .intro-features {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
