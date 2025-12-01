<template>
  <section id="header" class="B2B_Header">
    <div class="Container">
      <div class="Content">
        <div class="Logo">
          <router-link to="/"><img src="/engine/assets/img/b2b/1/header_logo.png" /></router-link>
          <div class="Text">AI Personal Trainer for 55+</div>
        </div>
        <div v-if="is_desktop" class="Nav">
          <template v-for="(r, i) in links" :key="`nav_${i}`">
            <router-link :to="r.link" class="NavLink">{{ r.title }}</router-link>
          </template>
        </div>
        <template v-else>
          <div @click="OpenMobile" class="NavMenuButton">
            <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.66602 15.5129C1.38268 15.5129 1.14518 15.417 0.953516 15.2253C0.761849 15.0335 0.666016 14.7959 0.666016 14.5125C0.666016 14.229 0.761849 13.9915 0.953516 13.8001C1.14518 13.6087 1.38268 13.5129 1.66602 13.5129H22.3326C22.616 13.5129 22.8535 13.6088 23.0451 13.8006C23.2368 13.9923 23.3326 14.2299 23.3326 14.5134C23.3326 14.7968 23.2368 15.0343 23.0451 15.2257C22.8535 15.4172 22.616 15.5129 22.3326 15.5129H1.66602ZM1.66602 9.00007C1.38268 9.00007 1.14518 8.9042 0.953516 8.71247C0.761849 8.52072 0.666016 8.28312 0.666016 7.99967C0.666016 7.7162 0.761849 7.47875 0.953516 7.2873C1.14518 7.09586 1.38268 7.00014 1.66602 7.00014H22.3326C22.616 7.00014 22.8535 7.096 23.0451 7.28774C23.2368 7.47949 23.3326 7.71709 23.3326 8.00054C23.3326 8.284 23.2368 8.52146 23.0451 8.7129C22.8535 8.90435 22.616 9.00007 22.3326 9.00007H1.66602ZM1.66602 2.48727C1.38268 2.48727 1.14518 2.39139 0.953516 2.19964C0.761849 2.0079 0.666016 1.7703 0.666016 1.48684C0.666016 1.20339 0.761849 0.965948 0.953516 0.774504C1.14518 0.583037 1.38268 0.487305 1.66602 0.487305H22.3326C22.616 0.487305 22.8535 0.583181 23.0451 0.774937C23.2368 0.966693 23.3326 1.20429 23.3326 1.48774C23.3326 1.7712 23.2368 2.00866 23.0451 2.2001C22.8535 2.39155 22.616 2.48727 22.3326 2.48727H1.66602Z" fill="#404B52" />
            </svg>
          </div>
        </template>
      </div>
    </div>
  </section>
  
  <section v-if="!is_desktop" class="MobileMenu" :class="{'active': mobile_active}">
    <div class="NavMobile">
      <div class="NavHeader">
        <text>Menu</text>
        <img @click="CloseMobile" src="/engine/assets/img/b2b/1/icons/x.png" />
      </div>
      <div class="NavMenu">
        <router-link to="/corporate/login" class="NavButton">
          <text>Login</text>
        </router-link>
        <div @click="GoContact" class="NavButton">
          <text>Contact us</text>
        </div>
        <router-link to="/corporate" class="NavButton">
          <text>Home</text>
        </router-link>
        <router-link to="/corporate/health" class="NavButton">
          <text>Health Impact</text>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'B2B_Header',
  data(){
    return {
      is_desktop: this.$state.page_state.width > 1050,
      mobile_active: false,
      links: [
        { title: 'Home', link: '/corporate' },
        { title: 'Health Impact', link: '/corporate/health' },
      ]
    }
  },
  methods: {
    GoLogin(){
      this.$toast.info('Coming Soon!');
    },
    GoContact(){
      this.$scrollTo('#contacts', 300);
      this.CloseMobile();
    },
    CloseMobile(){
      this.mobile_active = false;
    },
    OpenMobile(){
      this.mobile_active = true;
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