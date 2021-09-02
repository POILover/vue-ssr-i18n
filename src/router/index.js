import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/index.vue'
import LayoutAdmin from '../layout_admin/index.vue'
Vue.use(VueRouter)

export const createRouter = (i18n) => {
    const router = new VueRouter({
        mode: 'history', 
        routes:[
            
            {
                path:'/',
                redirect:'/route_1',
                component:Layout,
                children:[
                    // redirect can hack same route jumping
                    {
                        path: "/redirect/:path*",
                        component:()=>import('@/pages/redirect'),
                    },
                    {
                        path:'/route_1',
                        name:'route_1',
                        meta:{
                            title:`${i18n.t('route')}_1`
                        },
                        component:()=>import('@/pages/main/route_1'),
                    },
                    {
                        path:'/route_2',
                        name:'route_2',
                        meta:{
                            title:`${i18n.t('route')}_2`
                        },
                        component:()=>import('@/pages/main/route_2'),
                    },
                    {
                        path:'/route_3',
                        name:'route_3',
                        meta:{
                            title:`${i18n.t('route')}_3`
                        },
                        component:()=>import('@/pages/main/route_3'),
                    },
                    {
                        path:'/route_4',
                        name:'route_4',
                        meta:{
                            title:`${i18n.t('route')}_4`
                        },
                        component:()=>import('@/pages/main/route_4'),
                    },
                    {
                        path:'/route_5',
                        name:'route_5',
                        meta:{
                            title:`${i18n.t('route')}_5`
                        },
                        component:()=>import('@/pages/main/route_5'),
                    },
                    {
                        path:'/route_6',
                        name:'route_6',
                        meta:{
                            title:`${i18n.t('route')}_6`
                        },
                        component:()=>import('@/pages/main/route_6'),
                    },
                    {   
                        path: '/route_4/*',
                        name:'route_4_detail',
                        component:()=>import('@/pages/main/route_4'),
                    },
                ]
            },
            {
                path:'/admin',
                redirect:'/admin/route_1',
                component:LayoutAdmin,
                children:[
                    {
                        path:'/admin/route_1',
                        name:'admin_route_1',
                        meta:{
                            title:i18n.t('investor')
                        },
                        component:()=>import('@/pages/admin/admin_route_1')
                    },
                    {
                        path:'/admin/route_2',
                        name:'admin_route_2',
                        meta:{
                            title:i18n.t('investor')
                        },
                        component:()=>import('@/pages/admin/admin_route_2')
                    },
                ]
            },
            {
                path:'/admin/login',
                name:'login',
                meta:{
                    title:i18n.t('investor')
                },
                component:()=>import('@/pages/admin/login')
            },
            {
                path:'*',
                name:'404',
                component:()=>import('@/pages/404')
            }
        ]
    })

    return router
}