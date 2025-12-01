<template>
  <div class="container login login_type_center">
    <div v-if="state != 4" class="login__back">
      <BaseIcon @click="Back" width="32" height="32" view-box="0 0 24 24" fill="none">
        <IconBackArrow />
      </BaseIcon>
    </div>

    <div v-if="state == 0" class="login__head">
      <AppText tag="h2" classes="text_size_xl text_weight_semibold text_theme_dark login__text" :text="$t('app.forgot.title')" />
      <form class="form login__form" @submit.prevent="sendCode">
        <div class="login__forgot">
          <Input v-model="email" :aria-label="$t('app.login.enter_email')" input-type="text" :input-placeholder="$t('app.login.email')" :error-class="!ValidateEmail" classes="input_theme_default input_size_md" />
          <p class="text text_theme_textgray text_size_sm text_font_secondary text_weight_normal login__forgot-text">
            <span>{{ $t('app.forgot.email_text') }}</span>
            <span>{{ $t('app.forgot.pass_text') }}</span>
          </p>
        </div>

        <Button button-type="submit" :button-text="$t('app.forgot.btn_next')" class="button button_theme_default button_size_md button_is_wide" :class="{ 'load': is_loading }" />
      </form>
    </div>
    <div v-else-if="state == 1" class="login__head">
      <AppText tag="h2" classes="text_size_xl text_weight_semibold text_theme_dark login__text" :text="$t('app.forgot.title')" />
      <form class="form login__form" @submit.prevent="checkCode">
        <div class="login__forgot">
          <Input v-model="code" :aria-label="$t('app.forgot.enter_code')" input-type="text" :input-placeholder="$t('app.forgot.code')" :error-class="!ValidateCode" classes="input_theme_default input_size_md" />
          <p class="text text_theme_textgray text_size_sm text_font_secondary text_weight_normal login__forgot-text">
            <span>{{ $t('app.forgot.code_text') }} <a @click="sendCode">{{ $t('app.forgot.resend') }}</a></span>
          </p>
        </div>

        <Button button-type="submit" :button-text="$t('app.forgot.btn_next')" class="button button_theme_default button_size_md button_is_wide" :class="{ 'load': is_loading }" />
      </form>
    </div>
    <div v-else-if="state == 2 || state == 3" class="CodeContainer">
      <div class="CodeContent">
        <div class="CodeTitle">{{ $t(`app.reg.state${state - 2}_title`) }}</div>
        <div class="CodePanel">
          <div class="CodePanel_Text">{{ $t('app.reg.enter_code') }}</div>
          <div class="CodePanel_Elipses" :class="{ error: is_error }">
            <div class="CodeElipse" :class="{ active: getActivePassword.length >= 1 }"></div>
            <div class="CodeElipse" :class="{ active: getActivePassword.length >= 2 }"></div>
            <div class="CodeElipse" :class="{ active: getActivePassword.length >= 3 }"></div>
            <div class="CodeElipse" :class="{ active: getActivePassword.length >= 4 }"></div>
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
    <div v-else class="container loader__content">
      <AppText tag="h2" classes="text_theme_dark text_size_xl text_weight_semibold loader__title" :text="$t('app.forgot.loader')" />

      <div class="loader__circle">
        <svg class="loader__circle-icon" :style="{ '--percent': progress }">
          <circle cx="132" cy="132" r="132"></circle>
          <circle cx="132" cy="132" r="132"></circle>
        </svg>
        <span class="loader__circle-text">{{ progress }} %</span>
      </div>
    </div>
  </div>
</template>

<script>
import BaseIcon from "@/engine/components/app/BaseIcon.vue";
import IconBackArrow from "@/engine/components/app/icons/IconBackArrow.vue";
import AppText from "@/engine/components/app/AppText.vue";
import Input from "@/engine/components/app/Input.vue";
import Button from "@/engine/components/app/Button.vue";

export default {
  name: 'AppForgotPage',
  data(){
    return {
      state: 0,
      is_error: false,
      is_loading: false,
      email: '',
      code: '',
      password: '',
      password_confirm: '',
      interval: null,
      progress: 0,
      tick: null,
      send_delay: 3
    }
  },
  methods: {
    async sendCode(){
      if(!this.ValidateEmail || this.is_loading) return;
      if(this.send_delay > 0) return this.$toast.error(this.$t('app.forgot.errors.send_delay', [this.send_delay]));

      this.is_loading = true;
      const r = await this.$Api.query('account.forgot', {}, { email: this.email });
      this.send_delay = 60;
      this.is_loading = false;

      if(r.status == 'success' && r.response){
        this.state = 1;
      } else {
        this.is_error = true;
        setTimeout(() => { this.is_error = false; }, 400);
        this.$toast.error(this.$t('app.forgot.errors.invalid_email'));
      }
    },
    async checkCode(){
      if(!this.ValidateCode || this.is_loading) return;
      
      this.is_loading = true;
      const r = await this.$Api.query('account.checkCode', {}, { email: this.email, code: this.code });
      this.is_loading = false;

      if(r.status == 'success' && r.response){
        this.state = 2;
      } else {
        this.is_error = true;
        setTimeout(() => { this.is_error = false; }, 400);
        this.$toast.error(this.$t('app.forgot.errors.invalid_code'));
      }
    },
    async restoreAccount(){
      if(!this.ValidatePassword || this.is_loading) return;

      this.is_loading = true;
      const r = await this.$Api.query('account.restore', {}, { email: this.email, code: this.code, password: this.password });
      this.is_loading = false;

      if(r.status == 'success' && r.response){
        this.Finish();
      } else {
        this.is_error = true;
        setTimeout(() => { this.is_error = false; }, 400);
        this.$toast.error(this.$t('app.forgot.errors.invalid_code'));
      }
    },
    async add(e){
      if(this.is_error || this.is_loading) return;

      if(this.state == 2) {
        if(this.password.length >= 4) return;
        this.password += e;

        if(this.password.length >= 4) this.state = 3;
      } else if(this.state == 3) {
        if(this.password_confirm.length >= 4) return;
        this.password_confirm += e;

        if(this.password_confirm.length >= 4){
          if(this.password != this.password_confirm){
            this.is_error = true;
            this.state = 2;
            this.password = '';
            this.password_confirm = '';
            setTimeout(() => { this.is_error = false; }, 400);
            return;
          }

          await this.restoreAccount();
        }
      }
    },
    Finish(){
      this.state = 4;
      this.interval = setInterval(() => {
        if(this.progress === 100){
          clearInterval(this.interval);
          this.$router.push('/app/login');
          return
        }

        this.progress += 1;
      }, 15);
    },
    Back(){
      if(this.state != 0){
        this.state--;
        this.code = '';
        this.password = '';
      } else this.$router.go(-1);
    },
  },
  computed: {
    ValidateEmail(){
      return this.$Func.ValidateEmail(this.email);
    },
    ValidateCode(){
      return this.code.length == 4;
    },
    ValidatePassword(){
      return this.password.length == 4;
    },
    getActivePassword(){
      if(this.state == 3) return this.password_confirm;
      return this.password;
    }
  },
  mounted(){
    this.tick = setInterval(() => {
      if(this.send_delay > 0) this.send_delay--;
    }, 1000);
  },
  beforeUnmount(){
    clearInterval(this.tick);
    clearInterval(this.interval);
  },
  components: {
    AppText,
    Input,
    Button,
    BaseIcon,
    IconBackArrow
  }
}
</script>
