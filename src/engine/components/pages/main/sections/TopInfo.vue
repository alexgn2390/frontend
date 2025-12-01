<template>
  <section class="TopInfo">
    <img class="TopInfo_Background" src="/engine/assets/img/index/top-pattern.png">
    <div class="TopInfo_Content">
      <div class="TopInfo_Body">
        <div class="TopInfo_Left">
          <p class="TopInfo_Text">{{ $t('pages.main.personal_trainer', [55]) }}</p>
          <h1 id="top_info_title" class="TopInfo_Title" v-html="$t('pages.main.title')"></h1>
          <div class="TopInfo_Wrapper">
            <p class="TopInfo_Text" v-html="$t('pages.main.info_1')"></p>
            <p class="TopInfo_Text">{{ $t('pages.main.info_2') }}</p>
            <p class="TopInfo_Text">{{ $t('pages.main.info_3') }}</p>
          </div>
          <div v-if="$vm.isMobile()" @click="KickStart" class="TopInfo_Button">{{ $t('pages.main.btn_kickstart') }}</div>
        </div>
        <div class="TopInfo_Right">
          <img class="TopInfo_Image" src="/engine/assets/img/index/grandfather.png">
          <div id="start_frame" class="TopInfo_Frame">
            <img class="Frame_Arrow" src="/engine/assets/img/index/arrow.png">
            <div class="Frame_Content">
              <p class="Frame_Text">{{ $t('pages.main.full_name') }}</p>
              <input class="Frame_Input" type="text" ref="full_name" v-model="inputs.full_name" :class="{ 'error': isValidError('name') }" />
              <p class="Frame_Text">{{ $t('pages.main.phone_number') }}</p>
              <input class="Frame_Input" type="text" ref="phone_number" v-model="inputs.phone_number" :class="{ 'error': isValidError('phone') }" />
              <p class="Frame_Text">{{ $t('pages.main.email_address') }}</p>
              <input class="Frame_Input" type="text" ref="email_address" v-model="inputs.email_address" :class="{ 'error': isValidError('email') }" />
              <div @click="SignUp" class="Frame_Button"><p>{{ $t('pages.main.btn_sign_up') }}</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TopInfoSection',
  data(){
    return {
      valid_error: [],
      inputs: {
        full_name: '',
        phone_number: '',
        email_address: '',
      }
    }
  },
  methods: {
    KickStart(){
      this.$Func.GoToFrame(this);
    },
    async SignUp(){
      if(!this.CheckValid()) return;

      const params = {
        chat_id: '-4008291065',
        text: `Новая регистрация:\nИмя: ${this.inputs.full_name}\nТелефон: ${this.inputs.phone_number}\nEmail: ${this.inputs.email_address}`
      };

      const r = await this.$Api.telegramQuery('sendMessage', params);
      this.$Debug.custom('Telegram Response', r, '#27A7E7', 'white');
      this.$router.push(`/app/reg?email=${this.inputs.email_address}&name=${this.inputs.full_name}&phone=${this.inputs.phone_number}`);

      this.$Debug.message('Благодарим! Ваша заявка принята, мы свяжемся с Вами в ближайшее время!');
      window.location = `http://localhost:8080/app/reg?email=${this.inputs.email_address}&name=${this.inputs.full_name}&phone=${this.inputs.phone_number}`;
      // window.location = `https://app.nfitnity.com/reg?email=${this.inputs.email_address}&name=${this.inputs.full_name}&phone=${this.inputs.phone_number}`;
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
}
</script>

<style lang="scss" scoped>
</style>
