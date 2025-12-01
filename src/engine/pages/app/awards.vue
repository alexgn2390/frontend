<template>
  <div class="section section_theme_lightblue">
    <Header title="Awards" class="section__header_type_two" />

    <div class="container">
      <div class="awards">
        <ul class="list awards__list">
          <li class="awards__item" v-for="(award, idx) in awards" :key="idx">
            <p class="text_theme_dark text_size_md text_weight_medium awards__text">
              {{ award.value }} Training
            </p>
            <BaseIcon v-if="award.value >= 0 && award.value <= 18" :width="award.width" :height="award.height" :view-box="award.viewBox" class="awards__icon" fill="none">
              <component :is="'medal' + (idx + 1)" />
            </BaseIcon>
            <BaseIcon v-else :width="award.width" :height="award.height" :view-box="award.viewBox" class="awards__icon" fill="none">
              <component :is="'medal' + (idx + 1) + 'gray'" />
            </BaseIcon>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/engine/components/app/Header.vue";
import BaseIcon from "@/engine/components/app/BaseIcon.vue";
import IconPrize from "@/engine/components/app/icons/IconPrize.vue";

import medal1 from "@/engine/components/app/icons/medals/medal-1.vue";
import medal2 from "@/engine/components/app/icons/medals/medal-2.vue";
import medal3 from "@/engine/components/app/icons/medals/medal-3.vue";
import medal4 from "@/engine/components/app/icons/medals/medal-4.vue";
import medal5 from "@/engine/components/app/icons/medals/medal-5.vue";
import medal6 from "@/engine/components/app/icons/medals/medal-6.vue";
import medal7 from "@/engine/components/app/icons/medals/medal-7.vue";
import medal8 from "@/engine/components/app/icons/medals/medal-8.vue";

import medal1gray from "@/engine/components/app/icons/medals/medal-1-gray.vue";
import medal2gray from "@/engine/components/app/icons/medals/medal-2-gray.vue";
import medal3gray from "@/engine/components/app/icons/medals/medal-3-gray.vue";
import medal4gray from "@/engine/components/app/icons/medals/medal-4-gray.vue";
import medal5gray from "@/engine/components/app/icons/medals/medal-5-gray.vue";
import medal6gray from "@/engine/components/app/icons/medals/medal-6-gray.vue";
import medal7gray from "@/engine/components/app/icons/medals/medal-7-gray.vue";
import medal8gray from "@/engine/components/app/icons/medals/medal-8-gray.vue";

export default {
  name: 'AppAwardsPage',
  computed: {
    awards() {
      return [
        { value: 1, width: '70', height: '72', viewBox: '0 0 70 72' },
        { value: 3, width: '70', height: '96', viewBox: '0 0 70 96' },
        { value: 6, width: '102', height: '96', viewBox: '0 0 102 96' },
        { value: 12, width: '76', height: '72', viewBox: '0 0 76 72' },
        { value: 18, width: '77', height: '80', viewBox: '0 0 77 80' },
        { value: 24, width: '77', height: '90', viewBox: '0 0 77 90' },
        { value: 30, width: '108', height: '90', viewBox: '0 0 108 90' },
        { value: 36, width: '108', height: '112', viewBox: '0 0 108 112' },
      ]
    }
  },
  components: {
    Header,
    BaseIcon,
    IconPrize,
    medal1, medal2, medal3, medal4, medal5, medal6, medal7, medal8,
    medal1gray, medal2gray, medal3gray, medal4gray, medal5gray, medal6gray, medal7gray, medal8gray,
  }
}
</script>
