import VueI18n from 'vue-i18n';
import Vue from 'vue'


// import ElementLocale from 'element-ui/lib/locale'

import zh from './zh'
import en from './en'

Vue.use(VueI18n)


// export const setup = lang => {
//       i18n.locale = locale
//   }

// setup()
export default  function createI18n(locale){
    const i18n = new VueI18n({
        locale,
        messages: { zh, en }
    })
    // elementui 国际化
    // ElementLocale.i18n((key, value) => i18n.t(key, value))
    return i18n
}