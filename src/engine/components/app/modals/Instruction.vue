<template>
  <div v-if="!is_loading" class="modal instruction__modal modal_type_full modal_flex_between" ref="inst">
    <div class="session__info">
      <iframe :src="videoSrc"
        class="modal__video" width="800" height="400" frameborder="0" allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen></iframe>

      <AppText tag="h2" :text="session.name" classes="text_theme_dark text_size_xl text_weight_semibold modal__text" />
      <div class="html-content" v-html="session.instruction"></div>
    </div>

    <div v-if="is_custom" class="session__panel">
      <div class="session__item-buttons modal__buttons">
        <button class="button button_theme_bordered button_size_sm modal__button" @click="close">
          Close
        </button>
      </div>
    </div>
    <div v-else class="session__panel">
      <div class="session__refresh_panel">
        <button class="button button_theme_default session__item-button session__item-button_circle"
          :class="{ 'session__item-button_is_refresing': is_refreshing }" :disabled="is_refreshing" @click="Refresh">
          <BaseIcon width="24" height="24" viewBox="0 0 24 24" class="session__item-check">
            <IconRefresh />
          </BaseIcon>
        </button>
        <text>click the button to change the exercise</text>
      </div>

      <div class="session__item-buttons modal__buttons">
        <button class="button button_theme_bordered button_size_sm modal__button" @click="close">
          Close
        </button>
        <button v-if="!isLocalDone" class="button button_theme_default button_size_sm modal__button" @click="Done">
          Done
        </button>
      </div>
    </div>
  </div>
  <div v-else class="session session_type_two">
    <div class="container session__content">
      <div class="HomeSession">
        <div class="HomeSession_image seload" style="height: 153px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import AppText from "../AppText.vue";
import BaseIcon from "../BaseIcon.vue";
import IconRefresh from "../icons/IconRefresh.vue";

export default {
  name: 'AppModalsInstrution',
  data() {
    return {
      session: {},
      is_loading: true,
      is_refreshing: false
    }
  },
  async created(){
    if(!this.ins_id) return this.close();
    else if(this.ins_id == 'warmup') this.getWarmup();
    else this.getInstruction();
  },
  methods: {
    opened(){},
    closed(){},
    close(){
      if(this.is_refreshing) return;
      this.$PageController.CloseAllModals();
    },
    async getWarmup(){
      this.is_loading = true;
      const r = await this.$Api.query('workout.warmup', {}, { current_date: this.getCurrentDate });
      this.is_loading = false;

      if(r.status == 'server_error'){
        this.$toast.error(this.$t('app.session.errors.instruction'));
        this.close();
        return;
      }

      this.session = r.response;
    },
    async getInstruction(){
      if(this.is_custom) return;

      this.is_loading = true;
      const r = await this.$Api.query('exercise.get', {}, { exercise_id: Number(this.ins_id) });
      this.is_loading = false;

      if(r.status == 'server_error'){
        this.$toast.error(this.$t('app.session.errors.instruction'));
        this.close();
        return;
      }

      this.session = r.response;
    },
    async Done(){
      if(this.is_refreshing) return;
      this.$state.temp.done[`sc_${this.id}`] = true;
      
      let link = 'workout.mark-as-done';
      if(this.session_type == 'stretching') link = 'workout.mark-as-done-stretching';

      const r = await this.$Api.query(link, {}, { id: this.id });
      if(r.status != 'success') return; //this.$toast.error(this.$t('app.session.errors.mark_done'));
      this.$state.temp.session_is_done = r.session;
      //else this.$toast.success(this.$t('app.session.mark_done'));
    },
    async Refresh(){
      if(this.is_refreshing) return;
      this.is_refreshing = true;
      
      setTimeout(() => {
        this.is_refreshing = false;
        this.$router.push(`/app/exercise/change?id=${this.ins_id}`);
        this.close();
      }, 200);
    },
  },
  computed: {
videoSrc() {
  const link = this.session.link || '';

  if (link.includes('youtube.com') || link.includes('youtu.be')) {
    const match = link.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/)?)([A-Za-z0-9_-]{6,11})/);
    if (match && match[1]) return `https://www.youtube.com/embed/${match[1]}`;
    return link;
  }

  if (link.includes('vimeo.com')) {
    const id = link.replace(/.*vimeo\.com\//, '');
    return `https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0`;
  }

  if (link.startsWith('http')) return link;

  return `https://player.vimeo.com/video/${link}?title=0&byline=0&portrait=0`;
},
    id(){
      return this.$state.app.modal.query.id;
    },
    ins_id(){
      return this.$state.app.modal.query.ins_id;
    },
    session_type(){
      return this.$state.app.modal.query.session_type;
    },
    is_custom(){
      return this.id == 'custom';
    },
    isLocalDone(){
      return this.$state.temp.done[`sc_${this.id}`];
    }
  },
  components: {
    AppText,
    BaseIcon,
    IconRefresh,
  }
}
</script>
