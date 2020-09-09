// -----------------------随机洗牌  return需要打乱的数组
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
    for (let index = 0; index < array.length; index++) {
        let j = getRandomInt(0, index)
        let t = arr[index]
        arr[i] = arr[j]
        arr[j] = t
    }
    return arr
}


// -----------------------节流 （防止一改变input值，就发请求）
export function debounce(fun, times) {
    let timer

    return function(...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fun.apply(this, args)
        }, times)
    }
}








// 添加:判断数据是否重复
function insertArray(arr, val, compare, maxlen) {
    // 比较arr中有没有这个数据
    const index = arr.findIndex(compare)
    if (index === 0) {
        return
    }
    // 存在则删除
    if (index > 0) {
        arr.splice(index, 1)
    }
    // 没用则直接插入
    arr.unshift(val);
    // 超出则往前推
    if (maxlen && arr.length > maxlen) {
        arr.pop()
    }
}
// 删除:
function delArray(arr, compare) {
    const index = arr.findIndex(compare)
    if (index >= 0) {
        arr.splice(index, 1)
    }
}

// --------------------------保存搜索历史到本地缓存-------------------------------
import storage from 'good-storage'
const SEARCH_KEY = '_myMusic_search_'
const SEARCH_MAX = 8 // 最大空间


// 初始
export function loadSearch() {
    return storage.get(SEARCH_KEY, [])
}
// 添加
export function saveSearch(keyWords) {
    let searches = storage.get(SEARCH_KEY, [])

    insertArray(searches, keyWords, (item) => {
        return item === keyWords
    }, SEARCH_MAX)

    storage.set(SEARCH_KEY, searches)

    return searches
}
// 删除
export function delSearch(keyWords) {
    let searches = storage.get(SEARCH_KEY, [])

    delArray(searches, (item) => {
        return item === keyWords
    })

    storage.set(SEARCH_KEY, searches)

    return searches
}
// 全部清空
export function clsSearch() {
    storage.remove(SEARCH_KEY)
    return []
}


// ----------------------保存播放历史-----------------------------
const PLAY_KEY = '_myMusic_play_'
const PLAY_MAX = 50 // 最大空间


// 初始
export function loadPlay() {
    return storage.get(PLAY_KEY, [])
}
// 添加
export function savePlay(currentSong) {
    let songs = storage.get(PLAY_KEY, [])

    insertArray(songs, currentSong, (item) => {
        return item.id === currentSong.id
    }, PLAY_MAX)

    storage.set(PLAY_KEY, songs)

    return songs
}

// ------------------------- 保存收藏-----------------------------------
const COLLECT_KEY = '_myMusic_like_'
const COLLECT_MAX = 50 // 最大空间

// 初始
export function loadCollect() {
    return storage.get(COLLECT_KEY, [])
}
// 添加
export function savelike(currentSong) {
    let songs = storage.get(COLLECT_KEY, [])

    insertArray(songs, currentSong, (item) => {
        return item.id === currentSong.id
    }, COLLECT_MAX)

    storage.set(COLLECT_KEY, songs)

    return songs
}
// 删除
export function dellike(currentSong) {
    let songs = storage.get(COLLECT_KEY, [])

    delArray(songs, (item) => {
        return item.id === currentSong.id
    })

    storage.set(COLLECT_KEY, songs)

    return songs
}