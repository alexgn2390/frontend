<template>
  <section class="TopHeader">
    <div class="B2B_TopHeader">
      <div class="Container">
        <div class="Content">
          <div class="Left"></div>
          <div class="Right">
            <div class="Button">
              <div class="icon"></div>
              <span @click="GoLogin">Login</span>
            </div>
            <div class="Button">
              <span @click="GoContact">Contact us</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'B2B_TopHeader',
  methods: {
    GoLogin(){
      // this.$toast.info('Coming Soon!');
       this.$router.push('/app');
    },
    GoContact(){
      this.$scrollTo('#contacts', 300);
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
</style>
