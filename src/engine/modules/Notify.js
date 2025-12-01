import Debug from '@/engine/modules/Debug.js'

export default {
  name: 'Notify',
  access: false,
  ico: `/engine/assets/ico/logo.png`,
  badge: `/engine/assets/ico/badge.png`,
  notify: null,
  async created(text){
    try {
      const permission = await Notification.requestPermission();
      
      if(permission == 'granted'){
        this.access = true;
        Debug.info('Notify', text);
      }
    } catch (error) { console.log(error); }
  },
  setAppBadge(amount){
    if('setAppBadge' in navigator && 'clearAppBadge' in navigator){
      if(amount > 0) navigator.setAppBadge(amount).catch(error => { Debug.error('AppBadge', error); });
      else navigator.clearAppBadge().catch(error => { Debug.error('AppBadge', error); });
    }
  },
  Message(dialog, message, user, silent = false){
    if(!this.access) return;
    if(this.notify) this.notify.close();

    if(process.env.NODE_ENV === 'development'){
      this.notify = new Notification(dialog.name, {
        body: message.text,
        icon: user.avatar,
        silent: silent,
        //image: user.avatar,
        renotify: true,
        badge: this.badge,
        tag: `ozl-dialog-${dialog.id}`,
        timestamp: (message.send_time * 1000),
        vibrate: [200, 100, 200, 100, 200, 100, 200]
      });
      this.notify.onclick = () => { alert("Notification clicked"); };
      return;
    }
    
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification(dialog.name, {
        body: message.text,
        icon: user.avatar,
        silent: silent,
        //image: user.avatar,
        renotify: true,
        badge: this.badge,
        tag: `ozl-dialog-${dialog.id}`,
        timestamp: (message.send_time * 1000),
        vibrate: [200, 100, 200, 100, 200, 100, 200]
      });
    });
  }
}