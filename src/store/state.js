// 状态对象
// 数组单词加s，遍历出的item直接去掉s

import { loadSearch, loadPlay, loadCollect } from '../assets/js/util'

export default {
    banners: [], //轮播图
    songList: [], // 推荐歌单
    newSongs: [], // 推新碟
    homeMv: [], // mv
    singerLists: [], // 歌手列表
    singersongs: [], // 歌手歌曲
    songURL: '',
    songWords: '',
    // 播放器
    playing: false, //播放中
    fullPlay: false, //全屏播放
    playList: [], //播放列表
    positiveList: [], //正序播放
    mode: 0, // 0正，1loop，2随机
    currentIndex: -1,

    // 歌单详情
    disc: {},
    topLists: [],

    hotKey: [], // 热搜
    search: [], // 搜索结果
    searchHistory: loadSearch(), // 搜索历史
    playHistory: loadPlay(), //播放历史

    collects: loadCollect() // 喜欢的收藏
}