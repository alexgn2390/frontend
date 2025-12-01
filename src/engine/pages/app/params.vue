<template>
  <div class="params container">
    <AppText tag="h2" text="Your Parameters" classes="text_size_xl text_weight_semibold text_theme_dark params__title" />
    <params @selectAge="selectAge" @selectType="selectType" @selectGoal="selectGoal" />
    <Button button-text="Generate" button-type="button" class="button button_theme_default button_size_md button_is_wide" @click="generateProfile" />
  </div>
</template>

<script>
import AppText from "@/engine/components/app/AppText.vue";
import Params from "@/engine/components/app/Params.vue";
import Button from "@/engine/components/app/Button.vue";

export default {
  name: 'AppParamsPage',
  data() {
    return {
      selectedAgeId: 1,
      selectedGoalId: 1,
      selectedTypeId: 1,
    };
  },
  methods: {
    selectAge(id){
      this.selectedAgeId = id;
    },
    selectGoal(id){
      this.selectedGoalId = id;
    },
    selectType(id){
      this.selectedTypeId = id;
    },
    generateProfile(){
      const data = {
        user_id: this.$user.id ?? JSON.parse(localStorage.getItem('Infinity_user_id')),
        age_group_id: this.selectedAgeId,
        goal_id: this.selectedGoalId,
        training_type_id: this.selectedTypeId,
      };

      this.$Debug.log('params', 'Отправка запроса на сервер:', data);
      
      // Сделать отправку
    },
  },
  computed: {
    
  },
  components: {
    AppText,
    Params,
    Button,
  }
}
</script>
