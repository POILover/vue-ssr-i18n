import { createApp } from './app'
import Vue from 'vue'
import Cookies from 'js-cookie'
// add beforeRouteUpdate mixin for every component to excute function asyncData if exist
// function asyncData is for server-rendering interface data
Vue.mixin({
    beforeRouteUpdate (to, _, next) {
      const { asyncData } = this.$options
      if (asyncData) {
        // if there is function asyncData, execute firstly
        // NOTE: asyncData must return a Promise
        asyncData({
          store: this.$store,
          route: to,
          i18n:this.$i18n
        }).then(next).catch(next)
      } else {
        next()
      }
    }
  })
// create app with language
const { app, router, store, i18n } = createApp({locale:Cookies.get('locale')||'zh'})

// TODO:作用
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  // TODO: 注掉确实有问题
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)
        let diffed = false
        // find first matched and all after 
        const activated = matched.filter((c, i) => {
          return diffed || (diffed = (prevMatched[i] !== c))
        })
        const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
        if (!asyncDataHooks.length) {
          return next()
        }
    
        Promise.all(asyncDataHooks.map(hook => hook({ store, route: to, i18n })))
          .then(() => {
            next()
          })
          .catch(next)
      })
    app.$mount('#app')
})