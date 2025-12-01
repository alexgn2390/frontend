<template>
  <transition name="popup-fade">
    <div v-if="show" class="welcome-back-overlay" @click="handleClose">
      <div class="welcome-back-popup" @click.stop>
        <div class="popup-animation">
          <div class="fitness-icon">
            <div class="icon-circle pulse"></div>
            <div class="icon-circle pulse delay-1"></div>
            <div class="icon-circle pulse delay-2"></div>
            <svg class="icon-svg" width="80" height="80" viewBox="0 0 24 24" fill="none">
              <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"
                    fill="#6366F1"/>
            </svg>
          </div>
        </div>

        <h2 class="popup-title">{{ greeting }}</h2>
        <p class="popup-message">{{ message }}</p>

        <div class="popup-stats">
          <div class="stat-item">
            <div class="stat-icon">🔥</div>
            <div class="stat-content">
              <span class="stat-value">{{ stats.streak }}</span>
              <span class="stat-label">Day Streak</span>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">💪</div>
            <div class="stat-content">
              <span class="stat-value">{{ stats.workouts }}</span>
              <span class="stat-label">Workouts</span>
            </div>
          </div>
        </div>

        <button @click="handleClose" class="popup-button">
          Let's Go!
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'WelcomeBackPopup',
  props: {
    userName: {
      type: String,
      default: 'Friend'
    },
    stats: {
      type: Object,
      default: () => ({
        streak: 0,
        workouts: 0
      })
    }
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    greeting() {
      return `Welcome Back, ${this.userName}!`;
    },
    message() {
      return "I'm glad to see you again in our super fitness app.";
    }
  },
  methods: {
    open() {
      this.show = true;
    },
    handleClose() {
      this.show = false;
      this.$emit('close');
    }
  },
  mounted() {
    // Auto-open after a short delay
    setTimeout(() => {
      this.open();
    }, 300);
  }
}
</script>

<style lang="scss" scoped>
.welcome-back-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
}

.welcome-back-popup {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 32px;
  padding: 48px 40px;
  max-width: 480px;
  width: 100%;
  text-align: center;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  animation: popupSlideUp 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    animation: bgRotate 20s linear infinite;
  }
}

.popup-animation {
  position: relative;
  margin-bottom: 32px;
  z-index: 1;
}

.fitness-icon {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-circle {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;

  &.pulse {
    animation: pulse 2s ease-out infinite;
  }

  &.delay-1 {
    animation-delay: 0.3s;
  }

  &.delay-2 {
    animation-delay: 0.6s;
  }
}

.icon-svg {
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  animation: iconFloat 3s ease-in-out infinite;
  fill: white;
}

.popup-title {
  font-size: 32px;
  font-weight: 700;
  color: white;
  margin-bottom: 12px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  animation: fadeInUp 0.6s 0.3s ease-out backwards;
  position: relative;
  z-index: 1;
}

.popup-message {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin-bottom: 32px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  animation: fadeInUp 0.6s 0.4s ease-out backwards;
  position: relative;
  z-index: 1;
}

.popup-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 32px;
  animation: fadeInUp 0.6s 0.5s ease-out backwards;
  position: relative;
  z-index: 1;
}

.stat-item {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-4px);
  }
}

.stat-icon {
  font-size: 32px;
  animation: iconBounce 2s ease-in-out infinite;
}

.stat-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: white;
}

.stat-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.popup-button {
  width: 100%;
  padding: 18px 32px;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  animation: fadeInUp 0.6s 0.6s ease-out backwards;
  position: relative;
  z-index: 1;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    transition: transform 0.3s;
  }

  &:hover svg {
    transform: translateX(4px);
  }
}

// Animations
@keyframes popupSlideUp {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.4;
  }
  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}

@keyframes iconFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes iconBounce {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@keyframes bgRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

// Transitions
.popup-fade-enter-active,
.popup-fade-leave-active {
  transition: opacity 0.3s ease-out;
}

.popup-fade-enter-from,
.popup-fade-leave-to {
  opacity: 0;
}

// Mobile responsiveness
@media (max-width: 768px) {
  .welcome-back-popup {
    padding: 32px 24px;
  }

  .popup-title {
    font-size: 26px;
  }

  .popup-message {
    font-size: 16px;
  }

  .fitness-icon {
    width: 100px;
    height: 100px;
  }

  .icon-svg {
    width: 60px;
    height: 60px;
  }

  .popup-stats {
    grid-template-columns: 1fr;
  }

  .stat-item {
    justify-content: center;
  }

  .popup-button {
    font-size: 16px;
    padding: 16px 28px;
  }
}
</style>
