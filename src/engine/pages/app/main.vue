<template>
  <div v-if="$User.isAuthed" class="home">
    <!-- Welcome Back Popup -->
    <WelcomeBackPopup
      v-if="showWelcomeBack"
      :user-name="$user.name"
      :stats="userStats"
      @close="handleWelcomeBackClose"
    />

    <div class="container home__container">
      <transition name="slide-fade-right" mode="out-in">
        <AppText v-if="$user.name" tag="h2" :text="`Hi, ${$user.name ? $user.name : 'user'}`" classes="text_theme_dark text_size_xl text_weight_semibold home__title" />
        <AppText v-else tag="h2" text="Starting App..." classes="text_theme_dark text_size_xl text_weight_semibold home__title" />
      </transition>

      <transition name="slide-fade-top" mode="out-in" appear>
        <div class="calendar home__calendar">
          <p v-for="(day, idx) in week" :key="idx" class="calendar__item" :class="{ calendar__item_is_active: day.date == new Date().getDate(), calendar__item_is_inactive: day.date != new Date().getDate() }">
            <span>{{ day.day }}</span>
            <span>{{ day.date }}</span>
          </p>
        </div>
      </transition>

      <div class="HomeSessions">
        <template v-for="(r, i) in sessions" :key="`card_${i}`">
          <transition name="slide-fade-right" mode="out-in" appear>
            <div v-if="!loading.session[i]" class="HomeSession" @click="r.action">
              <img :src="r.image" class="HomeSession_image" />
              <div class="HomeSession_background"></div>

              <div class="HomeSession_content">
                <div class="Info">
                  <AppText tag="h2" classes="Title" :text="r.title" />
                  <text>{{ r.text }}</text>
                </div>
                <div class="Footer">
                  <text v-html="r.footer_text"></text>
                  <RouterLink v-if="r.button" :to="r.button_link" class="button">
                    {{ r.button }}
                  </RouterLink>
                </div>
              </div>
            </div>
            <div v-else class="HomeSession">
              <div class="HomeSession_image seload"></div>
            </div>
          </transition>
        </template>
      </div>

      <div class="HomeCards">
        <template v-for="(r, i) in cards" :key="`card_${i}`">
          <transition name="slide-fade-left" mode="out-in" appear>
            <div v-if="!loading.card[i]" @click="r.action" class="Card" :class="r.tag">
              <div class="Info">
                <AppText tag="h2" classes="Title" :text="r.title" />
                <p class="Text">{{ r.text }} <span>{{ r.span }}</span></p>
              </div>
              <BaseIcon width="56" height="56" view-box="0 0 56 56" class="Icon">
                <IconPlay />
              </BaseIcon>
            </div>
          </transition>
          <div v-if="loading.card[i]" class="Card seload"></div>
        </template>

        <!--transition name="slide-fade-bottom" mode="out-in" appear>
          <div class="home__logo_wrap">
            <img v-if="!loading.session[2]" src="/engine/assets/img/app/logo.png" srcset="/engine/assets/img/app/logo@2x.png 2x, /engine/assets/img/app/logo@3x.png 3x" class="home__logo" />
          </div>
        </transition-->
      </div>
    </div>
  </div>
  <div v-else class="home">
    <div class="container home__container">
      <AppText tag="h2" text="Starting App..." classes="text_theme_dark text_size_xl text_weight_semibold home__title" />
    </div>
  </div>
</template>

<script>
import AppText from "@/engine/components/app/AppText.vue";
import BaseIcon from "@/engine/components/app/BaseIcon.vue";
import IconPlay from "@/engine/components/app/icons/IconPlay.vue";
import WelcomeBackPopup from "@/engine/components/app/WelcomeBackPopup.vue";
import Storage from "@/engine/modules/Storage.js";

