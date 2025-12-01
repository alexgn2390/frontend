<template>
  <div class="workout-ready-overlay">
    <div class="workout-ready">
      <div class="success-icon">
        <div class="success-circle">
          <svg class="checkmark" width="80" height="80" viewBox="0 0 80 80">
            <circle class="checkmark-circle" cx="40" cy="40" r="36" fill="none" stroke="#10B981" stroke-width="4"/>
            <path class="checkmark-check" d="M20 40 L35 55 L60 25" fill="none" stroke="#10B981"
                  stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>

      <h2 class="ready-title">Done!</h2>
      <p class="ready-message">
        Today you have a short warm-up to start gently.
      </p>

      <div class="workout-preview">
        <div class="preview-item">
          <div class="preview-icon">🔥</div>
          <div class="preview-content">
            <h4>Warm-up Session</h4>
            <p>Light exercises to prepare your body</p>
          </div>
        </div>
        <div class="preview-item">
          <div class="preview-icon">⏱️</div>
          <div class="preview-content">
            <h4>~15 minutes</h4>
            <p>Perfect for your first day</p>
          </div>
        </div>
        <div class="preview-item">
          <div class="preview-icon">📊</div>
          <div class="preview-content">
            <h4>Beginner Friendly</h4>
            <p>Gentle start to build consistency</p>
          </div>
        </div>
      </div>

      <button @click="goToMainScreen" class="ready-button">
        Go to Main Screen
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WorkoutReadyScreen',
  methods: {
    goToMainScreen() {
      this.$emit('go-to-main');
    }
  },
  mounted() {
    // Анимация появления галочки
    setTimeout(() => {
      const checkmark = document.querySelector('.checkmark-check');
      if (checkmark) {
        checkmark.style.strokeDashoffset = '0';
      }
    }, 300);
  }
}
</script>

<style lang="scss" scoped>
.workout-ready-overlay {
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

.workout-ready {
  background: white;
  border-radius: 24px;
  padding: 48px;
  max-width: 550px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.5s ease-out;
}

.success-icon {
  margin-bottom: 32px;
  display: flex;
  justify-content: center;
}

.success-circle {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);
  animation: scaleIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.checkmark {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.checkmark-circle {
  stroke: white;
  animation: drawCircle 0.6s ease-out forwards;
  stroke-dasharray: 226;
  stroke-dashoffset: 226;
}

.checkmark-check {
  stroke: white;
  stroke-dasharray: 70;
  stroke-dashoffset: 70;
  animation: drawCheck 0.4s 0.6s ease-out forwards;
}

.ready-title {
  font-size: 36px;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 16px;
  animation: fadeInUp 0.6s 0.4s ease-out backwards;
}

.ready-message {
  font-size: 18px;
  color: #4A5568;
  margin-bottom: 40px;
  line-height: 1.6;
  animation: fadeInUp 0.6s 0.5s ease-out backwards;
}

.workout-preview {
  background: #F7FAFC;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 32px;
  text-align: left;
  animation: fadeInUp 0.6s 0.6s ease-out backwards;
}

.preview-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid #E2E8F0;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  &:first-child {
    padding-top: 0;
  }
}

.preview-icon {
  width: 48px;
  height: 48px;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.preview-content {
  flex: 1;

  h4 {
    font-size: 16px;
    font-weight: 600;
    color: #2D3748;
    margin: 0 0 4px 0;
  }

  p {
    font-size: 14px;
    color: #718096;
    margin: 0;
  }
}

.ready-button {
  width: 100%;
  padding: 16px 32px;
  background: linear-gradient(135deg, #6366F1 0%, #818CF8 100%);
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  animation: fadeInUp 0.6s 0.7s ease-out backwards;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(99, 102, 241, 0.5);
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

@keyframes scaleIn {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes drawCircle {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes drawCheck {
  to {
    stroke-dashoffset: 0;
  }
}

@media (max-width: 768px) {
  .workout-ready {
    padding: 32px 24px;
  }

  .ready-title {
    font-size: 28px;
  }

  .ready-message {
    font-size: 16px;
  }

  .ready-button {
    font-size: 16px;
    padding: 14px 28px;
  }

  .preview-item {
    flex-direction: row;
    align-items: flex-start;
  }

  .preview-icon {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
}
</style>
