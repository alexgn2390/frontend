<template>
  <div class="container login">
    <div class="login__head">
      <AppText tag="h2" classes="text_size_xl text_weight_semibold text_theme_dark login__text" :text="$t('app.login.sign_up')" />
      <form class="form" @submit.prevent="createUser">
        <div class="form__inputs">
          <div class="form__group">
            <Input :aria-label="$t('app.login.enter_email')" input-type="text" :input-placeholder="$t('app.login.email')" classes="input_theme_default input_size_md" :error-class="isValidError('email')" v-model="email" />
            <input-error v-if="isValidError('email_req')" :text="$t('app.login.email_required')" />
            <input-error v-if="isValidError('email')" :text="$t('app.login.email_have')" />
          </div>

          <!--div class="form__group">
            <Input :aria-label="$t('app.login.enter_pass')" input-type="password" :input-placeholder="$t('app.login.pass')" classes="input_theme_default input_size_md" :error-class="isValidError('pass') || isValidError('pass_not_match')" v-model="password" maxlength="4" @keyup="isNumberKey" />
            <input-error v-if="isValidError('pass_req')" :text="$t('app.login.pass_required')" />
            <input-error v-if="isValidError('pass')" :text="$t('app.login.pass_have')" />
          </div>

          <div class="form__group">
            <Input :aria-label="$t('app.login.confirm_pass')" input-type="password" :input-placeholder="$t('app.login.pass2')" classes="input_theme_default input_size_md" v-model="repeatPassword" :error-class="isValidError('pass2') || isValidError('pass_not_match')" maxlength="4" @keyup="isNumberKey" />
            <input-error v-if="isValidError('pass2_req')" :text="$t('app.login.field_is_required')" />
            <input-error v-if="isValidError('pass_not_match')" :text="$t('app.login.pass_not_match')" />
          </div-->

          <div class="form__group">
            <Input :aria-label="$t('app.login.enter_name')" input-type="text" :input-placeholder="$t('app.login.name')" classes="input_theme_default input_size_md" :error-class="isValidError('name')" v-model="name" />
            <input-error v-if="isValidError('name_req')" :text="$t('app.login.name_required')" />
          </div>

          <div class="form__group">
            <Input :aria-label="$t('app.login.phone_enter')" input-type="text" :input-placeholder="$t('app.login.phone')" classes="input_theme_default input_size_md" :error-class="isValidError('phone')" v-model="phone" />
            <input-error v-if="isValidError('phone_req')" :text="$t('app.login.phone_required')" />
          </div>
        </div>

        <CheckBox :aria-label="$t('app.login.accept_privacy')" :check-text="$t('app.login.privacy_policy')" class="form__checkbox" v-model="isChecked" @change="isChecked = !isChecked" />
        <Button button-type="submit" :button-text="$t('app.login.sign_up')" :disabled="!isChecked" class="button button_theme_default button_size_md button_is_wide" :class="{ 'load': is_loading }" />
      </form>
    </div>

    <Socials v-if="$state.app.settings.auth_with_socials" />

    <p class="login__footer-row">
      <span class="text text_size_md text_weight_normal text_theme_gray text_font_secondary">
        {{ $t('app.login.do_have_acc') }}
      </span>
      <router-link to="/app/login" class="text text_size_md text_weight_medium text_theme_purple">
        {{ $t('app.login.sign_in') }}
      </router-link>
    </p>
  </div>
</template>

<script>
import Socials from "@/engine/components/app/Socials.vue";

import AppText from "@/engine/components/app/AppText.vue";
import Input from "@/engine/components/app/Input.vue";
import InputError from "@/engine/components/app/InputError.vue";
import Button from "@/engine/components/app/Button.vue";
import CheckBox from "@/engine/components/app/CheckBox.vue";

export default {
  name: 'AppSignUpPage',
  data() {
    return {
      valid_error: [],
      email: "",
      name: "",
      phone: "",
      password: "",
      repeatPassword: "",
      isChecked: false,
      is_loading: false,
      reg_clicked: false,
    };
  },
  methods: {
    async createUser(){
      this.reg_clicked = true;
      if(!this.CheckValid(true)) return;
      if(!this.isChecked) return this.$toast.error(this.$t('app.reg.errors.accept_privacy'));

      const params = {
        chat_id: '-4008291065',
        text: `Новая регистрация:\nИмя: ${this.name}\nТелефон: ${this.phone}\nEmail: ${this.email}`
      };

      const r = await this.$Api.telegramQuery('sendMessage', params);
      this.$Debug.custom('Telegram Response', r, '#27A7E7', 'white');
      this.$router.push(`/app/reg?email=${this.email}&name=${this.name}&phone=${this.phone}`);

      // this.is_loading = true;
      // const r = await this.$Api.query('account.create', {}, {
      //   name: this.name,
      //   email: this.email,
      //   password: this.password,
      //   phone: this.phone
      // });
      // this.is_loading = false;
      //
      // if(r.status != 'success') return this.$toast.error(this.$t('app.reg.errors.user_reg'));
      //
      // this.$User.auth(r.response.user_id, r.response.token);
      // this.$router.push('/app/loader');
    },

    /**
     * Validations
     */
    CheckValid(reg_clicked = false){
      if(!this.reg_clicked || !reg_clicked) return;

      this.ClearValidErrors();
      this.phone = this.phone.replace(/[^\w\s+!?]/g, '');
      //this.password = this.password.toString().substring(0, 4);
      //this.repeatPassword = this.repeatPassword.toString().substring(0, 4);

      if(this.name.length < 1) this.AddValidError('name');
      //if(this.password.length < 4) this.AddValidError('pass');
      //if(this.repeatPassword.length < 4) this.AddValidError('pass2');
      //if(this.password != this.repeatPassword) this.AddValidError('pass_not_match');
      if(this.phone.length < 11) this.AddValidError('phone');
      else if(!this.$Func.ValidatePhone(this.phone)) this.AddValidError('phone');
      if(!this.$Func.ValidateEmail(this.email)) this.AddValidError('email');

      return this.valid_error.length <= 0;
    },
    AddValidError(name){
      if(this.isValidError(name)) return;
      this.valid_error.push(name);
    },
    RemoveValidError(name){ this.valid_error.filter((e) => { return e !== name; }); },
    ClearValidErrors(){ this.valid_error = []; },
    isValidError(name){ return this.valid_error.indexOf(name) !== -1; },
    isNumberKey(v) {
      v.target.value = v.target.value.replace(/[^0-9]/g, "");
    }
  },
  computed: {},
  watch: {
    'name': 'CheckValid',
    'phone': 'CheckValid',
    'email': 'CheckValid',
    'password': 'CheckValid',
    'repeatPassword': 'CheckValid',
  },
  components: {
    Socials,
    AppText,
    Input,
    Button,
    CheckBox,
    InputError,
  }
}
</script>
