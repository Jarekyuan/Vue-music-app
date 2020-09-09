import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入全局样式
import './assets/css/reset.less'

// 引入懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
    loading: require('./assets/img/000.png')
})



Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')