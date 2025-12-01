<template>
  <section class="B2B_HomeCards">
    <div v-if="is_desktop" class="Head">
      <div class="Content">
        <div class="separator"></div>
        <img src="/engine/assets/img/b2b/1/icons/swipe.png" />
        <text>swipe and click to find out more</text>
      </div>
    </div>
    <div class="Container">
      <div class="Content">
        <template v-for="(r, i) in data" :key="`card_${i}`">
          <div @click="SetActive(i)" class="Card" :class="{'active': active == i || !is_desktop}">
            <img :src="`/engine/assets/img/b2b/1/cards/${i + 1}.png`" />
            <div class="Body">
              <div class="Title">{{ r.title }}</div>
              <text v-if="r.text" v-html="r.text"></text>
            </div>
          </div>
        </template>
        <div v-if="!is_desktop" @click="$PageController.OpenModal('b2b_request')" class="B2B_Button">Request a demo</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'B2B_HomeCards',
  data(){
    return {
      active: -1,
      data: [
        { title: 'Personalized Workout Plans', text: '<span>Tailored to Each Resident\'s Needs:</span> nFitnity\'s AI technology creates personalized workout plans that cater to the individual health requirements and fitness levels of each resident, ensuring safe, effective, and enjoyable exercise routines.' },
        { title: 'AI-Driven Recommendations', text: '<span>Smart Fitness at Your Fingertips:</span> Our advanced AI algorithms analyze resident profiles to recommend the most suitable exercises, optimizing their fitness journey for better results and higher satisfaction.' },
        { title: 'User-Friendly Video Guides', text: '<span>Easy-to-Follow Fitness:</span> nFitnity provides engaging video guides that are simple to follow, making workouts accessible and enjoyable for residents, regardless of their fitness experience or tech-savviness.' },
        { title: 'Ease of Use for Staff/Residents', text: '<span>Simplicity and Support:</span> nFitnity\'s intuitive platform is easy for both staff and residents to use, requiring minimal training. Our support team is always on hand to assist with any queries, ensuring a smooth experience for everyone.' }
      ],
      is_desktop: this.$state.page_state.width > 1050
    }
  },
  methods: {
    SetActive(i){
      if(this.active == i) return this.active = -1;
      this.active = i;
    }
  },
  watch: {
    '$state.page_state.width'(v){
      this.is_desktop = v > 1050;
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
</style>