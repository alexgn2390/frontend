<template>
  <section class="B2B_HomeFaq">
    <div class="Head">
      <div class="Content">
        <div class="Wrapper">
          <text>FAQs</text>
          <img src="/engine/assets/img/b2b/1/faq.png" />
        </div>
      </div>
    </div>
    <div class="Container">
      <div class="Content">
        <div class="List">
          <template v-for="(r, i) in data" :key="`faq_row_${i}`">
            <div @click="SetActive(i)" class="Row" :class="{'active': active == i, 'no_border': active == i + 1}">
              <div class="Head">
                <text>{{ r.title }}</text>
                <i v-if="active == i" class="bi bi-x"></i>
                <i v-else class="bi bi-plus"></i>
              </div>
              <div class="Body">
                <text>{{ r.text }}</text>
              </div>
              <!--div v-show="active == i" class="Body">
                <text>{{ r.text }}</text>
              </div-->
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'B2B_HomeFaq',
  data(){
    return {
      active: 0,
      data: [
        { title: 'How easy is it to implement nFitnity in our facility?', text: 'Implementing nFitnity is straightforward. The app is designed to be user-friendly and can be easily installed on tablets in your facility\'s exercise area. We provide clear guidelines and support to ensure a smooth setup process.' },
        { title: 'What kind of support does nFitnity offer?', text: 'nFitnity offers comprehensive support, including technical assistance, user training, and ongoing customer service. Our dedicated team is available to address any issues or questions to ensure you get the most out of our platform.' },
        { title: 'Do staff and residents require training to use nFitnity?', text: 'nFitnity is designed for ease of use with minimal training required. We provide simple, intuitive guides and tutorials to help both staff and residents quickly become comfortable with the platform. Additionally, our support team is always ready to provide extra assistance if needed.' },
        { title: 'Can nFitnity be customized to fit the specific needs of our residents?', text: 'Absolutely! nFitnity\'s AI-driven platform is designed to create personalized workout plans that cater to the individual needs and fitness levels of each resident, ensuring a tailored fitness experience.' },
        { title: 'How does nFitnity ensure the safety of the exercises for seniors?', text: 'Safety is a top priority for nFitnity. Our exercise programs are developed with seniors\' needs in mind, focusing on safe, low-impact exercises. Additionally, each exercise comes with detailed video guides to ensure correct form and execution.' },
        { title: 'Is there ongoing maintenance or updates required for the nFitnity app?', text: 'nFitnity is a dynamic platform that receives regular updates and maintenance to ensure optimal performance and user experience. These updates are automatically applied with minimal disruption to service, ensuring that your facility always has access to the latest features and improvements.' },
        { title: 'How does nFitnity integrate with our existing wellness programs?', text: 'nFitnity is designed to complement and enhance your existing wellness programs. It can be seamlessly integrated into your current routines, adding a layer of personalized, AI-driven fitness coaching that enriches the overall wellness experience for your residents.' },
        { title: 'What kind of data and reporting does nFitnity provide?', text: 'nFitnity offers detailed reporting and analytics, allowing you to track the progress and engagement of your residents. This data can be invaluable for evaluating the effectiveness of the program and making informed decisions about resident care.' }
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