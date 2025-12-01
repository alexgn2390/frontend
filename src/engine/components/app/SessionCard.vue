<template>
  <li @click="OpenInstruction" class="session__item">
    <AppText tag="h3" classes="text_theme_dark text_weight_medium session__item-title" :text="title" />
    <text v-if="data.sets && data.reps">{{ `Sets: ${data.sets}  Reps: ${data.reps}` }}</text>
    <div class="session__item-buttons-more">
      <button class="button button_theme_bordered button_size_sm session__item-button session__item-button_type_one" @click="OpenInstruction">
        Instructions
      </button>
      <div class="session__item-other_buttons">
        <button class="button button_theme_default button_size_sm session__item-button session__item-button_type_two"
          :class="{ 'session__item-button_is_done': isLocalDone }" :disabled="isLocalDone" @click="Done">
          <span class="session__item-text">Done</span>
          <BaseIcon width="18" height="13" viewBox="0 0 18 13" class="session__item-check">
            <IconCheck />
          </BaseIcon>
        </button>
        <!--button class="button button_theme_default session__item-button session__item-button_circle"
          :class="{ 'session__item-button_is_refresing': is_refreshing }" :disabled="is_refreshing" @click="Refresh">
          <BaseIcon width="24" height="20" viewBox="0 0 24 20" class="session__item-check">
            <IconRefresh />
          </BaseIcon>
        </button-->
      </div>
    </div>
  </li>
</template>

<script>
import AppText from "@/engine/components/app/AppText.vue";
import BaseIcon from "./BaseIcon.vue";
import IconCheck from "./icons/IconCheck.vue";
//import IconRefresh from "./icons/IconRefresh.vue";

export default {
  name: 'AppSessionCard',
  props: {
    id: {
      type: [String, Number],
      default: ''
    },
    exercise_id: {
      type: [String, Number],
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    sessionType: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default: null
    },
    isDone: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      is_refreshing: false
    }
  },
  methods: {
    OpenInstruction(){
      if(this.is_refreshing) return;
      this.$PageController.CloseAllModals();
      this.$PageController.OpenModal('instruction', { id: this.id, ins_id: this.exercise_id, session_type: this.sessionType });
    },
    async Done(e){
      e.stopPropagation();
      if(this.is_refreshing) return;
      this.$state.temp.done[`sc_${this.id}`] = true;

      let link = 'workout.mark-as-done';
      if(this.sessionType == 'stretching') link = 'workout.mark-as-done-stretching';

      const r = await this.$Api.query(link, {}, { id: this.id });
      if(r.status != 'success') return; //this.$toast.error(this.$t('app.session.errors.mark_done'));
      //else this.$toast.success(this.$t('app.session.mark_done'));
      this.$state.temp.session_is_done = r.session;
      this.$emit('updateSchedules');
    },
    async Refresh(){
      if(this.is_refreshing) return;
      this.is_refreshing = true;
      
      setTimeout(() => {
        this.is_refreshing = false;
        this.$router.push(`/app/exercise/change?id=${this.exercise_id}`);
      }, 500);
    },
  },
  created(){
    if(!this.isDone) return;
    this.$state.temp.done[`sc_${this.id}`] = this.isDone;
  },
  computed: {
    isLocalDone(){
      return this.$state.temp.done[`sc_${this.id}`];
    }
  },
  components: {
    AppText,
    BaseIcon,
    IconCheck,
    //IconRefresh
  }
}
</script>
