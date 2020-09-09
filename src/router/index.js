import Vue from 'vue'
import VueRouter from 'vue-router'



// 路由
const Find = () =>
    import ('../views/Find.vue')
const Personal = () =>
    import ('../views/Personal.vue')
const Video = () =>
    import ('../views/Video.vue')
const Login = () =>
    import ('../views/Login.vue')
const AboutMe = () =>
    import ('../views/AboutMe.vue')
const News = () =>
    import ('../views/News.vue')

const Recommend = () =>
    import ('../views/Find-son/Recommend.vue')
const Singer = () =>
    import ('../views/Find-son/Singer.vue')
const Rank = () =>
    import ('../views/Find-son/Rank.vue')
const Search = () =>
    import ('../views/Find-son/Search.vue')


const SingerDetail = () =>
    import ('../components/SingerDetail/SingerDetail.vue')
const DiscDetail = () =>
    import ('../components/RecommendDetail/DiscDetail.vue')
const RankDetail = () =>
    import ('../components/RankDetail/RankDetail.vue')

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
                // 推荐页面
                path: '/find/recommend',
                component: Recommend,
                meta: { showFooter: true },
            }, {
                // 歌手页面
                path: '/find/singer',
                component: Singer,
                meta: { showFooter: true },
            },
            {
                // 排行页面
                path: '/find/rank',
                component: Rank,
                meta: { showFooter: true }
            }, {
                // 搜索页面
                path: '/find/search',
                component: Search,
                meta: { showFooter: true }
            },
        ]
    },
    // 歌手详情页
    {
        path: '/singerinfo/:id',
        name: 'singerDetail',
        component: SingerDetail,
        meta: { showFooter: false }
    },
    // 推荐页详情页
    {
        path: '/discinfo/:id',
        name: 'discDetail',
        component: DiscDetail,
        meta: { showFooter: false }
    },
    // 排行榜页详情页
    {
        path: '/rankinfo/:id',
        name: 'rankDetail',
        component: RankDetail,
        meta: { showFooter: false }
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
    // 关于我
    {
        path: '/aboutMe',
        component: AboutMe,
        meta: { showFooter: false }
    },
]



const router = new VueRouter({
    routes
})
export default router