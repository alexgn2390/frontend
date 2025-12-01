<template>
  <div class="workout-generation-overlay">
    <div class="workout-generation">
      <div class="generation-icon">
        <div class="spinner">
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
        </div>
        <div class="icon-center">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  fill="#6366F1" stroke="#6366F1" stroke-width="1"/>
          </svg>
        </div>
      </div>

      <h2 class="generation-title">{{ title }}</h2>
      <p class="generation-subtitle">{{ subtitle }}</p>

      <div class="generation-progress">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progress + '%' }"></div>
        </div>
        <div class="progress-steps">
          <div v-for="step in steps" :key="step.id"
               :class="['progress-step', { active: currentStep >= step.id, completed: currentStep > step.id }]">
            <div class="step-icon">
              <svg v-if="currentStep > step.id" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span v-else>{{ step.id }}</span>
            </div>
            <span class="step-text">{{ step.text }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WorkoutGenerationAnimation',
  data() {
    return {
      title: 'Creating your first program...',
      subtitle: 'Analyzing your preferences and building personalized workout',
      progress: 0,
      currentStep: 0,
      steps: [
        { id: 1, text: 'Analyzing profile' },
        { id: 2, text: 'Selecting exercises' },
        { id: 3, text: 'Building schedule' },
        { id: 4, text: 'Finalizing program' }
      ]
    }
  },
  mounted() {
    this.startAnimation();
  },
  methods: {
    startAnimation() {
      // Прогресс-бар анимация
      const progressInterval = setInterval(() => {
        if (this.progress < 100) {
          this.progress += 2;
        } else {
          clearInterval(progressInterval);
        }
      }, 50);

      // Шаги анимация
      const stepDuration = 600;
      this.steps.forEach((step, index) => {
        setTimeout(() => {
          this.currentStep = step.id;
        }, index * stepDuration);
      });

      // Завершение анимации
      setTimeout(() => {
        this.$emit('generation-complete');
      }, 3000);
    }
  }
}
</script>

<style lang="scss" scoped>
.workout-generation-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease-out;
}

.workout-generation {
  background: white;
  border-radius: 24px;
  padding: 48px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.5s ease-out;
}

.generation-icon {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 32px;
}

.spinner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.spinner-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-top-color: #6366F1;
  border-radius: 50%;
  animation: spin 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;

  &:nth-child(2) {
    width: 80%;
    height: 80%;
    top: 10%;
    left: 10%;
    border-top-color: #818CF8;
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    width: 60%;
    height: 60%;
    top: 20%;
    left: 20%;
    border-top-color: #A5B4FC;
    animation-delay: 0.4s;
  }
}

.icon-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: pulse 2s ease-in-out infinite;
}

.generation-title {
  font-size: 28px;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 12px;
}

.generation-subtitle {
  font-size: 16px;
  color: #718096;
  margin-bottom: 40px;
  line-height: 1.5;
}

.generation-progress {
  margin-top: 32px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #E2E8F0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 24px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #6366F1 0%, #818CF8 100%);
  border-radius: 4px;
  transition: width 0.3s ease-out;
}

.progress-steps {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  text-align: left;
}

.progress-step {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #F7FAFC;
  border-radius: 12px;
  transition: all 0.3s;
  opacity: 0.5;

  &.active {
    opacity: 1;
    background: #EEF2FF;
    transform: scale(1.02);
  }

  &.completed {
    opacity: 1;
    background: #6366F1;

    .step-text {
      color: white;
    }

    .step-icon {
      background: rgba(255, 255, 255, 0.2);
      color: white;
    }
  }
}

.step-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #E2E8F0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  color: #4A5568;
  flex-shrink: 0;
  transition: all 0.3s;
}

.step-text {
  font-size: 14px;
  font-weight: 500;
  color: #2D3748;
  transition: color 0.3s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
  }
}

@media (max-width: 768px) {
  .workout-generation {
    padding: 32px 24px;
  }

  .generation-title {
    font-size: 24px;
  }

  .generation-subtitle {
    font-size: 14px;
  }

  .progress-steps {
    grid-template-columns: 1fr;
  }
}
</style>
