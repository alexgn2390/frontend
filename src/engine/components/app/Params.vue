<template>
  <div class="params__list">
    <div class="params__item">
      <AppText tag="h3" text="Choose Age Group"
        classes="text_size_lg text_weight_medium text_theme_dark params__item-title" />

      <div class="params__item-row">
        <div class="params__item-icon params__item-icon_theme_yellow">
          <BaseIcon fill="none" width="48" height="45" view-box="0 0 48 45">
            <icon-age />
          </BaseIcon>
        </div>

        <Select :options="ages" :selectedOption="selectedAge" @select="selectAge"
          class="select select_theme_default select_size_full params__select" />
      </div>
    </div>

    <div class="params__item">
      <AppText tag="h3" text="Choose Fitness Goal"
        classes="text_size_lg text_weight_medium text_theme_dark params__item-title" />

      <div class="params__item-row">
        <div class="params__item-icon params__item-icon_theme_blue">
          <BaseIcon fill="none" width="48" height="49" view-box="0 0 48 49">
            <icon-fitness />
          </BaseIcon>
        </div>

        <Select :options="goals" :selectedOption="selectedGoal" @select="selectGoal"
          class="select select_theme_default select_size_full params__select" />
      </div>
    </div>

    <div class="params__item">
      <AppText tag="h3" text="Choose Training Type"
        classes="text_size_lg text_weight_medium text_theme_dark params__item-title" />

      <div class="params__item-row">
        <div class="params__item-icon params__item-icon_theme_red">
          <BaseIcon fill="none" width="51" height="51" view-box="0 0 51 51">
            <icon-training />
          </BaseIcon>
        </div>

        <Select :options="types" :selectedOption="selectedType" @select="selectType"
          class="select select_theme_default select_size_full params__select" />
      </div>
    </div>
  </div>
</template>

<script>
import AppText from "@/engine/components/app/AppText.vue";
import Select from "@/engine/components/app/Select.vue";

import BaseIcon from "./BaseIcon.vue";
import IconAge from "./icons/IconAge.vue";
import IconFitness from "./icons/IconFitness.vue";
import IconTraining from "./icons/IconTraining.vue";

export default {
  name: 'AppParams',
  data() {
    return {
      ages: [],
      goals: [],
      types: [],

      selectedAge: {},
      selectedGoal: {},
      selectedType: {},
    };
  },
  async created() {
    //this.ages = await this.$Api.getAges();
    //this.goals = await this.$Api.getGoals();
    //this.types = await this.$Api.getTrainingTypes();
  },
  methods: {
    selectAge(age) {
      this.selectedAge = age;
      this.$emit("selectAge", age.id);
    },
    selectGoal(goal) {
      this.selectedGoal = goal;
      this.$emit("selectGoal", goal.id);
    },
    selectType(type) {
      this.selectedType = type;
      this.$emit("selectType", type.id);
    },
  },
  components: {
    AppText,
    Select,
    BaseIcon,
    IconAge,
    IconFitness,
    IconTraining,
  }
}
</script>
