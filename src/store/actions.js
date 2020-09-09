// 异步操作state数据的对象 发送ajax请求


// 请求后台：
import {
    reqBanners,
    reqSongList,
    reqNewSong,
    reqMV,
    reqSingerList,
    reqSingerSongs,
    reqSongsURL,
    reqSongsWords,
    reqDisc,
    reqToplist,
    reqHotKey,
    reqSearch
} from '../api'

// 名称：
import {
    RECEIVE_BANNERS,
    RECEIVE_SONGLIST,
    RECEIVE_NEWSONGS,
    RECEIVE_HOMEMV,
    RECEIVE_SINGERLISTS,
    RECEIVE_SINGERSONGS,
    RECEIVE_SONGURL,
    RECEIVE_SONGWORDS,
    SET_PLAYING,
    SET_FULLPLAY,
    SET_PLAYLIST,
    SET_POSITIVELIST,
    SET_CURRENTINDEX,
    RECEIVE_DISC,
    RECEIVE_TOPLIST,
    RECEIVE_HOTKEY,
    RECEIVE_SEARCH,
    SET_HISTORY,
    SET_PLAY_HISTORY,
    SET_COLLECT
} from './mutation-types'

// 本地保存数据
import { saveSearch, savePlay, savelike } from '../assets/js/util'
// 本地删除缓存的数据
import { delSearch, dellike } from '../assets/js/util'
// 本地清空所有缓存的数据
import { clsSearch } from '../assets/js/util'

export default {
    // 轮播图
    async getBanners({ commit }) {
        const result = await reqBanners();
        commit(RECEIVE_BANNERS, { banners: result.banners });
    },
    // 推荐歌单
    async getSongLists({ commit }, cb) {
        const result = await reqSongList();
        commit(RECEIVE_SONGLIST, { songList: result.result });
        // 数据更新后，执行后续
        cb && cb()
    },
    // 推荐新碟
    async getNewSongs({ commit }, cb) {
        const result = await reqNewSong();
        // console.log(result)
        commit(RECEIVE_NEWSONGS, { newSongs: result.albums });
        cb && cb()
    },
    // 推荐mv
    async getHomeMv({ commit }, cb) {
        const result = await reqMV();
        commit(RECEIVE_HOMEMV, { homeMv: result.result });
        cb && cb()
    },

    // 获取歌手列表
    async getSingerLists({ commit }, { type, area }) {
        const result = await reqSingerList({ type, area });
        // console.log(result.artists);
        commit(RECEIVE_SINGERLISTS, { singerLists: result.artists });
    },
    // 获取歌手歌曲
    async getSingerSongs({ commit }, mid) {
        const result = await reqSingerSongs(mid);
        // console.log(result.hotSongs);
        commit(RECEIVE_SINGERSONGS, { singersongs: result.hotSongs });
    },
    // 获取歌曲url
    async getSongsURL({ commit }, id) {
        const result = await reqSongsURL(id);
        // console.log(result.data);
        commit(RECEIVE_SONGURL, { songURL: result.data });
    },
    // 获取歌曲歌词
    async getSongsWords({ commit }, id) {
        const result = await reqSongsWords(id);
        // console.log(result.lrc);
        commit(RECEIVE_SONGWORDS, { songWords: result.lrc });
    },

    // 获取歌单歌曲
    async getDiscSongs({ commit }, id) {
        const result = await reqDisc(id);
        // console.log(result.playlist.tracks);
        commit(RECEIVE_DISC, { disc: result.playlist.tracks });
    },
    // 获取排行榜
    async getToplist({ commit }) {
        const result = await reqToplist();
        // console.log(result);
        commit(RECEIVE_TOPLIST, { topLists: result.list });
    },


    // ------播放器--------
    // 选择播放
    selectPlay({ commit }, { playList, positiveList, currentIndex }) {
        commit(SET_PLAYLIST, { playList: playList });
        commit(SET_POSITIVELIST, { positiveList: positiveList });
        commit(SET_CURRENTINDEX, { currentIndex: currentIndex });
        // 打开全局播放器
        commit(SET_FULLPLAY, { flag: true });
        commit(SET_PLAYING, { flag: true });
    },
    // 全部播放
    allPlay({ commit }, { playList, positiveList }) {
        commit(SET_PLAYLIST, { playList: playList });
        commit(SET_POSITIVELIST, { positiveList: positiveList });
        commit(SET_CURRENTINDEX, { currentIndex: 0 });
        // 打开全局播放器
        commit(SET_FULLPLAY, { flag: true });
        commit(SET_PLAYING, { flag: true });
    },

    // 获取热门搜索
    async getHotKey({ commit }) {
        const result = await reqHotKey();
        // console.log(result);
        commit(RECEIVE_HOTKEY, { hotKey: result.result.hots });
    },
    // 获取歌曲歌词
    async getSearch({ commit }, { keyWords, limit }) {
        const result = await reqSearch({ keyWords, limit });
        console.log(result.result.songs);
        commit(RECEIVE_SEARCH, { search: result.result.songs });
    },

    // ***保存搜索历史记录到缓存
    saveSearchHistory({ commit }, keyWords) {
        commit(SET_HISTORY, saveSearch(keyWords));
    },
    // ***删除搜索历史记录到缓存
    delSearchHistory({ commit }, keyWords) {
        commit(SET_HISTORY, delSearch(keyWords));
    },
    // ***清空搜索历史记录到缓存
    clsSearchHistory({ commit }) {
        commit(SET_HISTORY, clsSearch());
    },

    // 保存播放历史记录
    savePlayHistory({ commit }, currentSong) {
        commit(SET_PLAY_HISTORY, savePlay(currentSong));
    },



    // 收藏
    saveCollect({ commit }, currentSong) {
        commit(SET_COLLECT, savelike(currentSong));
    },
    // 取消收藏
    delCollect({ commit }, currentSong) {
        commit(SET_COLLECT, dellike(currentSong));
    },


    /* 
    // 异步获取商家列表
    async getShops({ commit, state }) {
        // 解构获取经纬度两个参数 query
        const { latitude, longitude } = state;
        // 发送异步ajax请求
        const result = await reqShops({ latitude, longitude });
        // 提交一个 mutations
        commit(RECEIVE_SHOPS, { shops: result.data });
    },

    // 异步获取商家列表---(传关键词)---
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


    
    // 异步获取商家信息
    async getShopInfo({ commit }) {
        const result = await reqShopInfo()
        if (result.code === 0) {
            const info = result.data
            commit(RECEIVE_INFO, { info })
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