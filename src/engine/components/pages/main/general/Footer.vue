<template>
  <footer>
    <div class="Footer_Content">
      <img class="Footer_Logo" src="/engine/assets/img/index/footer.png" />
      <div class="Footer_Wrapper">
        <div class="Footer_Socials">
          <!--img @click="Open('')" class="Footer_Social facebook" src="/engine/assets/img/social/facebook.png" />
          <img @click="Open('')" class="Footer_Social instagram" src="/engine/assets/img/social/instagram.png" />
          <img @click="Open('')" class="Footer_Social whatsapp" src="/engine/assets/img/social/whatsapp.png" />
          <img @click="Open('')" class="Footer_Social tumblr" src="/engine/assets/img/social/tumblr.png" /-->

          <div class="FooterInfo nogap">
            <p class="FooterInfo_Text"><i class="bi bi-envelope-at"></i> info@nfitnity.com</p>
            <p class="FooterInfo_Text"><i class="bi bi-telephone"></i> +1 (813) 815-2581</p>
          </div>
        </div>
        <div class="Footer_Location">
          <!--img class="Footer_Social location" src="/engine/assets/img/social/location.png" /-->

          <div class="FooterInfo">
            <p class="FooterInfo_Text"><i class="bi bi-geo-alt"></i> Registered office: 651 N Broad St, Ste 201, Middletown, DE 19709</p>
            <p class="FooterInfo_Text"><i class="bi bi-geo"></i> For Correspondence: 27001 Juniper Bay Drive Wesley Chapel,<br>FL 33544 US</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
  methods: {
    Open(url){
      window.open(url);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>