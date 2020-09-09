import ajax from './ajax'

// 跨域代理拦截
const B_URL = '/api'


// 轮播图
export const reqBanners = () => ajax(B_URL + '/banner/type=2');
// 推荐歌单
export const reqSongList = () => ajax(B_URL + '/personalized?limit=6');
// 推荐新碟
export const reqNewSong = () => ajax(B_URL + '/album/newest');
// 推荐MV
export const reqMV = () => ajax(B_URL + '/personalized/mv?limit=3');

// 获取歌手列表
export const reqSingerList = ({ type, area }) =>
    ajax(B_URL + `/artist/list?type=${type}&area=${area}&limit=50`);
// 获取歌手歌曲
export const reqSingerSongs = (mid) => ajax(B_URL + `/artists?id=${mid}`);
// 获取歌曲url
export const reqSongsURL = (id) => ajax(B_URL + `/song/url?id=${id}`);
// 获取歌曲歌词
export const reqSongsWords = (id) => ajax(B_URL + `/lyric?id=${id}`);


export const reqDisc = (id) => ajax(B_URL + `/playlist/detail?id=${id}`);
export const reqToplist = () => ajax(B_URL + `/toplist`);

// 热搜
export const reqHotKey = () => ajax(B_URL + `/search/hot`);
// 搜索结果
export const reqSearch = ({ keyWords, limit }) =>
    ajax(B_URL + `/search?keywords=${keyWords}&limit=${limit}`);


// 发送短信验证码
export const reqSendCode = (phone) => ajax(B_URL + `/captcha/sent?${phone}`);
// 手机号验证码登陆
export const reqSmsLogin = (phone, code) => ajax(B_URL + '/login_sms', { phone, code }, 'POST');
// 账号密码登陆
export const reqPwdLogin = ({ name, pwd, captcha }) =>
    ajax(B_URL + '/login_sms', { name, pwd, captcha }, 'POST');

// // 根据会话获取用户信息
// export const reqUser = () => ajax(B_URL + '/userinfo');
// // 用户登出
// export const reqLogout = () => ajax(B_URL + '/logout');