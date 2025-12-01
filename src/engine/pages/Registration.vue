<template>
  <div class="Registration">
    <div class="RegistrationContent">
      <div class="RC_Header">
        <div class="HeaderLogo" style="background-image: url(/engine/assets/ico/logo-full.png);"></div>
      </div>
      <div class="RC_Body">
        <h1 class="Title" v-html="$t('pages.reg.title')"></h1>
        <section class="Info">
          <div class="InfoLeft">
            <div class="InfoCard">
              <img class="InfoCard_Icon" src="/engine/assets/img/reg/personal.png">
              <div class="InfoCard_Text">{{ $t('pages.reg.info_1') }}</div>
            </div>
            <div class="InfoCard">
              <img class="InfoCard_Icon" src="/engine/assets/img/reg/safe.png">
              <div class="InfoCard_Text">{{ $t('pages.reg.info_2') }}</div>
            </div>
          </div>
          <div class="InfoRight">
            <div class="InfoCard">
              <img class="InfoCard_Icon" src="/engine/assets/img/reg/video.png">
              <div class="InfoCard_Text">{{ $t('pages.reg.info_3') }}</div>
            </div>
            <div class="InfoCard">
              <img class="InfoCard_Icon" src="/engine/assets/img/reg/text.png">
              <div class="InfoCard_Text">{{ $t('pages.reg.info_4') }}</div>
            </div>
          </div>
        </section>
        <section class="Frame">
          <input class="Frame_Input" type="text" ref="full_name" v-model="inputs.full_name" :placeholder="$t('pages.main.full_name')" :class="{ 'error': isValidError('name') }" />
          <input class="Frame_Input" type="text" ref="email_address" v-model="inputs.email_address" :placeholder="$t('pages.main.email_address')" :class="{ 'error': isValidError('email') }"/>
          <input class="Frame_Input" type="text" ref="phone_number" v-model="inputs.phone_number" :placeholder="$t('pages.main.phone_number')" :class="{ 'error': isValidError('phone') }"/>
          <div @click="Submit" class="Frame_Button"><p>{{ $t('pages.reg.submit') }}</p></div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'RegistrationPage',
  data() {
    return {
      valid_error: [],
      inputs: {
        full_name: '',
        phone_number: '',
        email_address: '',
      }
    }
  },
  async created(){
    this.$PageController.pageSettings('Registration', 'p_reg');
  },
  methods: {
    async Submit(){
      if(!this.CheckValid()) return;

      const params = {
        chat_id: '-4008291065',
        text: `Новая регистрация:\nИмя: ${this.inputs.full_name}\nТелефон: ${this.inputs.phone_number}\nEmail: ${this.inputs.email_address}`
      };

      const r = await this.$Api.telegramQuery('sendMessage', params);
      this.$Debug.custom('Telegram Response', r, '#27A7E7', 'white');
      this.$router.push(`/app/reg?email=${this.inputs.email_address}&name=${this.inputs.full_name}&phone=${this.inputs.phone_number}`);
      
      //this.$Debug.message('Благодарим! Ваша заявка принята, мы свяжемся с Вами в ближайшее время!');
      //window.location = `https://app.nfitnity.com/reg?email=${this.inputs.email_address}&name=${this.inputs.full_name}&phone=${this.inputs.phone_number}`;
    },

    /**
     * Validations
     */
    CheckValid(){
      this.ClearValidErrors();
      this.inputs.phone_number = this.inputs.phone_number.replace(/[^\w\s+!?]/g, '');

      if(this.inputs.full_name.length < 1) this.AddValidError('name');
      if(this.inputs.phone_number.length < 11) this.AddValidError('phone');
      else if(!this.$Func.ValidatePhone(this.inputs.phone_number)) this.AddValidError('phone');
      if(!this.$Func.ValidateEmail(this.inputs.email_address)) this.AddValidError('email');
      
      return this.valid_error.length <= 0;
    },
    AddValidError(name){
      if(this.isValidError(name)) return;
      this.valid_error.push(name);
    },
    RemoveValidError(name){ this.valid_error.filter((e) => { return e !== name; }); },
    ClearValidErrors(){ this.valid_error = []; },
    isValidError(name){ return this.valid_error.indexOf(name) !== -1; }
  },
  watch: {
    'inputs.full_name': 'CheckValid',
    'inputs.phone_number': 'CheckValid',
    'inputs.email_address': 'CheckValid',
  },
  mounted(){ this.$PageController.pageMounted(); },
  beforeUnmount(){ this.$PageController.pageUnmounted(); },
  components: {
    
  }
}
</script>

<style lang="scss" scoped>

</style>