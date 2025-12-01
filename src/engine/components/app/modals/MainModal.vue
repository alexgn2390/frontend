<template>
  <transition name="slide-fade-bottom" mode="out-in" appear :css="true">
    <div v-if="active || preload" class="ModalContent" :class="{'hide': preload, 'app': $state.app.active}">
      <component :is="component" ref="modal"></component>
    </div>
  </transition>
</template>

<script>
import { defineAsyncComponent, markRaw } from 'vue'
import LoadingForm from "./Loading.vue";
import ErrorForm from "./Error.vue";

export default {
  name: 'AppModal',
  props: {
    id: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
  },
  data(){
    return {
      active: false,
      preload: true,
      component: null
    }
  },
  created(){
    this.component = markRaw(defineAsyncComponent({
      loader: () => import(/* webpackChunkName: "dynamic-form" */ `./${this.name}.vue`),
      loadingComponent: LoadingForm,
      delay: 10000,
      errorComponent: ErrorForm,
      timeout: 3000
    }));

    setTimeout(() => {
      this.preload = false;
    }, 1500);
  },
  methods: {
    opened(){
      document.body.classList.add("no-scroll");
    },
    closed(){
      document.body.classList.remove("no-scroll");
    },
  },
  watch: {
    '$state.app.modal.id'(id, old_id){
      if(this.$config.debug.modal_log) this.$Debug.log('Modal', `New modal id: ${id}`);

      if(id != this.id){
        this.active = false;

        if(old_id != this.id) return;
        this.$refs.modal?.closed();
        this.closed();
        return;
      }

      this.active = true;
      this.$nextTick(() => {
        this.$refs.modal?.opened();
        this.opened();
      });
    }
  },
  components: {
    LoadingForm,
    ErrorForm
  }
}
</script>

<style scoped>

</style>