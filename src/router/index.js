import Vue from 'vue'
import VueRouter from 'vue-router'


// 路由
import Find from '../views/Find.vue'
import Personal from '../views/Personal.vue'
import Video from '../views/Video.vue'
import Login from '../views/Login.vue'
import News from '../views/News.vue'

import Recommend from '../views/Find-son/Recommend.vue'
import Singer from '../views/Find-son/Singer.vue'
import Rank from '../views/Find-son/Rank.vue'
import Search from '../views/Find-son/Search.vue'


Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/find' },
    // 主页推荐
    {
        path: '/find',
        component: Find,
        meta: { showFooter: true },
        children: [
            { path: '/', redirect: '/find/recommend' },
            {
                path: '/find/recommend',
                component: Recommend,
            }, {
                path: '/find/singer',
                component: Singer,
            }, {
                path: '/find/rank',
                component: Rank,
            }, {
                path: '/find/search',
                component: Search,
            },
        ]
    },
    // 个人页面
    {
        path: '/personal',
        component: Personal,
        meta: { showFooter: true }
    },
    // 视频页面
    {
        path: '/video',
        component: Video,
        meta: { showFooter: true }
    },
    // 动态页面
    {
        path: '/news',
        component: News,
        meta: { showFooter: true }
    },
    // 登录页面
    {
        path: '/login',
        component: Login,
        meta: { showFooter: false }
    },
]



const router = new VueRouter({
    routes
})
export default router