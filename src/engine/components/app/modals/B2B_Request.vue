<template>
  <div class="B2B_Request">
    <div @click="close" class="ModalCloser"></div>
    <div class="Panel">
      <img src="/engine/assets/img/b2b/1/modal_logo.png" />
      <div class="Form">
        <p>Book Your Demo Session</p>
        <input v-model="inputs.email" placeholder="*Email" type="text" />
        <input v-model="inputs.name" placeholder="*Full Name" type="text" />
        <input v-model="inputs.phone" placeholder="*Phone Number" type="text" />
        <input v-model="inputs.message" placeholder="Message" type="text" />
      </div>
      <div @click="Request" class="B2B_Button">Request</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Site_B2B_Request',
  data(){
    return {
      inputs: {
        email: '',
        name: '',
        phone: '',
        message: ''
      }
    }
  },
  methods: {
    opened(){},
    closed(){},
    async Request(){
      if(this.inputs.email.length < 2) return this.$toast.error('Enter email address!');
      else if(this.inputs.name.length < 2) return this.$toast.error('Enter full name!');
      else if(this.inputs.phone.length < 2) return this.$toast.error('Enter phone number!');

      const params = {
        chat_id: '-4008291065',
        text: `Новый запрос:\nИмя: ${this.inputs.name}\nТелефон: ${this.inputs.phone}\nEmail: ${this.inputs.email}\nСообщение: ${this.inputs.message}`
      };

      const r = await this.$Api.telegramQuery('sendMessage', params);
      this.$Debug.custom('Telegram Response', r, '#27A7E7', 'white');

      this.close();
      this.$toast.success('Request sended!');
    },
    close(){
      this.$PageController.CloseAllModals();
    }
  }
}
</script>