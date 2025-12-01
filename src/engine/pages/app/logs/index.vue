<template>
  <div class="section">
    <Header v-if="!state" :title="$t('app.logs.title')" back_link="/app" />
    <Header v-else-if="state == 1" @bClick="Back" :title="$t('app.logs.stat')" img_icon="/engine/assets/img/app/logs/static.png" back_link="none" />

    <div class="AppLogs">
      <div v-if="state == 0" class="Content">
        <template v-for="(r, i) in data" :key="`log_${i}`">
          <div @click="OpenLog(i)" class="Card">
            <img class="icon" src="/engine/assets/img/app/logs/calendar.png" />
            <text>{{ r.date }}</text>
            <text>50 min</text>
            <img class="next" src="/engine/assets/img/app/logs/next.png" />
          </div>
        </template>
      </div>
      <div v-else-if="state == 1" class="Content">
        <div class="Card no_border">
          <img class="icon" src="/engine/assets/img/app/logs/calendar.png" />
          <text>{{ selected.date }}</text>
          <text class="end">{{ selected.min }}</text>
        </div>
        
        <div class="HomeSession">
          <img :src="selected.image" class="HomeSession_image" />
          <div class="HomeSession_background"></div>

          <div class="HomeSession_content">
            <div class="Info">
              <AppText tag="h2" classes="Title" :text="`Session #${selected.number}`" />
              <text>{{ selected.text }}</text>
            </div>
            <div class="Footer">
              <!--AppText tag="h2" classes="Title" text="Full session" /-->
              <text v-for="(r, i) in selected.muscle_groups" :key="`muscle_${i}`">{{ r }}</text>
            </div>
          </div>
        </div>
        
        <div class="Exercises">
          <template v-for="(r, i) in selected.exercises" :key="`log_e_${i}`">
            <div class="Exercise">
              <div class="Meta">
                <text>{{ r.exercise_name }}</text>
                <p>Details</p>
              </div>
              <img v-if="r.done" src="/engine/assets/img/app/logs/success.png" />
              <img v-else src="/engine/assets/img/app/logs/failed.png" />
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/engine/components/app/Header.vue";
import AppText from "@/engine/components/app/AppText.vue";

export default {
  name: 'AppLogsIndexPage',
  data() {
    return {
      state: 0,
      data: [],
      selected: {
        title: '',
        image: '/engine/assets/img/sessions/1.png',
        text: '',
        footer_text: '',
        number: 0,
        muscle_groups: [],
        exercises: []
      }
    }
  },
  created(){
    this.getData();
  },
  methods: {
    Back(){
      if(this.state <= 0) return this.state = 0;
      this.state = this.state - 1;
    },
    OpenLog(i){
      let r = this.data[i];
      if(!r) return;

      this.selected.date = r.date;
      this.selected.min = '50 min';
      this.selected.title = ' ';
      this.selected.text = ' ';
      this.selected.footer_text = '123';
      // Используем модуль для выбора изображения (1-11)
      this.selected.image = `/engine/assets/img/sessions/${(r.number % 11) + 1}.png`;
      this.selected.number = r.number;
      this.selected.muscle_groups = r.muscle_groups || [];
      this.selected.exercises = r.exercises || [];
      this.state = 1;
    },
    async getData(){
      const r = await this.$Api.query('workout.getLogs', {}, {});
      if(r.status != 'success') return this.$toast.error('Failed to get logs');
      this.data = r.response;
    }
  },
  components: {
    Header,
    AppText
  }
}
</script>
