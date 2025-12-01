import config from '@/config.js'
import state from '@/state.js'
import Language from '@/engine/modules/Language.js'
import Storage from '@/engine/modules/Storage.js'
import Debug from '@/engine/modules/Debug.js'

export default {
  name: 'PageController',
  created(){
    if(config.debug.enabled) Debug.log('Engine', 'Page Controller ready to work');

    let theme = Storage.get('theme');
    if(theme != null) this.LoadTheme(theme);
    
    /*state.$event.on("user-loaded", () => {
      this.LoadTheme(this.GetThemeName(user.settings.theme));
    });*/
  },
  update(){
    this.setTitle(state.page_state.title);
  },
  /**
   * Theme
   */
  LoadTheme(name = 'light'){
    if (document.getElementById('themeStyle')) document.getElementById('themeStyle').remove();
    var link  = document.createElement('link');
    link.id   = 'themeStyle';
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = `/engine/assets/css/themes/${name}.css`;
    link.media = 'all';
    document.getElementsByTagName('head')[0].appendChild(link);
    
    state.user_settings.theme = name;
    //if(user.authed) user.settings.theme = this.GetThemeID(name);
    Storage.set('theme', name);
  },
  ChangeTheme(){
    this.LoadTheme(state.user_settings.theme == 'light' ? 'dark' : 'light');
    //user.settings.theme = this.GetThemeID(state.user_settings.theme);
    Storage.set('theme', state.user_settings.theme);
    return state.user_settings.theme;
  },
  GetThemeName(id){
    switch(id){
      case 0:
        return 'light';
      case 1:
        return 'dark';
    }
  },
  GetThemeID(name){
    switch(name){
      case 'light':
        return 0;
      case 'dark':
        return 1;
    }
  },
  async setTheme(e){
    this.LoadTheme(e);
    //await Api.query("front.setTheme", {}, { theme: user.settings.theme });
  },
  /**
   * Page
   */
  setTitle(newtitle = null){
    if(!newtitle) newtitle = state.$route.name;
    if(typeof(newtitle) == "undefined") return;

    const name = Language.$i18n.messages[Language.$i18n.locale].header.titles[newtitle];
    const math = typeof(name) != "undefined" && name !== null;

    document.querySelector("link[rel~='icon']").href = state.page_state.icon;

    document.title = math ? name : newtitle;
    state.page_state.title = newtitle;
    if(config.debug.page_state) Debug.log('Engine', `Set title: ${document.title} [${typeof(name)}, ${newtitle}, ${name}, ${math}]`);
  },
  setPageUrl(url, use_history_state = true){
    history.replaceState(use_history_state ? history.state : null, null, url);
    if(config.debug.page_state) Debug.log('Engine', `History reconfigured for ${url}`);
  },
  pageSettings(page = 'None', title = null, icon = null){
    if(title) this.setTitle(title);
    if(!icon) icon = '/engine/assets/ico/logo.png';

    state.page_state.active = page;
    state.page_state.icon = icon;

    document.querySelector("link[rel~='icon']").href = icon;
    if(config.debug.page_state) Debug.log('Engine', `Application reconfigured for ${state.page_state.active} page`);
  },
  pageMounted(){
    if(state.user_settings.language != Language.$i18n.locale) Language.setLanguage(state.user_settings.language);
    if(config.debug.page_state) Debug.log('Engine', `Page ${state.page_state.active} Mounted`);
  },
  subPageMounted(){
    setTimeout(() => { state.is_loading = false; state.page_loading = false; }, 50);
    window.scrollTo(0,0);
  },
  pageUnmounted(){
    if(config.debug.page_state) Debug.log('Engine', `Page ${state.page_state.active} Unmounted`);
  },
  /**
   * Query
   */
  SetQuery(name, value = null, my_query = null){
    let query;
    if(my_query != null) query = Object.assign({}, my_query);
    else query = Object.assign({}, state.$route.query);

    if(config.debug.page_state) Debug.log('Engine', `Set query: ${document.title} [${name}, ${query[name]} => ${value}]`);

    if(value) query[name] = value;
    else delete query[name];
    state.$router.replace({ query });
  },
  SetMultiQuery(data, my_query = null){
    let query;
    if(my_query != null) query = Object.assign({}, my_query);
    else query = Object.assign({}, state.$route.query);

    if(config.debug.page_state) Debug.log('Engine', `Set multi query: ${document.title} [${JSON.stringify(query)} => ${JSON.stringify(data)}]`);

    Object.keys(data).forEach(name => {
      if(data[name]) query[name] = data[name];
      else delete query[name];
    });

    state.$router.replace({ query });
  },
  /**
   * Modal
   */
  ToggleModal(modal_id){
    if(!Object.hasOwn(state.app.modal.blocked, modal_id) && state.app.modal.id != modal_id) state.app.modal.id = modal_id;
    else this.CloseModal(modal_id);
  },
  OpenModal(modal_id, query = null){
    //if(query) this.SetMultiQuery(query);
    if(query) Object.assign(state.app.modal.query, query);
    if(!Object.hasOwn(state.app.modal.blocked, modal_id)) state.app.modal.id = modal_id;
  },
  CloseModal(modal_id){
    state.app.modal.blocked[modal_id] = true;
    state.app.modal.id = '';
    state.app.modal.query = {};
    setTimeout(() => { delete state.app.modal.blocked[modal_id]; }, 100);
  },
  CloseAllModals(){
    state.app.modal.id = '';
    state.app.modal.blocked = [];
    state.app.modal.query = {};
  },
}