import { reactive } from 'vue'

export default reactive({
  is_error: false,
  is_loading: true,
  api_loading: false,
  page_loading: true,
  site_unavailable: false,
  server_unavailable: false,
  session_unavailable: false,

  axios: null,
  $event: null,
  $route: null,
  $router: null,
  $t: null,

  platform: {
    name: "web",
    mode: "desktop",
    view_mode: "desktop",
  },
  user_settings: {
    theme: "light",
    language: "ru",
  },
  page_state: {
    width: 0,
    height: 0,
    min_width: 280,
    min_height: 360,
    active: 'Main',
    title: 'Main Page',
    icon: '/engine/assets/ico/logo.png'
  },

  app: {
    active: false,
    hide_ui: false,
    show_nav: false,
    modal: {
      id: '',
      blocked: [],
      query: {}
    },
    settings: {
      auth_with_socials: false
    }
  },

  temp: {
    done: {},
    session_is_done: false
  }
})