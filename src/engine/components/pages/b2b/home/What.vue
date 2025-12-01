<template>
  <section class="B2B_HomeWhat">
    <div class="Head">
      <text>What is nFitnity?</text>
    </div>
    <div class="Container">
      <div class="Content">
        <div class="Row r1">
          <img src="/engine/assets/img/b2b/1/tablet.png" />
          <div class="Column">
            <div class="Title">A Revolutionary Fitness<br>Program at Your Fingertips</div>
            <div class="Text"><span>Overview:</span> nFitnity is an innovative fitness program encapsulated in a user-friendly app, installed on a tablet conveniently located in your facility’s exercise area. It’s a gateway to personalized fitness for every resident</div>
            <div class="Text"><span>How It Works:</span> Residents can easily log into their accounts on the tablet to access their custom workout plans. Each plan comes with detailed text and video explanations for every exercise, ensuring clarity and safety in execution</div>
          </div>
        </div>
        <div class="Row r2">
          <div class="Column">
            <div class="Text"><span>User Experience:</span> Designed with simplicity in mind, nFitnity makes it effortless for residents to follow their exercise routines. The intuitive interface guides them through each step of their workout, providing a seamless and engaging fitness experience</div>
            <div class="Text"><span>Benefits:</span> With nFitnity, residents enjoy a tailored approach to fitness that respects their individual needs and capabilities. The program not only enhances physical health but also fosters a sense of independence and achievement among users</div>
          </div>
          <img src="/engine/assets/img/b2b/1/phone.png" />
        </div>
      </div>
      <div @click="$PageController.OpenModal('b2b_request')" class="B2B_Button">Request a demo</div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'B2B_HomeWhat',
  components: {}
}
</script>

<style lang="scss" scoped>
</style>