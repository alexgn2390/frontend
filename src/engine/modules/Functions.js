import Translit from 'cyrillic-to-translit-js'
import config from '@/config.js'
import Storage from '@/engine/modules/Storage.js'

export default {
  name: 'Functions',
  created(){
    Array.prototype.unique = function (){
      var a = this.concat();
      for(var i=0; i<a.length; ++i){
        for(var j=i+1; j<a.length; ++j){
          if(a[i] === a[j]) a.splice(j--, 1);
        }
      }

      return a;
    };

    Array.prototype.fix = function (){
      return this.filter((el) => {
        return el != null && el != undefined && el != '';
      });
    };

    Array.prototype.clear = function (){
      var a = this;
      while(a.length > 0) a.pop();
      return a;
    };

    if(Array.prototype.equals) console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
    Array.prototype.equals = function (array){
      if(!array) return false;
      if(array === this) return true;
      if(this.length != array.length) return false;

      for(var i = 0, l=this.length; i < l; i++){
        if(this[i] instanceof Array && array[i] instanceof Array){
          if(!this[i].equals(array[i])) return false;
        } else if(this[i] != array[i]) return false;
      }

      return true;
    }

    // Hide method from for-in loops
    Object.defineProperty(Array.prototype, "equals", {enumerable: false});
  },
  Rand(max = 1){
    if(max == 0) max = 1;
    return Math.floor(Math.random() * max) + 1;
  },
  RandByRange(min, max) {
    let r = Math.round(Math.random() * (max - min) + min);
    return (r <= min ? min : (r >= max ? max : r));
  },
  Sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  GenCode(count = 16){
    let key = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < count; i++) key += possible.charAt(Math.floor(Math.random() * possible.length));
    return key;
  },
  GenNumber(count = 11){
    let key = "";
    const possible = "0123456789";
    for (var i = 0; i < count; i++) key += possible.charAt(Math.floor(Math.random() * possible.length));
    return key;
  },
  ToUpperText(text){
    return text.charAt(0).toUpperCase() + text.slice(1);
  },
  TranslitName(user){
    const locale = Storage.get('language');
    const translit = new Translit();

    if(config.locale.translit.latin.indexOf(locale) != -1){
      let r = { 
        first_name: translit.transform(user.first_name),
        middle_name: translit.transform(user.middle_name),
        last_name: translit.transform(user.last_name),
        original_name: [user.first_name, user.middle_name, user.last_name]
      };

      if(user.maiden_name){
        r.maiden_name = translit.transform(user.maiden_name);
        r.original_name[3] = user.maiden_name;
      }

      return r;
    }

    return { first_name: user.first_name, middle_name: user.middle_name, last_name: user.last_name };
  },
  TranslitText(text){
    const locale = Storage.get('language');
    const translit = new Translit();
    if(config.locale.translit.latin.indexOf(locale) != -1) return translit.transform(text);
    return text;
  },
  SplitPascalCase(word){
    const wordRe = /($[a-z])|[A-Z][^A-Z]+/g;
    return word.match(wordRe).join(" ");
  },
  PrecisionRound(number, precision){
    const factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  },
  cHM(min){
    return ("0" + min).slice(-2);
  },
  HEXToVBColor(rrggbb){
    const bbggrr = rrggbb.substr(4, 2) + rrggbb.substr(2, 2) + rrggbb.substr(0, 2);
    return parseInt(bbggrr, 16);
  },
  HEXToDecimal(hexa){
    let chunks = [];
    let tmp, i;
    hexa = hexa.substr(1);

    if(hexa.length === 3){
      tmp = hexa.split("");
      for(i=0;i<3;i++){
        chunks.push(parseInt(tmp[i]+""+tmp[i],16));
      }
    } else if(hexa.length === 6){
      tmp = hexa.match(/.{2}/g);
      for(i=0;i<3;i++){
        chunks.push(parseInt(tmp[i],16));
      }
    } else {
      console.error(`'${hexa}' is not a valid hex format`);
      return false;
    }

    return (chunks[0] << 16) + (chunks[1] << 8) + (chunks[2]);
  },
  GetYouTubeVideoID(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
  },
  CalculateGCD(...arr){
    const _gcd = (x, y) => (!y ? x : this.CalculateGCD(y, x % y));
    return [...arr].reduce((a, b) => _gcd(a, b));
  },
  FormatBytes(bytes, decimals = 2){
    if (!+bytes) return '0 Bytes';
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(dm))} ${sizes[i]}`;
  },
  GetAspectRatio(image){
    const w = image.naturalWidth;
    const h = image.naturalHeight;
    const gcd = this.CalculateGCD(w, h);
    return `${w / gcd}/${h / gcd}`;
  },
  HideNumber(string, replaceTo = '·', elemsHide = 5, sliceFromback = 2) { // eslint-disable-next-line
    var result = string.match(/^(\(?\+?\d{1,2}\)? ?\(?\d{1,3}\)? ?\d+\-? ?\d+\-? ?\d+)$/);
    if (result !== null){
      const regex = new RegExp(`((\\(?\\ ?\\-?\\d\\ ?\\-?\\)?){${elemsHide}})((\\ ?\\-?\\d\\ ?\\-?){${sliceFromback}}$)`, 'gm');

      let m;
      while ((m = regex.exec(string)) !== null) {
        if (m.index === regex.lastIndex) regex.lastIndex++;

        const forRex = m[1];
        const str = m[1].replace(/(\d)/gm, replaceTo);
        const lasts = m[3];
        const full = string;
        const noBack = full.slice(0, -lasts.length).slice(0, -forRex.length);
        const out = noBack+''+str+''+lasts;
        return out;
      }

      return string;
    } else return string;
  },
  GoToFrame(t){
    if(window.innerWidth <= 1400) t.$scrollTo('#start_frame', 300);
    else t.$scrollTo('#top_info_title', 300);
  },
  ValidateEmail(email){
    return email.match( // eslint-disable-next-line
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  },
  ValidatePhone(phone){
    return phone.match( // eslint-disable-next-line
      /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
    );
  }
}