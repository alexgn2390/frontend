<template>
  <div class="PageContainer nogap">
    <TopHeader />
    <Header />
    <template v-if="page == 'home'">
      <div class="Soon">Coming Soon...</div>
    </template>
    <Text />
    <Footer />
  </div>
</template>

<script>
import TopHeader from '@/engine/components/pages/b2b/TopHeader'
import Header from '@/engine/components/pages/b2b/Header'

import Text from '@/engine/components/pages/b2b/Text'
import Footer from '@/engine/components/pages/b2b/Footer'

export default {
  name: 'B2BPage',
  data(){
    return {
      page: 'home'
    }
  },
  async created(){ this.$PageController.pageSettings('B2B', 'p_b2b'); },
  mounted(){ this.$PageController.pageMounted(); },
  beforeUnmount(){ this.$PageController.pageUnmounted(); },
  components: {
    TopHeader,
    Header,

    Text,
    Footer,
  }
}
</script>

<style lang="scss" scoped>
.Soon{
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--color-text);
  font-family: Lato Bold;
  font-size: 32px;
  line-height: 70px;
  white-space: nowrap;
  text-align: center;
  flex-grow: 1;
  user-select: none;
}
</style>