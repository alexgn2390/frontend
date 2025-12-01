<template>
  <div class="modal instruction__modal modal_type_full">
    <app-text tag="h3" text="Choose Your Comfortable Weight"
      classes="text text_size_lg text_weight_medium modal__text" />
    <p class="text text_size_md text_weight_normal modal__text">Hello! In our exercises, we prioritize your individual
      capabilities. We don't specify the weight because we understand that everyone is unique. Please choose a weight
      that feels comfortable and doesn't cause any discomfort. Your safety and comfort are our top priorities. Enjoy
      your workout!</p>
    <img src="/engine/assets/img/app/session.png" srcset="
        /engine/assets/img/app/session@2x.png 2x,
        /engine/assets/img/app/session@3x.png 3x
      " alt="Session one" height="153" class="modal__image" />


    <div class="session__item-buttons modal__buttons">
      <button class="button button_theme_default button_size_sm button_is_wide modal__button" @click="close">
        Understand
      </button>
    </div>
  </div>
</template>

<script>
import AppText from "../AppText.vue";

export default {
  name: 'AppModalsAlert',
  methods: {
    opened(){},
    closed(){},
    close(){
      localStorage.setItem('is_visited', true);
      this.$PageController.CloseAllModals();
    },
  },
  components: {
    AppText,
  }
}
</script>