export default {
  name: 'AppIndexPage',
  data() {
    return {
      showWelcomeBack: false,
      userStats: {
        streak: 0,
        workouts: 0
      },
      loading: {
        session: [],
        card: [],
        info: {
          number: 0,
          muscle_group_names: []
        }
      },
      sessions: [
        {
          title: 'Session Loading', text: '',
          image: '/engine/assets/img/sessions/0.png',
          //image: `/engine/assets/img/sessions/${this.$Func.RandByRange(1, 11)}.png`,
          action: () => { /*this.$router.push('/app/session')*/ },
          footer_text: '',
          button: '',
          button_link: '/app/session'
        }
      ],
      cards: [
        // { title: 'AI Coach', text: 'Personalized', span: '24/7 Support', action: () => { this.$router.push('/app/ai-coach') }, tag: 'ai_coach' },
        { title: 'Warm up', text: '5 min', span: '', action: () => {
          // Переход на warmup секцию
          this.$router.push('/app/session?type=warmup');
        }, tag: 'warm_up' },
        { title: 'Full session', text: '20-50 min', span: 'AI-Powered', action: () => { this.$router.push('/app/session') }, tag: 'full_session' },
        { title: 'Stretching', text: '5 min', span: '', action: () => { this.$router.push('/app/session?type=stretching') }, tag: 'stretching' },
      ]
    }
  },
  methods: {
    async checkWelcomeBack() {
      // Проверяем если пользователь возвращается
      const lastVisit = Storage.get('last_visit', true);
      const onboardingCompleted = this.$User.hasCompletedOnboarding();

      if (lastVisit && onboardingCompleted && this.$user.name) {
        // Показываем welcome back только если прошло больше 1 часа
        const lastVisitTime = new Date(lastVisit);
        const now = new Date();
        const hoursPassed = (now - lastVisitTime) / (1000 * 60 * 60);

        if (hoursPassed >= 1) {
          // Загружаем статистику пользователя
          try {
            const stats = await this.$Api.query('ai/insights', {}, {});
            if (stats.status === 'success' && stats.insights) {
              this.userStats = {
                streak: stats.insights.streak_days || 0,
                workouts: stats.insights.completed_workouts || 0
              };
            }
          } catch (error) {
            console.error('Failed to load user stats:', error);
          }

          this.showWelcomeBack = true;
        }
      }

      // Сохраняем текущее время визита
      Storage.set('last_visit', new Date().toISOString(), true);
    },

    handleWelcomeBackClose() {
      this.showWelcomeBack = false;
    },

    async getSessionNumber(){
      const r = await this.$Api.query(`workout.maxSession`, {}, { current_date: this.getCurrentDate });
      if(r.status != 'success') return this.$toast.error('Failed to get the maximum number of sessions');
      this.info = r.response;

      if(this.info.number > 0) {
        this.sessions[0].title = `Session #${this.info.number}`;
          this.info.muscle_group_names.forEach(r => {
          let img_id = this.info.number % 11;
          this.sessions[0].image = `/engine/assets/img/sessions/${img_id + 1}.png`;
          this.sessions[0].footer_text = `${this.sessions[0].footer_text}<br>${r}`;
        });
      } else {
        this.sessions[0].title = 'You have no training';
        this.sessions[0].text = 'Start doing it right now!';
        this.sessions[0].button = 'Start training';
      }
    },
    getWeekDays(locale){
      const currentDate = new Date();
      const weekDays = [];

      for(let i = 0; i < 7; i++){
        weekDays.push({
          date: currentDate.getDate(),
          day: currentDate.toLocaleDateString(locale, { weekday: "short" }),
        });

        currentDate.setDate(currentDate.getDate() + 1);
      }

      return weekDays;
    },
  },
  computed: {
    week(){
      return this.getWeekDays("en-US");
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
    // Проверяем welcome back
    await this.checkWelcomeBack();

    this.getSessionNumber();

    this.sessions.forEach((r, i) => {
      this.loading.session[i] = true;

      setTimeout(() => {
        this.loading.session[i] = false;
      }, 650 + (50 * i));
    });

    this.cards.forEach((r, i) => {
      this.loading.card[i] = true;

      setTimeout(() => {
        this.loading.card[i] = false;
      }, 1100 + (100 * i));
    });
  },
  components: {
    AppText,
    BaseIcon,
    IconPlay,
    WelcomeBackPopup,
  }
}
</script>
