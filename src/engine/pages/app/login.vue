<template>
  <div v-if="state == 0" class="container login login_type_default">
    <div class="login__head">
      <AppText tag="h2" classes="text_size_xl text_weight_semibold text_theme_dark login__text" text="Sign In" />
      <form class="form login__form" @submit.prevent="next">
        <div class="form__inputs">
          <div class="form__group">
            <Input :aria-label="$t('app.login.enter_email')" input-type="text" :input-placeholder="$t('app.login.email')" classes="input_theme_default input_size_md" :error-class="!CheckEmailValid" v-model="email_or_phone" />
            <InputError v-if="!CheckEmailValid" :text="$t('app.login.email_required')" />
          </div>
          <!--div class="form__group">
            <Input :aria-label="$t('app.login.enter_pass')" input-type="password" :input-placeholder="$t('app.login.pass')" classes="input_theme_default input_size_md" :error-class="true" v-model="password" />
            <InputError v-if="true" :text="$t('app.login.pass_required')" />
            <InputError v-if="true" :text="$t('app.login.pass_have')" />
          </div-->
        </div>

        <Button button-type="submit" :button-text="$t('app.login.next')" class="button button_theme_default button_size_md button_is_wide" :class="{ 'load': is_loading }" />
        <!--Button @click="test" style="margin-top: 10px;" button-text="Test modal" class="button button_theme_default button_size_md button_is_wide" /-->
      </form>
      <router-link to="/app/forgot" class="text text_size_md text_weight_medium text_theme_gray login__text">
        {{ $t('app.login.forgot_password') }}
      </router-link>
    </div>

    <Socials v-if="$state.app.settings.auth_with_socials" />

    <p class="login__footer-row">
      <span class="text text_size_md text_weight_normal text_theme_gray text_font_secondary">
        {{ $t('app.login.dont_have_acc') }}
      </span>
      <router-link to="/app/signup" class="text text_size_md text_weight_medium text_theme_purple">
        {{ $t('app.login.sign_up') }}
      </router-link>
    </p>
  </div>
  
  <div v-else-if="state == 1" class="container login">
    <div class="CodeContainer">
      <div class="CodeHeader">
        <BaseIcon @click="Back" width="32" height="32" view-box="0 0 24 24" fill="none">
          <IconBackArrow />
        </BaseIcon>
      </div>

      <div class="CodeContent">
        <div class="CodeTitle">{{ $t('app.login.state1_title') }}</div>
        <div class="CodePanel">
          <div class="CodePanel_Text">{{ $t('app.login.enter_code') }}</div>
          <div class="CodePanel_Elipses" :class="{ error: is_error }">
            <div class="CodeElipse" :class="{ active: password.length >= 1 }"></div>
            <div class="CodeElipse" :class="{ active: password.length >= 2 }"></div>
            <div class="CodeElipse" :class="{ active: password.length >= 3 }"></div>
            <div class="CodeElipse" :class="{ active: password.length >= 4 }"></div>
          </div>
        </div>
      </div>
      <div class="Buttons">
        <div class="Buttons_Line">
          <div @click="add(1)" class="Button">1</div>
          <div @click="add(2)" class="Button">2</div>
          <div @click="add(3)" class="Button">3</div>
        </div>
        <div class="Buttons_Line">
          <div @click="add(4)" class="Button">4</div>
          <div @click="add(5)" class="Button">5</div>
          <div @click="add(6)" class="Button">6</div>
        </div>
        <div class="Buttons_Line">
          <div @click="add(7)" class="Button">7</div>
          <div @click="add(8)" class="Button">8</div>
          <div @click="add(9)" class="Button">9</div>
        </div>
        <div class="Buttons_Line">
          <div class="Button hidden"></div>
          <div @click="add(0)" class="Button">0</div>
          <div class="Button hidden"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseIcon from "@/engine/components/app/BaseIcon.vue";
import IconBackArrow from "@/engine/components/app/icons/IconBackArrow.vue";
import Socials from "@/engine/components/app/Socials.vue";

import AppText from "@/engine/components/app/AppText.vue";
import Input from "@/engine/components/app/Input.vue";
import InputError from "@/engine/components/app/InputError.vue";
import Button from "@/engine/components/app/Button.vue";

export default {
  name: 'AppLoginPage',
  data() {
    return {
      state: 0,
      is_error: false,
      is_loading: false,
      email_or_phone: "",
      password: ""
    };
  },
  methods: {
    async next(){
      if(!this.CheckEmailValid || this.is_loading) return;
      this.is_loading = true;
      const r = await this.$Api.query('account.find', {}, { email_or_phone: this.email_or_phone });
      this.is_loading = false;

      if(r.status == 'success') this.state = 1;
      else this.$toast.error('User is not found');
    },
    async auth(){
      if(this.is_loading) return;
      this.is_loading = true;
      const r = await this.$Api.query('account.auth', {}, { email: this.email_or_phone, password: this.password });
      this.is_loading = false;

      if(r.status == 'success'){
        this.$User.auth(r.response.user_id, r.response.token);
        this.$router.push('/app');
      } else {
        this.is_error = true;

        setTimeout(() => {
          this.is_error = false;
        }, 400);
      }
    },
    async add(e){
      if(this.password.length >= 4 || this.is_error || this.is_loading) return;

      this.password += e;

      if(this.password.length >= 4){
        await this.auth();
        this.password = '';
      }
    },
    clear(){
      this.password = '';
    },
    Back(){
      if(this.state != 0) this.state--;
      else this.$router.go(-1);
    },
  },
  async mounted(){
    
  },
  computed: {
    CheckEmailValid(){
      if(this.email_or_phone.length <= 0) return false;
      if(!this.$Func.ValidateEmail(this.email_or_phone) && !this.$Func.ValidatePhone(this.email_or_phone)) return false;
      return true;
    },
  },
  components: {
    BaseIcon,
    IconBackArrow,
    Socials,
    AppText,
    Input,
    InputError,
    Button,
  }
}
</script>
