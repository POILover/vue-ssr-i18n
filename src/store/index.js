import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import { generateRoute4 } from '../pages/main/route4/index.js'
export const createStore = () => {
    return new Vuex.Store({
        state: () => ({
            route4Template:'',
            route4Location:'',
        }),
        mutations: {
            setRoute4Content(state, data){
                state.route4Template = data.template;
                state.route4Location = data.name;
            },
        },
        actions: {
            // if you want to server-render interface data, you must use vuex
            // action must return a Promise
            SET_ROUTE4_CONTENT({commit},{pathMatch,i18n}){
                return new Promise((resolve, _)=>{
                    // 根据match查询location和template TODO: 404处理
                    let location = '';
                    const pathArr = pathMatch.split('/')
                    let len = pathArr.length, i=0;
                    let currentTemplate = '';
                    let currentRouteList = generateRoute4(i18n)
                    while(i<len&&currentRouteList){
                        let idx = currentRouteList.findIndex(product=>product.link===pathArr[i])
                        if(idx>=0){
                            location = location + ' / ' + currentRouteList[idx].name;
                            currentTemplate = currentRouteList[idx].template;
                            currentRouteList = currentRouteList[idx].children;
                            
                        }else{
                            currentRouteList = undefined
                        }
                        i++;
                    }
                    commit('setRoute4Content', {template:currentTemplate,name:location});
                    resolve()
                })
            },
        }
    })
}