<template>
  <div class="ai-coach">
    <div class="ai-coach__header">
      <div class="ai-coach__avatar">
        <div class="ai-coach__avatar-icon">
          <!-- <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="currentColor"/>
          </svg> -->
          <img
            src="/engine/assets/img/nfitAI_logo_138.svg"
            class="nav__icon"
            width="60"
            height="60"
          />

        </div>
        <div class="ai-coach__status">
          <span class="ai-coach__name">nAI</span>
          <span class="ai-coach__status-text" :class="{ 'typing': isTyping }">
            {{ isTyping ? 'typing...' : 'online' }}
          </span>
        </div>
      </div>
      <button @click="$emit('close')" class="ai-coach__close">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <div class="ai-coach__messages" ref="messagesContainer">
      <div v-if="messages.length === 0" class="ai-coach__welcome">
        <div class="ai-coach__welcome-icon">🏋️‍♂️</div>
        <h3>Welcome to Your Personal nAI Coach!</h3>
        <p>I'm here to help you achieve your fitness goals with personalized workouts and support 24/7.</p>
        <div class="ai-coach__quick-actions">
          <button @click="sendQuickMessage('Start my onboarding')" class="ai-coach__quick-btn">
            Get Started
          </button>
          <button @click="sendQuickMessage('Generate today workout')" class="ai-coach__quick-btn">
            Today's Workout
          </button>
          <button @click="sendQuickMessage('How are you feeling today?')" class="ai-coach__quick-btn">
            Check-in
          </button>
        </div>
      </div>

      <div v-for="(message, index) in messages" :key="index" 
           :class="['ai-coach__message', `ai-coach__message--${message.role}`]">
        <div class="ai-coach__message-avatar" v-if="message.role === 'assistant'">
          <!-- <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="#6366F1"/>
          </svg> -->
          <img
            src="/engine/assets/img/nfitAI.svg"
            class="nav__icon"
            width="30"
            height="30"
          />
        </div>
        <div class="ai-coach__message-content">
          <div class="ai-coach__message-text" v-html="formatMessage(message.content)"></div>
          <div class="ai-coach__message-time">{{ formatTime(message.timestamp) }}</div>
        </div>
      </div>

      <div v-if="isTyping" class="ai-coach__message ai-coach__message--assistant">
        <div class="ai-coach__message-avatar">
          <img
            src="/engine/assets/img/nfitAI.svg"
            class="nav__icon"
            width="30"
            height="30"
          />
          <!-- <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="#6366F1"/>
          </svg> -->
        </div>
        <div class="ai-coach__message-content">
          <div class="ai-coach__typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>

    <div class="ai-coach__input-area">
      <div v-if="quickReplies.length > 0" class="ai-coach__quick-replies">
        <button v-for="(reply, index) in quickReplies" :key="index"
                @click="handleQuickReply(reply)"
                class="ai-coach__quick-reply">
          {{ reply }}
        </button>
      </div>

      <div v-if="currentState" class="ai-coach__state-indicator">
        <div class="ai-coach__state-item">
          <span>Energy:</span>
          <div class="ai-coach__state-bar">
            <div class="ai-coach__state-fill" :style="{width: `${currentState.energy * 10}%`}"></div>
          </div>
        </div>
        <div class="ai-coach__state-item">
          <span>Stress:</span>
          <div class="ai-coach__state-bar ai-coach__state-bar--stress">
            <div class="ai-coach__state-fill" :style="{width: `${currentState.stress * 10}%`}"></div>
          </div>
        </div>
      </div>

      <form @submit.prevent="sendMessage" class="ai-coach__form">
        <input
          v-model="inputMessage"
          type="text"
          placeholder="Type your message..."
          class="ai-coach__input"
          :disabled="isLoading"
          maxlength="200"
        />
        <button type="submit" class="ai-coach__send" :disabled="!inputMessage.trim() || isLoading">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M2 10l15-8-4 8 4 8-15-8zm13 0H7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </form>
      <div v-if="onboardingStep" class="ai-coach__char-count">
        {{ inputMessage.length }}/200
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AICoach',
  data() {
    return {
      messages: [],
      inputMessage: '',
      isLoading: false,
      isTyping: false,
      sessionId: null,
      quickReplies: [],
      currentState: null,
      onboardingStep: null,
      onboardingData: {}
    }
  },
  methods: {
    async sendMessage() {
      if (this.isLoading) return;

      // Check for empty input during onboarding
      if (this.onboardingStep && !this.inputMessage.trim()) {
        this.showError('Please choose one of the options or fill in the input field.');
        return;
      }

      if (!this.inputMessage.trim()) return;

      const userMessage = this.inputMessage;
      this.inputMessage = '';

      // Add user message to chat
      this.messages.push({
        role: 'user',
        content: userMessage,
        timestamp: new Date()
      });

      this.scrollToBottom();
      this.isLoading = true;
      this.isTyping = true;
      this.quickReplies = [];

      try {
        // Check if user is authenticated
        if (!this.$User.isAuthed()) {
          this.showError('Please login to use nAI Coach');
          return;
        }

        let response;
        if (this.onboardingStep) {
          // Onboarding flow
          response = await this.$Api.query('ai/onboarding', {}, {
            step: this.onboardingStep,
            response: userMessage,
            data: this.parseOnboardingData(userMessage)
          });

          // Check for validation failure
          if (response.validation_failed) {
            this.messages.push({
              role: 'assistant',
              content: response.response,
              timestamp: new Date()
            });

            // Re-show quick replies for this step + Skip button
            this.updateOnboardingReplies();
            if (response.show_skip) {
              this.quickReplies = [...this.quickReplies, 'Skip'];
            }

            this.isLoading = false;
            this.isTyping = false;
            this.scrollToBottom();
            return;
          }

          // Check if onboarding is complete
          if (response.completed) {
            await this.handleOnboardingComplete(response);
            return;
          }

          // Progress to next step
          this.progressOnboardingStep();
        } else {
          // Regular chat
          response = await this.$Api.query('ai/chat', {}, {
            message: userMessage,
            session_id: this.sessionId
          });
        }

        if (response.response) {
          this.sessionId = response.session_id;

          // Add AI response
          this.messages.push({
            role: 'assistant',
            content: response.response,
            timestamp: new Date()
          });

          // Update quick replies
          if (this.onboardingStep) {
            this.updateOnboardingReplies();
          } else {
            this.updateQuickReplies(userMessage, response.response);
          }
        } else {
          this.showError('Failed to get response from nAI coach');
        }
      } catch (error) {
        console.error('Chat error:', error);
        this.showError('Connection error. Please try again.');
      } finally {
        this.isLoading = false;
        this.isTyping = false;
        this.scrollToBottom();
      }
    },

    sendQuickMessage(message) {
      this.inputMessage = message;
      this.sendMessage();
    },

    updateQuickReplies(userMessage, aiResponse) {
      // Context-based quick replies
      this.quickReplies = [];

      if (this.onboardingStep) {
        this.updateOnboardingReplies();
        return;
      }

      // General quick replies based on conversation context
      if (aiResponse.toLowerCase().includes('workout')) {
        this.quickReplies = [
          "Start workout",
          "Show alternatives",
          "I'm tired today"
        ];
      } else if (aiResponse.toLowerCase().includes('how are you')) {
        this.quickReplies = [
          "Feeling great!",
          "A bit tired",
          "Stressed",
          "Ready to workout!"
        ];
      } else if (aiResponse.toLowerCase().includes('goal')) {
        this.quickReplies = [
          "Weight loss",
          "Build muscle",
          "Get healthier",
          "Increase energy"
        ];
      }
    },

    async handleQuickReply(reply) {
      if (reply === "Start workout") {
        // Переход на страницу тренировки
        this.$emit('workout-started');
        this.$router.push('/app/session');
      } else if (reply === "Regenerate workout") {
        await this.generateWorkout();
      } else if (reply === "I'm tired today") {
        // Обновляем состояние пользователя
        await this.updateUserState(3, 7); // Low energy, high stress
        this.inputMessage = "I'm feeling tired today, can you adjust my workout?";
        await this.sendMessage();
      } else {
        // Обычный quick reply
        this.sendQuickMessage(reply);
      }
    },

    updateOnboardingReplies() {
      switch(this.onboardingStep) {
        case 'start':
        case 'name':
          this.quickReplies = [];
          break;
        case 'goals':
          this.quickReplies = [
            "Stay in shape",
            "Lose weight",
            "Increase energy",
            "Reduce stress",
            "Start training from scratch",
            "Improve sleep"
          ];
          break;
        case 'activity':
          this.quickReplies = [
            "I'm a beginner",
            "Sometimes I train",
            "Generally active",
            "Want to start from scratch"
          ];
          break;
        case 'health':
          this.quickReplies = [
            "Fatigue / stress",
            "Back pain",
            "Sedentary work",
            "Joint problems",
            "Want gentle workouts",
            "Everything is fine"
          ];
          break;
        case 'devices':
          this.quickReplies = [
            "Connect devices",
            "Skip for now"
          ];
          break;
        case 'complete':
          this.quickReplies = [];
          break;
      }
    },

    async startOnboarding() {
      // Make sure user is authenticated
      if (!this.$User.isAuthed()) {
        await this.$User.getMyInform();
      }

      this.onboardingStep = 'start';
      this.onboardingData = {};
      this.isLoading = true;
      this.isTyping = true;

      try {
        const response = await this.$Api.query('ai/onboarding', {}, {
          step: 'start',
          response: 'Start onboarding'
        });

        if (response.response) {
          this.sessionId = response.session_id;
          this.messages.push({
            role: 'assistant',
            content: response.response,
            timestamp: new Date()
          });
          this.onboardingStep = 'name';
          this.updateOnboardingReplies();
        }
      } catch (error) {
        console.error('Onboarding error:', error);
        this.showError('Failed to start onboarding');
      } finally {
        this.isLoading = false;
        this.isTyping = false;
        this.scrollToBottom();
      }
    },

    parseOnboardingData(userMessage) {
      // Parse data from user response based on step
      const data = {};

      if (!this.onboardingData) {
        this.onboardingData = {};
      }

      switch(this.onboardingStep) {
        case 'name':
          data.preferred_name = userMessage;
          this.onboardingData.preferred_name = userMessage;
          break;
        case 'goals':
          data.goals = userMessage;
          this.onboardingData.goals = userMessage;
          break;
        case 'activity':
          data.activity_level = userMessage;
          this.onboardingData.activity_level = userMessage;
          break;
        case 'health':
          data.health_concerns = userMessage;
          this.onboardingData.health_concerns = userMessage;
          break;
        case 'devices':
          data.devices = userMessage;
          this.onboardingData.devices = userMessage;
          // Return all collected data
          return this.onboardingData;
      }

      return data;
    },

    progressOnboardingStep() {
      // Progress to next onboarding step
      const steps = ['start', 'name', 'goals', 'activity', 'health', 'devices', 'complete'];
      const currentIndex = steps.indexOf(this.onboardingStep);

      if (currentIndex >= 0 && currentIndex < steps.length - 1) {
        this.onboardingStep = steps[currentIndex + 1];
        this.updateOnboardingReplies();
      }
    },

    async handleOnboardingComplete(response) {
      // Добавляем финальный ответ AI
      this.messages.push({
        role: 'assistant',
        content: response.response,
        timestamp: new Date()
      });

      this.scrollToBottom();

      // Сбрасываем шаг онбординга
      this.onboardingStep = null;

      // Показываем сообщение об успехе
      if (this.$toast) {
        this.$toast.success('Onboarding completed! Your first workout is ready!');
      }

      // Ждём 1 секунду перед показом анимации генерации
      setTimeout(() => {
        // Emit событие завершения с флагом для показа анимации
        this.$emit('onboarding-complete', { showAnimation: true });
      }, 1000);
    },

    async generateWorkout() {
      // Make sure user is authenticated
      if (!this.$User.isAuthed()) {
        this.showError('Please login to generate workout');
        return;
      }

      this.isLoading = true;
      this.isTyping = true;

      this.messages.push({
        role: 'user',
        content: 'Generate my workout for today',
        timestamp: new Date()
      });

      try {
        // Используем новый unified эндпоинт
        const response = await this.$Api.query('workout.generateUnified', {}, {
          current_date: this.getCurrentDate()
        });

        if (response) {
          // AI вернул полную тренировку с тремя секциями
          const workoutMessage = `
            <div class="workout-plan">
              <h4>🎯 ${response.muscle_group} Workout</h4>
              <p class="ai-message">${response.ai_message}</p>

              <div class="workout-sections">
                <div class="workout-section">
                  <h5>🔥 Warm-up (${response.warmup.length} exercises)</h5>
                  ${response.warmup.map(ex => `
                    <div class="workout-exercise">
                      <strong>${ex.name}</strong>
                      <span>${ex.duration || '5 min'}</span>
                    </div>
                  `).join('')}
                </div>

                <div class="workout-section main">
                  <h5>💪 Main Session (${response.main_session.length} exercises)</h5>
                  ${response.main_session.map(ex => `
                    <div class="workout-exercise">
                      <strong>${ex.name}</strong>
                      <span>${ex.sets} sets × ${ex.reps} reps</span>
                    </div>
                  `).join('')}
                </div>

                <div class="workout-section">
                  <h5>🧘 Stretching (${response.stretching.length} exercises)</h5>
                  ${response.stretching.map(ex => `
                    <div class="workout-exercise">
                      <strong>${ex.name}</strong>
                      <span>${ex.duration || '5 min'}</span>
                    </div>
                  `).join('')}
                </div>
              </div>

              <p class="workout-duration">⏱️ Total duration: ~${response.duration} minutes</p>
              <p class="workout-difficulty">📊 Difficulty: ${response.difficulty}</p>
            </div>
          `;

          this.messages.push({
            role: 'assistant',
            content: workoutMessage,
            timestamp: new Date()
          });

          this.quickReplies = [
            "Start workout",
            "Regenerate workout",
            "I'm tired today"
          ];
        }
      } catch (error) {
        console.error('Workout generation error:', error);
        this.showError('Failed to generate workout. Please try again.');
      } finally {
        this.isLoading = false;
        this.isTyping = false;
        this.scrollToBottom();
      }
    },

    getCurrentDate() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}-${month}-${day}`;
    },

    async updateUserState(energy, stress) {
      this.currentState = { energy, stress };
      
      try {
        await this.$Api.query('ai/update-state', {}, {
          energy_level: energy,
          stress_level: stress,
          sleep_quality: 7,
          mood: energy > 5 ? 'happy' : 'tired',
          fatigue: 10 - energy
        });
      } catch (error) {
        console.error('State update error:', error);
      }
    },

    formatMessage(content) {
      // Convert markdown-like formatting to HTML
      return content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');
    },

    formatTime(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    },

    scrollToBottom() {
      this.$nextTick(() => {
        if (this.$refs.messagesContainer) {
          this.$refs.messagesContainer.scrollTop = this.$refs.messagesContainer.scrollHeight;
        }
      });
    },

    showError(message) {
      this.messages.push({
        role: 'assistant',
        content: `⚠️ ${message}`,
        timestamp: new Date()
      });
    }
  },
  async mounted() {
    // Make sure user data is loaded
    if (this.$User.isLogined() && !this.$User.isAuthed()) {
      await this.$User.getMyInform();
    }
    
    // Check if this is first time user
    if (this.$route.query.onboarding === 'true') {
      setTimeout(() => {
        this.startOnboarding();
      }, 1000); // Give time for auth to complete
    }
  }
}
</script>

<style lang="scss" scoped>
.ai-coach {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 600px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  // .ai-coach__avatar-icon{
  //   background: #FFFFFF;
  // }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  &__avatar {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__avatar-icon {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__status {
    display: flex;
    flex-direction: column;
  }

  &__name {
    font-weight: 600;
    font-size: 16px;
  }

  &__status-text {
    font-size: 12px;
    opacity: 0.9;

    &.typing {
      font-style: italic;
    }
  }

  &__close {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 4px;
    opacity: 0.8;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }
  }

  &__messages {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background: #f7f8fa;
  }

  &__welcome {
    text-align: center;
    padding: 40px 20px;

    h3 {
      margin: 16px 0 8px;
      font-size: 20px;
      color: #1a202c;
    }

    p {
      color: #718096;
      margin-bottom: 24px;
    }
  }

  &__welcome-icon {
    font-size: 48px;
  }

  &__quick-actions {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
  }

  &__quick-btn {
    padding: 10px 20px;
    background: #6366f1;
    color: white;
    border: none;
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background: #5558e3;
      transform: translateY(-2px);
    }
  }

  &__message {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
    animation: messageSlide 0.3s ease-out;

    &--user {
      flex-direction: row-reverse;

      .ai-coach__message-content {
        background: #6366f1;
        color: white;
        margin-left: auto;
      }

      .ai-coach__message-time {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    &--assistant {
      .ai-coach__message-content {
        background: white;
        color: #2d3748;
      }
    }
  }

  &__message-avatar {
    width: 32px;
    height: 32px;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  &__message-content {
    max-width: 70%;
    padding: 12px 16px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  &__message-text {
    font-size: 14px;
    line-height: 1.5;
  }

  &__message-time {
    font-size: 11px;
    color: #a0aec0;
    margin-top: 4px;
  }

  &__typing-indicator {
    display: flex;
    gap: 4px;
    padding: 8px 0;

    span {
      width: 8px;
      height: 8px;
      background: #cbd5e0;
      border-radius: 50%;
      animation: typing 1.4s infinite;

      &:nth-child(2) {
        animation-delay: 0.2s;
      }

      &:nth-child(3) {
        animation-delay: 0.4s;
      }
    }
  }

  &__input-area {
    padding: 16px;
    background: white;
    border-top: 1px solid #e2e8f0;
  }

  &__char-count {
    font-size: 11px;
    color: #a0aec0;
    text-align: right;
    margin-top: 4px;
  }

  &__quick-replies {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
    flex-wrap: wrap;
  }

  &__quick-reply {
    padding: 6px 12px;
    background: #f7fafc;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    font-size: 13px;
    color: #4a5568;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: #6366f1;
      color: white;
      border-color: #6366f1;
    }
  }

  &__state-indicator {
    display: flex;
    gap: 16px;
    margin-bottom: 12px;
    padding: 8px;
    background: #f7fafc;
    border-radius: 8px;
  }

  &__state-item {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8px;

    span {
      font-size: 12px;
      color: #718096;
      min-width: 50px;
    }
  }

  &__state-bar {
    flex: 1;
    height: 6px;
    background: #e2e8f0;
    border-radius: 3px;
    overflow: hidden;

    &--stress {
      .ai-coach__state-fill {
        background: #f56565;
      }
    }
  }

  &__state-fill {
    height: 100%;
    background: #48bb78;
    transition: width 0.3s;
  }

  &__form {
    display: flex;
    gap: 12px;
  }

  &__input {
    flex: 1;
    padding: 12px 16px;
    border: 1px solid #e2e8f0;
    border-radius: 24px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;

    &:focus {
      border-color: #6366f1;
    }

    &:disabled {
      background: #f7fafc;
      cursor: not-allowed;
    }
  }

  &__send {
    width: 44px;
    height: 44px;
    background: #6366f1;
    border: none;
    border-radius: 50%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;

    &:hover:not(:disabled) {
      background: #5558e3;
      transform: scale(1.05);
    }

    &:disabled {
      background: #cbd5e0;
      cursor: not-allowed;
    }
  }
}

// Animations
@keyframes messageSlide {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes typing {
  0%, 60%, 100% {
    opacity: 0.3;
    transform: translateY(0);
  }
  30% {
    opacity: 1;
    transform: translateY(-10px);
  }
}

// Workout plan styles
.workout-plan {
  h4 {
    margin: 0 0 12px;
    color: #2d3748;
    font-size: 18px;
    font-weight: 600;
  }

  .ai-message {
    margin: 8px 0 16px;
    padding: 12px;
    background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
    border-radius: 8px;
    color: #4a5568;
    font-style: italic;
  }

  p {
    margin: 8px 0;
    color: #4a5568;
  }
}

.workout-sections {
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.workout-section {
  padding: 12px;
  background: #f7fafc;
  border-radius: 8px;
  border-left: 3px solid #cbd5e0;

  &.main {
    border-left-color: #6366f1;
    background: #6366f108;
  }

  h5 {
    margin: 0 0 8px;
    font-size: 14px;
    font-weight: 600;
    color: #2d3748;
  }
}

.workout-exercises {
  margin: 12px 0;
  padding: 12px;
  background: #f7fafc;
  border-radius: 8px;
}

.workout-exercise {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid #e2e8f0;

  &:last-child {
    border-bottom: none;
  }

  strong {
    color: #2d3748;
    font-weight: 500;
    font-size: 13px;
  }

  span {
    color: #718096;
    font-size: 12px;
  }
}

.workout-duration, .workout-difficulty {
  margin: 8px 0;
  font-weight: 500;
  color: #6366f1;
  font-size: 14px;
}

// Mobile responsiveness
@media (max-width: 768px) {
  .ai-coach {
    max-height: 100vh;
    border-radius: 0;
  }

  .ai-coach__message-content {
    max-width: 85%;
  }

  .ai-coach__quick-actions {
    flex-direction: column;

    .ai-coach__quick-btn {
      width: 100%;
    }
  }
}
</style>
