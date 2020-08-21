// 异步操作state数据的对象 发送ajax请求


// 请求后台：
import {
    reqBanners,
    reqSongList,
    reqNewSong,
} from '../api'

// 名称：
import {
    RECEIVE_BANNERS,
    RECEIVE_SONGLIST,
    RECEIVE_NEWSONGS
} from './mutation-types'


export default {
    // 轮播图
    async getBanners({ commit }) {
        const result = await reqBanners();
        commit(RECEIVE_BANNERS, { banners: result.banners });
    },
    // 推荐歌单
    async getSongLists({ commit }) {
        const result = await reqSongList();
        commit(RECEIVE_SONGLIST, { songList: result.result });
    },
    // 推荐新碟
    async getNewSongs({ commit }) {
        const result = await reqNewSong();
        commit(RECEIVE_NEWSONGS, { newSongs: result.albums });
    },




    /* // 异步获取地址
    async getAddress({ commit, state }) {
        // 获取url参数格式 param
        const geohash = state.latitude + ',' + state.longitude; //http.../ 40.10038 , 116.36867
        // 发送异步ajax请求
        const result = await reqAddress(geohash);
        // 提交一个 mutations
        commit(RECEIVE_ADDRESS, { address: result.data });
    },

    // 异步获取商品分类列表 
    async getCategorys({ commit }) {
        // 发送异步ajax请求
        const result = await reqCategorys();
        // 提交一个 mutations
        commit(RECEIVE_CATEGORYS, { categorys: result.data });
    },

    // 异步获取商家列表
    async getShops({ commit, state }) {
        // 解构获取经纬度两个参数 query
        const { latitude, longitude } = state;
        // 发送异步ajax请求
        const result = await reqShops({ latitude, longitude });
        // 提交一个 mutations
        commit(RECEIVE_SHOPS, { shops: result.data });
    },

    // 异步获取商家列表(传关键词)
    async getSearchShops({ commit, state }, keyword) {
        const geohash = state.latitude + ',' + state.longitude;
        const result = await reqSearchShop({ geohash, keyword });
        if (result.code === 0) {
            commit(RECEIVE_SEARCH_SHOPS, { searchShops: result.data });
        }
    },



    // 同步 记录用户信息（已经获取到user）
    recordUser({ commit }, userInfo) {
        commit(RECEIVE_USER_INFO, { userInfo })
    },
    // 异步获取用户信息
    async getUserInfo({ commit }) {
        const result = await reqUser();
        // 提交一个 mutations
        if (result.code === 0) {
            commit(RECEIVE_USER_INFO, { userInfo: result.data });
        }
    },
    // 异步退出用户
    async tologout({ commit }) {
        const result = await reqLogout();
        if (result.code === 0) {
            commit(RESET_USER_INFO);
        }
    },



    // 异步获取商家信息
    async getShopInfo({ commit }) {
        const result = await reqShopInfo()
        if (result.code === 0) {
            const info = result.data
            commit(RECEIVE_INFO, { info })
        }
    },

    // 异步获取商家评论列表
    async getShopRatings({ commit }, cb) {
        const result = await reqShopRatings()
        if (result.code === 0) {
            const ratings = result.data
            commit(RECEIVE_RATINGS, { ratings })
            cb && cb()
        }
    },

    // 异步获取商家商品
    async getShopGoods({ commit }, cb) {
        const result = await reqShopGoods()
        if (result.code === 0) {
            const goods = result.data
            commit(RECEIVE_GOODS, { goods })
                // 数据更新后，执行后续
            cb && cb()
        }
    },



    // 更新购物车食物数量
    updataCount({ commit }, { isAdd, food }) {
        if (isAdd) {
            commit(ADDFOOD_COUNT, { food })
        } else {
            commit(SUBFOOD_COUNT, { food })
        }
    },

    // 同步清空购物车（无需后台交互）
    clearCart({ commit }) {
        commit(CLEAR_CART)
    }, */

}