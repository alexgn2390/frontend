<template>
  <SiteUnavailable v-if="$state.site_unavailable"/>
  <SiteUnavailable v-if="$state.unsupported_format" error_name="format_error"/>
  <ServerUnavailable v-else-if="$state.server_unavailable"/>
  <SessionUnavailable v-else-if="$state.session_unavailable"/>
  <template v-else>
    <AppLayout v-if="$state.app.active" />
    <SiteLayout v-else />
  </template>
</template>

<script>
import AppLayout from '@/engine/layouts/App'
import SiteLayout from '@/engine/layouts/Site'

import SiteUnavailable from '@/engine/pages/system/SiteUnavailable'
import ServerUnavailable from '@/engine/pages/system/ServerUnavailable'
import SessionUnavailable from '@/engine/pages/system/SessionUnavailable'

var App = {
  name: 'App',
  async created(){
    this.$Debug.custom('Vue', 'Application initialization');

    this.$state.axios = this.axios;
    this.$state.$event = this.$event;
    this.$state.$router = this.$router;
    this.$state.$route = this.$router.currentRoute;
    this.$state.$t = this.$t;
    
    this.$Lang.created();
    this.$Debug.created();
    this.$Device.created();
    this.$Func.created();
    this.$Notify.created(this.$t('general.messages.notify_on'));
    this.$PageController.created();
    this.$Api.created();
  },
  methods: {},
  mounted(){
    this.$Debug.custom('Vue', 'Application initialization finished');
  },
  components: {
    AppLayout,
    SiteLayout,
    SiteUnavailable,
    ServerUnavailable,
    SessionUnavailable,
  }
}

export default App;
</script>

<style lang="scss">

</style>