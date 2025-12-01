<template>
  <div class="select" :class="{ select_is_active: visible, select_is_disabled: disabled }"
    v-if="options && options.length">
    <p class="select__value" @click="toggleSelect">
      <span class="select__text">
        {{ selectedOption.name || options[0].name }}
      </span>
    </p>
    <BaseIcon width="20" height="20" view-box="0 0 20 20" class="select__icon">
      <icon-arrow-down />
    </BaseIcon>
    <ul class="list select__options" v-if="visible">
      <li v-for="option in options" :key="option.id" class="select__option" :class="{ select__option_is_active: option.id === selectedOption.id, }" @click="selectOption(option)">
        <span>{{ option.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import BaseIcon from "./BaseIcon.vue";
import IconArrowDown from "./icons/IconArrowDown.vue";

export default {
  name: 'AppSelect',
  props: {
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    selectedOption: {
      type: Object,
      default() {
        return {};
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    selectOption(option) {
      this.$emit("select", option);
      this.hideSelect();
    },
    toggleSelect() {
      this.visible = this.disabled ? false : !this.visible;
    },
    hideSelect() {
      this.visible = false;
    },
  },
  components: {
    BaseIcon,
    IconArrowDown,
  }
}
</script>
