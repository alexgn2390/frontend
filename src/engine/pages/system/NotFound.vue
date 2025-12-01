<template>
  <div class="NotFoundPage_container">
    <div id="wrap">
      <div id="main-content">
        <h1 :class="{seloadtext: $state.page_loading}">{{$t('general.messages.could_not_find')}}</h1>
        <p :class="{seloadtext: $state.page_loading}">{{$t('general.messages.page_could_not_be_found')}} {{$t('general.messages.page_temporarily_unavailable')}}</p>
        <!--p :class="{seloadtext: $state.page_loading}">{{$t('general.messages.subject_to_errors_and_search')}}</p>

        <div v-if="!$state.page_loading" id="search">
          <form style="display: flex;">
            <input type="text" :title="$t('general.messages.enter_text')" v-model="searchText" :placeholder="$t('general.messages.enter_text')" />
            <router-link :to="'/search?text=' + searchText" :title="$t('general.search')" class="navigation">{{$t('general.search')}}</router-link>
          </form>
        </div-->

        <div v-if="!$state.page_loading" id="navigation">
          <router-link to="/" class="navigation">{{$t('header.menus.main')}}</router-link>
          <router-link to="/app" class="navigation">{{$t('header.menus.app')}}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  created(){
    this.$PageController.pageSettings('NotFound', 'p_main');
  },
  data(){
    return {
      searchText: ''
    }
  },
  mounted(){ this.$PageController.pageMounted(); },
  beforeUnmount(){ this.$PageController.pageUnmounted(); }
}
</script>

<style lang="scss" scoped>
@import "@/engine/assets/scss/pages/NotFound.scss";
</style>
