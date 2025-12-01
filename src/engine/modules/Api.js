import config from '@/config.js'
import state from '@/state.js'
import Debug from '@/engine/modules/Debug.js'
import Storage from '@/engine/modules/Storage.js'

export default {
  name: 'Api',
  async created(){

  },
  getApiBody(params, files = null){
    const bodyFormData = new FormData();
    for(const [key, value] of Object.entries(params)) bodyFormData.append(key, value);

    if(files){
      for(const [key, values] of Object.entries(files)){
        values.forEach(value => {
          if(typeof value.name != 'undefined') bodyFormData.append(key, value.data, value.name);
          else bodyFormData.append(key, value.data);
        });
      }
    }

    if(Storage.is('access_token')) bodyFormData.append('access_token', Storage.get('access_token', true));
    return bodyFormData;
  },
  getApiLink(method, params = null){
    const https = config.domains.https ? "http" : "http";
    // const https = config.domains.https ? "https" : "http";
    const link = `${https}://${config.domains.api}`;

    if(!params) return `${link}/${method}`;
    // if(!params) return `${link}/methods/${method}`;
    let httpParams = "?";

    for(const [key, value] of Object.entries(params)){
      let httpValue = "";

      if(Array.isArray(value)){
        for(const val of value) httpValue += (val != "") ? `${val},` : "";
        httpValue = httpValue.substring(0, httpValue.length - 1);
      } else httpValue = value;

      httpParams += `${key}=${httpValue}&`;
    }

    httpParams = httpParams.substring(0, httpParams.length - 1);
    return `${link}/${method}${httpParams}`;
    // return `${link}/methods/${method}${httpParams}`;
  },
  async query(method, get_params, post_params, full_response = false){
    state.is_loading = true;
    state.api_loading = true;

    let cfg = {
      method: 'post',
      url: this.getApiLink(method, get_params),
      timeout: 30000,
      responseType: 'json',
      data: post_params
    };

    if(Storage.is('access_token')) cfg.headers = { Authorization: `Bearer ${Storage.get('access_token', true)}` };

    return await state.axios(cfg)
    .then((response) => {
      state.is_loading = false;
      state.api_loading = false;
      return full_response ? response : response.data;
    })
    .catch((error) => {
      state.is_loading = false;
      state.api_loading = false;
      if(config.debug.api_error) Debug.error('Api / Query', error);
      return { status: 'server_error', error: error };
    });
  },
  getTelegramApiLink(method, bot_id = null, bot_token = false){
    if(!bot_id) bot_id = config.api_data.telegram.bot_id;
    if(!bot_token) bot_token = config.api_data.telegram.bot_token;
    return `https://api.telegram.org/bot${bot_id}:${bot_token}/${method}`;
  },
  async telegramQuery(method, params, full_response = false){
    state.is_loading = true;
    state.api_loading = true;

    return await state.axios({
      method: 'post',
      url: this.getTelegramApiLink(method),
      timeout: 30000,
      responseType: 'json',
      data: this.getApiBody(params)
    })
    .then((response) => {
      state.is_loading = false;
      state.api_loading = false;
      return full_response ? response : response.data;
    })
    .catch((error) => {
      state.is_loading = false;
      state.api_loading = false;
      if(config.debug.api_error) Debug.error('Api / TG', error);
      return { status: 'server_error', error: error };
    });
  },


  
  async get(method){
    state.is_loading = true;
    state.api_loading = true;

    return await state.axios({
      method: 'get',
      url: this.getApiLink(method),
      timeout: 30000,
      responseType: 'json'
    })
    .then((response) => {
      state.is_loading = false;
      state.api_loading = false;
      return response.data;
    })
    .catch((error) => {
      state.is_loading = false;
      state.api_loading = false;
      if(config.debug.api_error) Debug.error('Api / Get', error);
      return { status: 'server_error', error: error };
    });
  },
  async post(method, data){
    state.is_loading = true;
    state.api_loading = true;

    return await state.axios({
      method: 'post',
      url: this.getApiLink(method),
      timeout: 30000,
      responseType: 'json',
      data: this.getApiBody(data)
    })
    .then((response) => {
      state.is_loading = false;
      state.api_loading = false;
      return response.data;
    })
    .catch((error) => {
      state.is_loading = false;
      state.api_loading = false;
      if(config.debug.api_error) Debug.error('Api / Post', error);
      return { status: 'server_error', error: error };
    });
  },
}
