import { reactive } from 'vue'

export default reactive({
  is_app: true,
  domains: {
    https: false,
    wss: false,
    host: window.location.host,
    domain: (process.env.NODE_ENV === 'development') ? "localhost:8081" : "nfitnity.com",
    // domain: (process.env.NODE_ENV === 'development') ? "localhost:8080" : "nfitnity.com",
    // api: "api.nfitnity.com"
    api: "localhost:8081"
  },
  api_data: {
    session_id: '',
    client: '',
    client_id: 0,
    client_key: '',
    api_version: "1.0",
    telegram: {
      bot_id: 6674486527,
      // bot_token: 'AAGOtxtKkb5fisDEBcrjlsvom7sX_lHV3xo'
      bot_token: ''
    }
  },
  debug: {
    enabled: true,
    render_log: false,
    page_state: false,
    api_log: false,
    api_error: true,
    modal_log: false,
  },
  router: {
    AllowUnAuthed: ['/', '/corporate', '/corporate/health', '/registration', '/get', '/app/login', '/app/forgot', '/app/signup', '/app/code', '/app/params', '/app/welcome', '/app/reg'],
    OnlyUnAuthed: ['/app/login', '/app/forgot', '/app/signup', '/app/welcome', '/app/reg'],
    NoLoadScreen: ['/app/logout'],
  },
  locale: {
    translit: {
      cyrillic: ['ru', 'kz', 'ua', 'by'],
      latin: ['en', 'kz-latin', 'de']
    }
  }
})
