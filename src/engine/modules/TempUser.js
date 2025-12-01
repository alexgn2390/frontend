import Storage from '@/engine/modules/Storage.js'
import Api from '@/engine/modules/Api.js'
import user from '@/userdata.js'

export default {
  name: 'TempUser',

  /**
   * Generate UUID v4
   */
  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },

  /**
   * Get or create temporary user ID
   */
  async getTempUserId() {
    let tempId = Storage.get('temp_user_id', true);

    if (!tempId) {
      tempId = this.generateUUID();
      Storage.set('temp_user_id', tempId, true);

      await this.createTempUserInBackend(tempId);
    }

    return tempId;
  },

  /**
   * Create temporary user in backend
   */
  async createTempUserInBackend(tempId) {
    try {
      const response = await Api.query('account.createTemp', {}, {
        temp_id: tempId,
        name: 'Guest User',
        email: `temp_${tempId}@nfitnity.app`,
        phone: `temp_${tempId.substring(0, 10)}`
      });

      if (response.status === 'success' && response.user_id) {
        Storage.set('user_id', response.user_id, true);
        Storage.set('access_token', response.token, true);
        return response.user_id;
      }
    } catch (error) {
      console.error('Failed to create temp user:', error);
    }

    return null;
  },

  /**
   * Check if user has completed onboarding
   */
  hasCompletedOnboarding() {
    const storageValue = Storage.get('onboarding_completed', true) === 'true';
    // Синхронизируем с реактивным объектом
    user.onboarding_completed = storageValue;
    return storageValue;
  },

  /**
   * Mark onboarding as completed
   */
  setOnboardingCompleted() {
    Storage.set('onboarding_completed', 'true', true);
    // Обновляем реактивный флаг
    user.onboarding_completed = true;
  },

  /**
   * Clear onboarding status
   */
  clearOnboardingStatus() {
    Storage.unset('onboarding_completed');
    user.onboarding_completed = false;
  },

  /**
   * Initialize temporary user on app start
   */
  async init() {
    const userId = await this.getTempUserId();
    return userId;
  }
}
