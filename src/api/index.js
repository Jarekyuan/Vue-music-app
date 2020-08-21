import ajax from './ajax'

// 跨域代理拦截
const B_URL = '/api'


// 轮播图
export const reqBanners = () => ajax(B_URL + '/banner/type=2');

// 推荐歌单
export const reqSongList = () => ajax(B_URL + '/personalized?limit=6');

// 推荐新碟
export const reqNewSong = () => ajax(B_URL + '/album/newest');





/* 
// 获取地址信息(根据经纬度串)
export const reqAddress = geohash => ajax(B_URL + '/position/' + geohash);
// 获取食品分类列表
export const reqCategorys = () => ajax(B_URL + '/index_category');
// 根据经纬度获取商铺列表
export const reqShops = ({ latitude, longitude }) => ajax(B_URL + '/shops', { latitude, longitude });

// 发送短信验证码
export const reqSendCode = phone => ajax(B_URL + '/sendcode', { phone });
// 手机号验证码登陆
export const reqSmsLogin = (phone, code) => ajax(B_URL + '/login_sms', { phone, code }, 'POST'); */
/* 
// 根据会话获取用户信息
export const reqUser = () => ajax(B_URL + '/userinfo');
// 用户登出
export const reqLogout = () => ajax(B_URL + '/logout'); */