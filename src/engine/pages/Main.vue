<template>
  <div class="PageContainer">
    <Header />
    <TopInfo />
    <Cards />
    <App />
    <Guide />
    <Advantages />
    <Inform />
    <PrimaryBlock />
    <Reviews />
    <Footer />
  </div>
</template>

<script>
import Header from '@/engine/components/pages/main/general/Header'
import Footer from '@/engine/components/pages/main/general/Footer'
import TopInfo from '@/engine/components/pages/main/sections/TopInfo'
import Cards from '@/engine/components/pages/main/sections/Cards'
import App from '@/engine/components/pages/main/sections/App'
import Guide from '@/engine/components/pages/main/sections/Guide'
import Advantages from '@/engine/components/pages/main/sections/Advantages'
import Inform from '@/engine/components/pages/main/sections/Inform'
import PrimaryBlock from '@/engine/components/pages/main/sections/PrimaryBlock'
import Reviews from '@/engine/components/pages/main/sections/Reviews'
import axios from 'axios'

export default {
  name: 'MainPage',
  async created(){
    if(this.$config.is_app) return this.$router.push('/');
    this.$PageController.pageSettings('Main', 'p_main');
  },
  mounted(){
    this.$PageController.pageMounted();

    axios.get("http://localhost:8081/health/db")
        .then(response => {
          console.log("Статус подключения к базе:", response.data.status);
        })
        .catch(error => {
          console.error("Ошибка при запросе к /health/db:", error);
        });

    },
  beforeUnmount(){ this.$PageController.pageUnmounted(); },
  components: {
    Header,
    TopInfo,
    Cards,
    App,
    Guide,
    Advantages,
    Inform,
    PrimaryBlock,
    Reviews,
    Footer
  }
}
</script>

<style lang="scss" scoped>

</style>
