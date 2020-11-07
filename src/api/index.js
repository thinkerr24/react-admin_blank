/*
    根据接口文档定义接口请求
包含应用中所有接口请求函数的模块
每个函数的返回值都是Promise
 */
import ajax from './ajax';

// 跨域问题(不一致):主机名 协议类型 端口号 解决: 1.JOSNP(only GET request) 2.CORS(back-end config) 3.proxy 
// const BASE = "http://localhost:5000";   ajax(BASE + '/login', {username, password}, 'POST');
// 登陆
// export function reqLogin() {
//     return ajax('/login', {username, password}, 'POST');
// }

export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST');

// 添加用户
export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST');
