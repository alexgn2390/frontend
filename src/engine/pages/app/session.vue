<template>
  <Header :title="getSessionTitle" back_link="/app" />
  <div class="session session_type_one section_theme_lightblue">
    <div class="container session__content">
      <div class="HomeSession">
        <template v-if="!is_loading">
          <img :src="`/engine/assets/img/sessions/${(info.number % 11) + 1}.png`" class="HomeSession_image" />
          <div class="HomeSession_background"></div>

          <div class="HomeSession_content">
            <div class="Info">
              <AppText v-if="type == 'home'" tag="h2" classes="Title" :text="$t('app.session.quick_home')" />
              <AppText v-else-if="type == 'quick'" tag="h2" classes="Title" :text="$t('app.session.quick_home')" />
              <AppText v-else-if="type == 'stretching'" tag="h2" classes="Title" :text="$t('app.session.stretching')" />
              <AppText v-else tag="h2" classes="Title" :text="`${$t('app.session.title')} ${info.number}`" />
              <p class="Text">{{ $t('app.session.minutes', [getMinutes]) }}</p>
            </div>
          </div>
        </template>
        <div v-else class="HomeSession_image seload"></div>
      </div>

      <div v-if="!is_loading" class="session__wrapper">
        <ul class="list session__list" v-if="type == 'home'">
          <SessionCard v-for="(card, i) in exercise" :id="card.id" :exercise_id="card.id" :data="card" :title="card.name" :isDone="card.done" :sessionType="type" :key="i" />
        </ul>
        <ul class="list session__list" v-else-if="type == 'stretching'">
          <SessionCard v-for="(card, i) in exercise" :id="card.id" :exercise_id="card.id" :data="card" :title="card.name" :isDone="card.done" :sessionType="type" :key="i" @updateSchedules="getSchedules" />
        </ul>
        <ul class="list session__list" v-else>
          <SessionCard v-for="(card, i) in exercise" :id="card.id" :exercise_id="card.id" :data="card" :title="card.name" :isDone="card.done" :sessionType="type" :key="i" @updateSchedules="getSchedules" />
        </ul>
        <div v-if="!$state.temp.session_is_done" class="session__group">
          <Button :button-text="$t('app.session.session_done')" class="button button_theme_default button_size_md button_is_wide" @click="doneSession" :class="{ 'load': is_loading }" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/engine/components/app/Header.vue";
import AppText from "@/engine/components/app/AppText.vue";
import SessionCard from "@/engine/components/app/SessionCard.vue";
import Button from "@/engine/components/app/Button.vue";

