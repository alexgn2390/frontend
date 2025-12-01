<template>
  <div class="GetApp">
    <div class="Content">
      <div class="Top">
        <div class="Image"></div>
      </div>
      <div class="Bottom">
        <div class="Title">{{ $t('pages.get.title') }}</div>
        <div class="Text">{{ $t('pages.get.text') }}</div>
        <div @click="GetApp" class="Button">{{ $t('pages.get.button') }}</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'GetAppPage',
  data() {
    return {
      
    }
  },
  async created(){
    this.$PageController.pageSettings('GetApp', 'p_get');
  },
  methods: {
    GetApp(){
      const x = screen.width/2 - 420/2;
      const y = screen.height/2 - 750/2;
      window.open('/app', 'popup', `height=750,width=420,left=${x},top=${y}`);
    },
  },
  mounted(){ this.$PageController.pageMounted(); },
  beforeUnmount(){ this.$PageController.pageUnmounted(); },
  components: {
    
  }
}
</script>

<style lang="scss" scoped>

</style>