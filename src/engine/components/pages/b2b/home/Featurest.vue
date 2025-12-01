<template>
  <section class="B2B_HomeFeaturest">
    <div class="Head">
      <text>Key Features and Outcomes</text>
    </div>
    <div class="Container">
      <div class="Content">
        <div class="Cards">
          <template v-for="(r, i) in data" :key="`feature_card_${i}`">
            <div class="Card">
              <div class="Head">
                <img :src="`/engine/assets/img/b2b/1/icons/${r.icon}.png`" />
              </div>
              <div class="Title">{{ r.title }}</div>
              <div class="Text">{{ r.text }}</div>
              <div class="Footer">
                <img src="/engine/assets/img/b2b/1/icons/thumb_up_circle_padding.png" />
                <div class="Price">{{ r.price }}</div>
                <div class="PriceText">{{ r.price_text }}</div>
              </div>
              <router-link v-if="r.button" :to="r.button.link" class="Button">{{ r.button.text }}<i class="bi bi-arrow-right"></i></router-link>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'B2B_HomeFeaturest',
  data(){
    return {
      active: 0,
      data: [
        { icon: 'statistic', title: 'Streamline Your Budget with AI Fitness Coaching', text: 'Significantly reduce costs by replacing expensive fitness staff with nFitnity’s affordable  AI coaching and achieve comprehensive fitness programming ', price: '$10/', price_text: '  month AI coaching,  available 24/7' },
        { icon: 'heart', title: 'Elevate Resident Health Precisely and Effectively', text: 'Improve resident health and mobility with nFitnity’s tailored fitness plans and AI-driven insights. ', price: '50%', price_text: 'chance to minimize chronic disease risks', button: { text: 'Learn more', link: '/corporate/health' } },
        { icon: 'person', title: 'Transform Senior Fitness into a Source of Joy and Engagement', text: 'Boost resident satisfaction and community spirit through nFitnity’s interactive platform. Engage and motivate residents, making fitness a joyful and communal activity in your facility', price: '44%', price_text: 'decrease in depression symptoms observed' },
        { icon: 'thumb_up', title: 'Enhance Your Facility\'s Reputation and Demonstrate Value', text: 'Elevate your market standing and showcase your commitment to quality care with nFitnity. Differentiate your facility with innovative, health-focused care and measurable fitness outcomes, affirming your dedication to resident well-being', price: '83%', price_text: 'of seniors prefer smart technology in facilities' }
      ]
    }
  },
  methods: {
    SetActive(i){
      if(this.active == i) return this.active = -1;
      this.active = i;
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
</style>