export default {
  name: 'AppIDPage',
  data() {
    return {
      is_loading: true,
      interval: null,
      gen_amount: 0,
      types: ['home', 'quick', 'stretching', 'warmup'],
      exercise: [],
      info: {
        number: 0,
        muscle_group_names: []
      },
      isAISession: false,
      aiMessage: ''
    }
  },
  methods: {
    async getSessionNumber(){
      const r = await this.$Api.query('workout.maxSession', {}, { current_date: this.getCurrentDate });
      if(r.status != 'success') return;
      this.info = r.response;
    },
    async getSchedules(){
      try {
        let response;

        // Используем новые эндпоинты для секций
        if (this.type === 'home') {
          response = await this.$Api.query('workout.home', {}, { current_date: this.getCurrentDate });
          if (response && response.status === 'success') {
            this.exercise = response.exercises;
          }
        } else if (this.type === 'warmup') {
          // Warmup секция
          response = await this.$Api.query('workout.warmupSection', { current_date: this.getCurrentDate }, {});
          if (response && response.status === 'success') {
            this.exercise = response.exercises;
          }
        } else if (this.type === 'stretching') {
          // Stretching секция
          response = await this.$Api.query('workout.stretchingSection', { current_date: this.getCurrentDate }, {});
          if (response && response.status === 'success') {
            this.exercise = response.exercises;
          }
        } else if (this.type === 'quick') {
          // Quick session - несколько упражнений из full session
          response = await this.$Api.query('workout.fullSessionSection', { current_date: this.getCurrentDate }, {});
          if (response && response.status === 'success') {
            this.exercise = response.exercises.slice(0, 4); // Только 4 упражнения
          }
        } else {
          // Full session
          response = await this.$Api.query('workout.fullSessionSection', { current_date: this.getCurrentDate }, {});
          if (response && response.status === 'success') {
            this.exercise = response.exercises;
          }
        }

        // Проверяем, есть ли упражнения и не в процессе ли генерации
        if ((!this.exercise || this.exercise.length === 0) && this.gen_amount === 0) {
          return this.generateSchedules();
        }

        this.$state.temp.session_is_done = false;
      } catch (error) {
        console.error('Failed to get schedules:', error);
        // При любой ошибке, если упражнений нет и еще не генерировали - попробовать сгенерировать один раз
        if (this.gen_amount === 0 && (!this.exercise || this.exercise.length === 0)) {
          return this.generateSchedules();
        }
      }

      this.is_loading = false;
    },

    async generateSchedules(){
      // Предотвращаем множественные вызовы
      if(this.gen_amount >= 1){
        console.log('Workout generation already in progress, skipping...');
        return;
      }

      this.gen_amount++;
      this.is_loading = true;

      try {
        // Используем unified эндпоинт для генерации всех секций одновременно
        const r = await this.$Api.query('workout.generateUnified', {}, {
          current_date: this.getCurrentDate
        });

        if (r && r.status === 'success') {
          // Показываем AI сообщение, если есть
          const aiMessage = r.response?.ai_message || 'AI generated your personalized workout!';
          this.$toast.success(aiMessage);
          // Сбрасываем счетчик и перезагружаем упражнения
          this.gen_amount = 0;
          await this.getSchedules();
        } else {
          const errorMsg = r.error || 'Failed to generate workout';
          this.$toast.error(errorMsg);
          this.gen_amount = 0;
          this.is_loading = false;
        }
      } catch (error) {
        console.error('Generate schedules error:', error);
        const errorMsg = error.response?.data?.error || 'Failed to generate workout';
        this.$toast.error(errorMsg);
        this.gen_amount = 0;
        this.is_loading = false;
      }
    },

    async getAIWorkout() {
      this.is_loading = true;
      try {
        const r = await this.$Api.query('workout.generateAI', {}, { 
          current_date: this.getCurrentDate 
        });
        
        if (r.status === 'success') {
          this.exercise = r.response.exercises.map(ex => ({
            exercise_id: ex.id,
            exercise_name: ex.name,
            sets: ex.sets,
            reps: ex.reps,
            duration: ex.duration,
            instruction: ex.instruction,
            done: false
          }));
          
          this.aiMessage = r.response.ai_message;
          this.info.muscle_group_names = [r.response.muscle_group];
          this.$state.temp.session_is_done = false;
          
          // Show AI message as toast
          if (this.aiMessage) {
            this.$toast.success(this.aiMessage);
          }
        } else {
          this.$toast.error('Failed to generate AI workout');
          // Fallback to regular workout generation
          await this.getSchedules();
        }
      } catch (error) {
        console.error('AI Workout error:', error);
        // Fallback to regular workout
        await this.getSchedules();
      } finally {
        this.is_loading = false;
      }
    },

    async doneSession(){
      if(this.type == 'stretching') return this.$router.push({ path: '/app' });

      this.is_loading = true;
      const r = await this.$Api.query('workout.session', {}, {});

      if(r.status == 'success'){
        //this.$toast.success(this.$t('app.session.complete'));

        setTimeout(() => {
          this.is_loading = false;
          this.$router.push({ path: '/app' });
        }, 200);
      } else this.$toast.error(this.$t('app.session.errors.session'));
    },
  },
  computed: {
    type(){
      return this.$route.query.type;
    },
    getSessionTitle(){
      if(this.type == 'home') return 'Home Session';
      if(this.type == 'quick') return 'Quick Session';
      if(this.type == 'warmup') return 'Warm-up';
      if(this.type == 'stretching') return 'Stretching Session';
      return 'Full Session';
    },
    getSessionGenerate(){
      if(this.type == 'home') return 'generateHome';
      if(this.type == 'quick') return 'generateQuick';
      if(this.type == 'stretching') return 'generateStretching';
      return 'generate';
    },
    getSession(){
      if(this.type == 'home') return 'getHome';
      if(this.type == 'quick') return 'getQuick';
      if(this.type == 'stretching') return 'getStretching';
      return 'schedule';
    },
    getMinutes(){
      if(this.type == 'home') return 15;
      if(this.type == 'quick') return 15;
      if(this.type == 'stretching') return 6;
      return 50;
    },
    getCurrentDate(){
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    }
  },
  async mounted(){
    if(this.type && this.types.indexOf(this.type) === -1) return this.$router.push('/app');
    
    // Check if this is an AI-generated session
    if (this.$route.query.ai === 'true') {
      this.isAISession = true;
      await this.getAIWorkout();
    } else {
      await this.getSchedules();
    }
    
    this.getSessionNumber();
  },
  beforeUnmount(){
    clearInterval(this.interval);
  },
  components: {
    Header,
    SessionCard,
    Button,
    AppText
  }
}
</script>
