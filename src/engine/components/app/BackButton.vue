<template>
  <button @click.prevent="GoBack" class="button back-button" aria-label="Come back">
    <BaseIcon width="32" height="32" view-box="0 0 24 24" fill="none">
      <IconBackArrow />
    </BaseIcon>
  </button>
</template>

<script>
import BaseIcon from "./BaseIcon.vue";
import IconBackArrow from "./icons/IconBackArrow.vue";

export default {
  name: 'AppBackButton',
  props: {
    back_link: {
      type: String,
      default: ''
    }
  },
  methods: {
    GoBack(){
      if(this.back_link == 'none') return;
      if(this.back_link != '') return this.$router.push(this.back_link);
      this.$router.back();
    }
  },
  components: {
    BaseIcon,
    IconBackArrow,
  }
}
</script>
