<template>
  <section id="footer" class="B2B_Footer">
    <div class="WhiteLine"></div>
    <div class="Container">
      <img src="/engine/assets/img/b2b/1/footer_logo.png" />
      <div class="Content">
        <!--div class="Socials">
          <img @click="Open('')" class="Social facebook" src="/engine/assets/img/social/facebook.png" />
          <img @click="Open('')" class="Social instagram" src="/engine/assets/img/social/instagram.png" />
          <img @click="Open('')" class="Social whatsapp" src="/engine/assets/img/social/whatsapp.png" />
          <img @click="Open('')" class="Social tumblr" src="/engine/assets/img/social/tumblr.png" />
        </div-->

        <template v-if="is_desktop">
          <div id="contacts" class="Info contacts">
            <p class="InfoText"><i class="bi bi-envelope-at"></i> info@nfitnity.com</p>
            <p class="InfoText"><i class="bi bi-telephone"></i> +1 (813) 815-2581</p>
          </div>
          <div  class="Info">
            <div class="InfoText"><img src="/engine/assets/img/b2b/1/icons/footer_location.png" /> Registered office: 651 N Broad St, Ste 201, Middletown, DE 19709 </div>
            <div class="InfoText"><img src="/engine/assets/img/b2b/1/icons/footer_note.png" /> For Correspondence: 27001 Jupiter Bay Drive Wesley Chapel, FL 33544 US</div>
          </div>
        </template>
        <div v-else id="contacts" class="Info">
          <div class="InfoText"><img src="/engine/assets/img/b2b/1/icons/footer_message.png" /> info@nfitnity.com</div>
          <div class="InfoText"><img src="/engine/assets/img/b2b/1/icons/footer_phone.png" /> +1 (813) 815-2581</div>
          <div class="InfoText"><img src="/engine/assets/img/b2b/1/icons/footer_location.png" /> Registered office: 651 N Broad St, Ste 201, Middletown, DE 19709 </div>
          <div class="InfoText"><img src="/engine/assets/img/b2b/1/icons/footer_note.png" /> For Correspondence: 27001 Jupiter Bay Drive Wesley Chapel, FL 33544 US</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'B2B_Footer',
  data(){
    return {
      is_desktop: this.$state.page_state.width > 1050
    }
  },
  watch: {
    '$state.page_state.width'(v){
      this.is_desktop = v > 1050;
    }
  },
  methods: {
    Open(url){
      window.open(url);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>