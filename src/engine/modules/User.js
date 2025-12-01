import state from '@/state.js'
import user from '@/userdata.js'
import Api from '@/engine/modules/Api.js'
import Storage from '@/engine/modules/Storage.js'
import Functions from '@/engine/modules/Functions.js'
import TempUser from '@/engine/modules/TempUser.js'

export default {
  name: 'User',
  async created(){
    // Временно отключаем требование аутентификации
    // await this.getMyInform();
    await this.initTempUser();
  },
  /**
   * Auth
   */
  auth(user_id, token){
    Storage.set('user_id', user_id, true);
    Storage.set('access_token', token, true);
    this.getMyInform();
  },
  isLogined(){
    // Временно возвращаем true для работы с временным пользователем
    return Storage.is('user_id') || Storage.is('temp_user_id');
  },
  isAuthed(){
    // Временно возвращаем true если есть временный ID
    return this.isLogined();
  },
  /**
   * Temporary User Initialization
   */
  async initTempUser(){
    const userId = await TempUser.init();
    if (userId) {
      user.id = userId;
      user.authed = true;
      user.is_temp = true;

      // Инициализируем флаг завершения онбординга
      const hasCompleted = TempUser.hasCompletedOnboarding();
      user.onboarding_completed = hasCompleted;

      // Показываем навигацию только если онбординг завершен
      state.app.show_nav = hasCompleted;
    }
  },
  hasCompletedOnboarding(){
    return TempUser.hasCompletedOnboarding();
  },
  setOnboardingCompleted(){
    TempUser.setOnboardingCompleted();
    state.app.show_nav = true;
  },
  logOut(){
    Storage.deleteCookie('u_id');
    Storage.deleteCookie('u_tkn');

    Storage.unset('user_id');
    Storage.unset('access_token');
    Storage.unset('temp_user_id');
    Storage.unset('onboarding_completed');

    // Clear reactive state
    user.id = 0;
    user.authed = false;
    user.is_temp = false;
    user.onboarding_completed = false;
    user.name = '';

    window.location = '/app/welcome';
  },

  /**
   * User Api
   */
  async getMyInform(){
    if(!this.isLogined()) return;
    const r = await Api.query("users.get", {}, {});

    if(r.status != 'success') return this.logOut();
    user.id = Storage.get('user_id', true);
    this.AssignLocalInform(r.response);

    user.authed = true;
    state.app.show_nav = true;
  },
  async AssignLocalInform(arr){
    Object.assign(user, arr);
    Object.assign(user, Functions.TranslitName(user));
  },

  /**
   * User Api
   */
  async getInfo(id){
    return await Api.query("users.get", {}, { user_id: id });
  },
  async updateInfo(data){
    const r = await Api.query("users.edit", {}, data);
    if(r.status == 'success') this.getMyInform();
    return r;
  }
}