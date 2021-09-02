 import Vue from 'vue'

import ElementUI from 'element-ui';

import App from './App.vue'

import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'
import Cookies from 'js-cookie'
import locale from 'element-ui/lib/locale/lang/zh-CN'
Vue.use(ElementUI, {
  size: 'medium', // Set element-ui default size
  locale
})
import "normalize.css"
import './style/index.scss'
import createI18n from './i18n'
if (process.browser) {
    const VueQuillEditor = require('vue-quill-editor')
    Vue.use(VueQuillEditor, /* { default global options } */)
}

// 添加title的mixin，TODO:国际化待优化
Vue.mixin({
    mounted(){
        // FIXME: $i18n undefined bug
        const locale = this.$i18n.locale;
        const title = this.$route&&this.$route.meta&&this.$route.meta.title
        if(title){
            document.title = title + ` - ${locale==='zh'?'牧码人':'Codeherder'}`
        }else{
            document.title = `${locale==='zh'?'牧码人':'Codeherder'}`
        }

    }
})

// 导出创建Vue实例的工厂函数
export function createApp({locale,token}) {
    const store = createStore()
    const i18n = createI18n(locale)
    const router = createRouter(i18n)
    // TODO: sync函数的作用
    sync(store, router)
    // 路由拦截在这里
    router.beforeEach((to,from,next)=>{
        
        
        if(to.matched.some(item=>item.path=='/route4/*')){
            // 全局hack由router-link和el-menu-item引起的相同路由跳转bug
            if(from.matched.some(item=>item.path=='/redirect/:path*')){
                next()
            }else{
                next(`/redirect${to.path}`)
            }
        }else if(to.matched.some(item=>item.path=='/admin')){
            //简单权限拦截一下admin页面
            // FIXME: 刷新页面重定向后，服务端和客户端不匹配
            let token = Cookies.get('token')
            console
            if(to.path === "/admin/login"){
                token ? next('/admin') : next()
            }else{
                token ? next() : next('/admin/login')
            }
            
        }else{
            next()
        }
        
        
        
    })
    const app = new Vue({
        router,
        store,
        i18n,
        render: h => h(App)
    })
    return { app, router, store, i18n }
}
