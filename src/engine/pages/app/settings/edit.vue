<template>
  <div class="section settings">
    <Header :title="$t('app.settings.title')" class="section__header_type_two" />

    <div class="container section__container">
      <Params class="section__params" />
      <Button :button-text="$t('app.settings.save')" class="button button_theme_default button_size_md button_is_wide" />
    </div>
  </div>
</template>

<script>
import Header from "@/engine/components/app/Header.vue";
import Params from "@/engine/components/app/Params.vue";
import Button from "@/engine/components/app/Button.vue";

export default {
  name: 'AppSettingsEditPage',
  data() {
    return {

    }
  },
  components: {
    Header,
    Params,
    Button
  }
}
</script>
