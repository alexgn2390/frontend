<template>
  <div class="container login">
    <div class="CodeContainer">
      <div class="CodeHeader">
        <BaseIcon @click="Back" width="32" height="32" view-box="0 0 24 24" fill="none">
          <IconBackArrow />
        </BaseIcon>
      </div>

      <div class="CodeContent">
        <div class="CodeTitle">{{ $t(`app.reg.state${state}_title`) }}</div>
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
  </div>
</template>

<script>
import BaseIcon from "@/engine/components/app/BaseIcon.vue";
import IconBackArrow from "@/engine/components/app/icons/IconBackArrow.vue";

export default {
  name: 'AppRegPage',
  data() {
    return {
      state: 0,
      is_error: false,
      is_loading: false,
      name: "",
      email: "",
      phone: "",
      password: "",
      password_confirm: ""
    };
  },
  methods: {
    async reg(){
      if(this.password.length < 4 || this.is_loading) return;
      
      this.is_loading = true;
      const r = await this.$Api.query('account.create', {}, {
        name: this.name,
        email: this.email,
        password: this.password,
        phone: this.phone
      });
      this.is_loading = false;

      if(r.status == 'success'){
        this.$User.auth(r.response.user_id, r.response.token);
        // Redirect to AI Coach for onboarding
        this.$router.push('/app/ai-coach?onboarding=true');
      } else {
        this.is_error = true;
        setTimeout(() => { this.is_error = false; }, 400);
        this.$toast.error(this.$t('app.reg.errors.user_reg'));
      }
    },
    async add(e){
      if(this.is_error || this.is_loading) return;

      if(this.state == 0) {
        if(this.password.length >= 4) return;
        this.password += e;

        if(this.password.length >= 4) this.state = 1;
      } else {
        if(this.password_confirm.length >= 4) return;
        this.password_confirm += e;

        if(this.password_confirm.length >= 4){
          if(this.password != this.password_confirm){
            this.is_error = true;
            this.state = 0;
            this.password = '';
            this.password_confirm = '';
            setTimeout(() => { this.is_error = false; }, 400);
            return;
          }

          await this.reg();
        }
      }
    },
    Back(){
      if(this.state != 0) {
        this.state--;
        this.password = '';
        this.password_confirm = '';
      } else this.$router.go(-1);
    },
  },
  async mounted(){
    if(!this.$route.query.name || !this.$route.query.email || !this.$route.query.phone) this.$router.push('/app');
    this.name = this.$route.query.name;
    this.email = this.$route.query.email;
    this.phone = this.$route.query.phone;
  },
  computed: {
    getActivePassword(){
      if(this.state == 1) return this.password_confirm;
      return this.password;
    }
  },
  components: {
    BaseIcon,
    IconBackArrow
  }
}
</script>
