// 修改state数据的对象
// import Vue from 'vue'

import {
    RECEIVE_BANNERS,
    RECEIVE_SONGLIST,
    RECEIVE_NEWSONGS,
    RECEIVE_HOMEMV,
    RECEIVE_SINGERLISTS,
    RECEIVE_SINGERSONGS,
    RECEIVE_SONGURL,
    SET_PLAYING,
    SET_FULLPLAY,
    SET_PLAYLIST,
    SET_POSITIVELIST,
    SET_MODE,
    SET_CURRENTINDEX,
    RECEIVE_SONGWORDS,
    RECEIVE_DISC,
    RECEIVE_TOPLIST,
    RECEIVE_HOTKEY,
    RECEIVE_SEARCH,
    SET_HISTORY,
    SET_PLAY_HISTORY,
    SET_COLLECT
} from './mutation-types'


export default {
    [RECEIVE_BANNERS](state, { banners }) {
        state.banners = banners
    },
    [RECEIVE_SONGLIST](state, { songList }) {
        state.songList = songList
    },
    [RECEIVE_NEWSONGS](state, { newSongs }) {
        state.newSongs = newSongs
    },
    [RECEIVE_HOMEMV](state, { homeMv }) {
        state.homeMv = homeMv
    },

    // 歌手
    [RECEIVE_SINGERLISTS](state, { singerLists }) {
        state.singerLists = singerLists
    },
    [RECEIVE_SINGERSONGS](state, { singersongs }) {
        state.singersongs = singersongs
    },
    [RECEIVE_SONGURL](state, { songURL }) {
        state.songURL = songURL
    },
    [RECEIVE_SONGWORDS](state, { songWords }) {
        state.songWords = songWords
    },



    // 播放器
    [SET_PLAYING](state, { flag }) {
        state.playing = flag
    },
    [SET_FULLPLAY](state, { flag }) {
        state.fullPlay = flag
    },
    [SET_PLAYLIST](state, { playList }) {
        state.playList = playList
    },
    [SET_POSITIVELIST](state, { positiveList }) {
        state.positiveList = positiveList
    },
    [SET_MODE](state, { mode }) {
        state.mode = mode
    },
    [SET_CURRENTINDEX](state, { currentIndex }) {
        state.currentIndex = currentIndex
    },

    // 歌单
    [RECEIVE_DISC](state, { disc }) {
        state.disc = disc
    },
    [RECEIVE_TOPLIST](state, { topLists }) {
        state.topLists = topLists
    },

    [RECEIVE_HOTKEY](state, { hotKey }) {
        state.hotKey = hotKey
    },
    [RECEIVE_SEARCH](state, { search }) {
        state.search = search
    },
    [SET_HISTORY](state, history) {
        state.searchHistory = history
    },
    [SET_PLAY_HISTORY](state, playHistory) {
        state.playHistory = playHistory
    },


    [SET_COLLECT](state, collects) {
        state.collects = collects
    },

}





/* 
// 用户登录，保存用户信息
[RECEIVE_USER_INFO](state, { userInfo }) {
    state.userInfo = userInfo
},
// 用户退出
[RESET_USER_INFO](state) {
    state.userInfo = {}
},

// 购物车
[ADDFOOD_COUNT](state, { food }) {
    // 第一次count有值则++，没有值则变为1
    if (!food.count) {
        // 1.让food中新增的属性count值为1: food.count = 1
        Vue.set(food, 'count', 1);
        // 2.然后将该food添加到购物车cartFoods数据中
        state.cartFoods.push(food)
    } else {
        food.count++

    }
},
[SUBFOOD_COUNT](state, { food }) {
    // 有值才可以减减
    if (food.count) {
        food.count--
            // 3.当该food数量为0时，将该food从cartFoods中清除
            if (food.count == 0) {
                state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
            }
    }
},
// 清除购物车
[CLEAR_CART](state) {
    state.cartFoods.forEach((food) => food.count = 0);
    state.cartFoods = []
}, */