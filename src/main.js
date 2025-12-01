/* Packages */
import { createApp } from 'vue'
import mitt from 'mitt'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css'
import VueMobileDetection from "vue-mobile-detection"
import VueScrollTo from 'vue-scrollto'
import Vue3ColorPicker from "vue3-colorpicker"
import "vue3-colorpicker/style.css"
import DatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import MultiSelect from '@vueform/multiselect'
import Vue3Marquee from 'vue3-marquee'
import VueSlider from "vue3-slider"
import Vue3Toastify from 'vue3-toastify'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import CheckBox from '@/engine/components/controls/CheckBox.vue'
import SwitchButton from '@/engine/components/controls/Switcher.vue'

/* Modules */
import config from '@/config.js'
import state from '@/state.js'
import user from '@/userdata.js'

import '@/engine/modules/ServiceWorker'
import Router from '@/engine/modules/Router.js'
import PageController from '@/engine/modules/PageController.js'
import Language from '@/engine/modules/Language.js'
import Functions from '@/engine/modules/Functions.js'
import Storage from '@/engine/modules/Storage.js'
import Device from '@/engine/modules/Device.js'
import Notify from '@/engine/modules/Notify.js'
import Debug from '@/engine/modules/Debug.js'
import User from '@/engine/modules/User.js'
import Api from '@/engine/modules/Api.js'

/* Apps */
import App from '@/App.vue'

/* App Init */
const app = createApp(App);
app.use(Router.setup());
app.use(Language.setup());
app.use(VueAxios, axios);
app.use(VueMobileDetection);
app.use(Vue3Marquee);
app.use(Vue3ColorPicker);
app.component('VueSlider', VueSlider);
app.component('DatePicker', DatePicker);
app.component('MultiSelect', MultiSelect);
app.component('CheckBox', CheckBox);
app.component('SwitchButton', SwitchButton);
app.use(Vue3Toastify, {
  autoClose: 3000,
  position: toast.POSITION.BOTTOM_CENTER,
});
app.use(VueTippy, {
	directive: 'tippy', // => v-tippy
	component: 'tippy', // => <tippy/>
	componentSingleton: 'tippy-singleton', // => <tippy-singleton/>,
	defaultProps: {
		placement: 'bottom',
		allowHTML: true,
	},
});
app.use(VueScrollTo, {
	container: "body",
	duration: 500,
	easing: "ease",
	offset: -50,
	force: true,
	cancelable: true,
	onStart: false,
	onDone: false,
	onCancel: false,
	x: false,
	y: true
});

/* Global Properties */
let isDesktop = Device.isDesktop;
let isTablet = Device.isTablet;
let isMobile = Device.isMobile;

app.config.globalProperties.$config = config;
app.config.globalProperties.$state = state;
app.config.globalProperties.$user = user;
app.config.globalProperties.$PageController = PageController;
app.config.globalProperties.$Api = Api;
app.config.globalProperties.$User = User;
app.config.globalProperties.$Debug = Debug;
app.config.globalProperties.$Device = Device;
app.config.globalProperties.$Notify = Notify;
app.config.globalProperties.$Storage = Storage;
app.config.globalProperties.$Func = Functions;
app.config.globalProperties.$Lang = Language;
app.config.globalProperties.$Router = Router;
app.config.globalProperties.$vm = { isDesktop, isTablet, isMobile };
app.config.globalProperties.$event = mitt();
app.config.globalProperties.$toast = toast;

/* Window */
if(process.env.NODE_ENV === 'development'){
  window.modules = app.config.globalProperties;
  window.state = window.modules.$state;
}

app.mount('#app');