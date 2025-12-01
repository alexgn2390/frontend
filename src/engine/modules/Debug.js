import config from '@/config.js'

export default {
  name: 'Debug',
  created(){
    console.info('%c Info %c Error %c Warning %c Success %c Log %c Custom ',
    'color: white; background-color: #2274A5',
    'color: white; background-color: #D33F49',
    'color: white; background-color: #BCA300',
    'color: white; background-color: #95B46A',
    'color: white; background-color: #3E3E3E',
    'color: black; background-color: #00E196');
  },
  info(title, text) {
    if(config.debug.enabled) console.info(`%c ${title} `, 'color: white; background-color: #2274A5', text);
  },
  error(title, text) {
    if(!config.debug.enabled) return
    console.error(`%c ${title} `, 'color: white; background-color: #D33F49', text);
  },
  warning(title, text) {
    if(config.debug.enabled) console.warn(`%c ${title} `, 'color: white; background-color: #BCA300', text);
  },
  success(title, text) {
    if(config.debug.enabled) console.info(`%c ${title} `, 'color: white; background-color: #95B46A', text);
  },
  log(title, text) {
    if(config.debug.enabled) console.log(`%c ${title} `, 'color: white; background-color: #3E3E3E', text);
  },
  custom(title, text, color = '#00E196', textcolor = 'black') {
    if(config.debug.enabled) console.info(`%c ${title} `, `color: ${textcolor}; background-color: ${color}`, text);
  },
  alert(title, text) {
    alert(`[${title}]\n\n${text}`);
  },
  message(text) {
    alert(text);
  }
}