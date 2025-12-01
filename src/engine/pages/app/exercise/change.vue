<template>
  <div class="section">
    <Header title="" back_link="/app" />

    <div class="ExChange">
      <div v-if="state == 0" class="Content">
        <h1>Why are you requesting a new exercise? Please select one of the reasons below:</h1>
        <ul>
          <li @click="SetSelected(1)" :class="{'active': selected == 1}">I Don't Like it</li>
          <li @click="ReportPain" :class="{'active': selected == 2}">Report Pain/Soreness</li>
          <li @click="SetSelected(3)" :class="{'active': selected == 3}">Too Hard</li>
          <li @click="SetSelected(4)" :class="{'active': selected == 4}">No Equipment Available</li>
        </ul>
      </div>
      
      <div v-else-if="state == 1" class="Content">
        <h1>Health Advisory Notice</h1>
        <text>We've noted your feedback about experiencing pain with the current exercise. Your health and well-being are our top priorities.
        <br><br>We strongly recommend consulting with your healthcare provider to discuss any pain or discomfort you experience during exercise.</text>

        <button type="button" class="button button_theme_default button_size_md button_is_wide" @click="ok">
          Ok
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/engine/components/app/Header.vue";

export default {
  name: 'AppExerciseChangePage',
  data() {
    return {
      state: 0,
      selected: 0,
      exercise_id: 0,
    }
  },
  created(){
    this.exercise_id = this.$route.query.id;

    if(!this.exercise_id){
      this.$toast.error('Wrong data exercise id');
      this.$router.push('/app/session');
      return;
    }
  },
  methods: {
    Back(){
      if(this.state <= 0) return this.state = 0;
      this.state = this.state - 1;
    },
    SetSelected(i){
      this.selected = i;
      this.SendReport();
    },
    ReportPain(){
      this.selected = 2;
      this.state = 1;
    },
    ok(){
      this.SendReport();
    },
    async SendReport(){
      const r = await this.$Api.query('exercise.toTrash', {}, {
        exercise_id: Number(this.exercise_id),
        reason: this.selected
      });

      if(r.status != 'success') return this.$toast.error('Error sending data to server');
      this.$router.push('/app/session');
      //this.$router.push(`/app/session?id=${this.session_id}`);
    },
  },
  components: {
    Header
  }
}
</script>
