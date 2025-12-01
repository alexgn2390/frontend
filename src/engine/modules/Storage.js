import { Encrypt, Decrypt } from "@/engine/modules/Crypto.js"
import config from '@/config.js'

export default {
  name: 'Storage',
  get(key, crypt = false){
    let data = localStorage[key];
    if(!data) return null;
    return crypt ? Decrypt(data) : data;
  },
  getBool(key, crypt = false){
    let data = this.get(key, crypt);
    return data == 'true';
  },
  set(key, data, crypt = false){
    localStorage[key] = (crypt) ? Encrypt(data) : data;
  },
  unset(key){
    localStorage.removeItem(key);
  },
  is(key){
    return localStorage[key] ? true : false;
  },
  getCookie(key, original = false, crypt = false){
    var matches = document.cookie.match(new RegExp( // eslint-disable-next-line
      `(?:^|; )${key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`
    ));

    var result = matches ? decodeURIComponent(matches[1]) : false;
    if(original) return crypt ? Decrypt(result) : result;
    else if(typeof result == 'undefined') return false;
    else if(result == 'false') return false;
    return crypt ? Decrypt(result) : result;
  },
  setCookie(key, data, crypt = false, age = 2678400){
    if(process.env.NODE_ENV === 'development') document.cookie = `${key}=${(crypt) ? Encrypt(data) : data}; path=/; samesite=lax; max-age=${age}`;
    else document.cookie = `${key}=${(crypt) ? Encrypt(data) : data}; path=/; domain=.${config.domains.domain}; samesite=lax; max-age=${age}`;
    return true;
  },
  deleteCookie(key) {
    return this.setCookie(key, "", false, -1);
  },
  isCookie(key) {
    return this.getCookie(key, true) ? true : false;
  }
}