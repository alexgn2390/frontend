<template>
  <div class="PageContainer nogap">
    <TopHeader />
    <Header />
    <template v-if="page == 'home'">
      <HomeTop />
      <HomeTrust />
      <HomeFeaturest />
      <HomeWhat />
      <HomeMeaningful />
      <HomeCards />
      <HomeFaq />
    </template>
    <Text />
    <Footer />
  </div>
</template>

<script>
import TopHeader from '@/engine/components/pages/b2b/TopHeader'
import Header from '@/engine/components/pages/b2b/Header'

import HomeTop from '@/engine/components/pages/b2b/home/Top'
import HomeTrust from '@/engine/components/pages/b2b/home/Trust'
import HomeFeaturest from '@/engine/components/pages/b2b/home/Featurest'
import HomeWhat from '@/engine/components/pages/b2b/home/What'
import HomeMeaningful from '@/engine/components/pages/b2b/home/Meaningful'
import HomeCards from '@/engine/components/pages/b2b/home/Cards'
import HomeFaq from '@/engine/components/pages/b2b/home/Faq'

import Text from '@/engine/components/pages/b2b/Text'
import Footer from '@/engine/components/pages/b2b/Footer'

export default {
  name: 'B2BPage',
  data(){
    return {
      page: 'home'
    }
  },
  async created(){

    // this.$PageController.pageSettings('B2B', 'p_b2b');
    this.$PageController.pageSettings('Main', 'p_main');


  },


  mounted(){ this.$PageController.pageMounted(); },
  beforeUnmount(){ this.$PageController.pageUnmounted(); },
  components: {
    TopHeader,
    Header,

    HomeTop,
    HomeTrust,
    HomeFeaturest,
    HomeWhat,
    HomeMeaningful,
    HomeCards,
    HomeFaq,

    Text,
    Footer,
  }
}
</script>

<style lang="scss" scoped>

</style>
