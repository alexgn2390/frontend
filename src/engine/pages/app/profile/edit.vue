<template>
  <div class="section section_theme_lightblue">
    <Header :title="$t('app.profile.edit.title')" class="section__header_type_two" back_link="/app/profile" />

    <div class="section__logo">
      <img src="/engine/assets/img/app/profile.png" />
    </div>

    <div class="container section__container">
      <form class="form" @submit.prevent="onSave">
        <div class="form__inputs">
          <Input :aria-label="$t('app.login.enter_name')" input-type="text" :input-placeholder="$t('app.general.name')"
            classes="input_theme_default input_size_md" :error-class="isValidError('name')" v-model="user.name" />

          <div class="form__row">
            <Input :aria-label="$t('app.login.enter_phone')" input-type="text" :input-placeholder="$t('app.general.phone')"
              classes="input_theme_default input_size_md input_border_half" :error-class="isValidError('phone')"
              v-model="user.phone" />
          </div>

          <Input :aria-label="$t('app.login.enter_email')" input-type="text" :input-placeholder="$t('app.general.email')"
            classes="input_theme_default input_size_md" :error-class="isValidError('email')" v-model="user.email" />
        </div>
      </form>

      <button class="button button_theme_default button_size_md button_is_wide" @click="onSave" :class="{ 'load': is_loading }">
        {{ $t('app.profile.edit.btn_save') }}
      </button>

    </div>
  </div>
</template>

<script>
import Header from "@/engine/components/app/Header.vue";
import Input from "@/engine/components/app/Input.vue";

export default {
  name: 'AppProfileEditPage',
  data() {
    return {
      is_loading: false,
      valid_error: [],
      user: {
        name: '',
        phone: '',
        email: ''
      }
    }
  },
  async mounted() {
    if(!this.$user.id) return this.$router.push('/app/profile');
    Object.assign(this.user, this.$user);
  },
  methods: {
    async onSave(){
      if(!this.CheckValid() || this.is_loading) return;

      if(this.user.email != this.$user.email){
        this.is_loading = true;
        let r = await this.$Api.query('account.find', {}, { email_or_phone: this.user.email });
        this.is_loading = false;

        if(r.status == 'success') return this.$toast.error('The user is already registered to this email');
      }

      this.is_loading = true;
      let r = await this.$User.updateInfo(this.user);
      this.is_loading = false;

      //this.$Debug.log('ProfileEdit', r);
      if(r.status == 'success') this.$router.push('/app/profile');
    },

    /**
     * Validations
     */
    CheckValid(){
      this.ClearValidErrors();

      if(this.user.name.length < 1) this.AddValidError('name');
      if(this.user.phone.length < 11) this.AddValidError('phone');
      if(!this.$Func.ValidateEmail(this.user.email)) this.AddValidError('email');

      return this.valid_error.length <= 0;
    },
    AddValidError(name){
      if (this.isValidError(name)) return;
      this.valid_error.push(name);
    },
    RemoveValidError(name){
      this.valid_error.filter((e) => {
        return e !== name;
      });
    },
    ClearValidErrors(){
      this.valid_error = [];
    },
    isValidError(name){
      return this.valid_error.indexOf(name) !== -1;
    }
  },
  computed: {
    
  },
  watch: {
    'user.name': 'CheckValid',
    'user.phone': 'CheckValid',
    'user.email': 'CheckValid',
  },
  components: {
    Header,
    Input
  }
}
</script>

<style scoped>
.error {
  border: 1px solid red;
}
</style>