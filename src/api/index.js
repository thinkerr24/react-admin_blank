/*
    根据接口文档定义接口请求
包含应用中所有接口请求函数的模块
每个函数的返回值都是Promise
 */
import { message } from 'antd';
import jsonp from 'jsonp';
import ajax from './ajax';

// 跨域问题(不一致):主机名 协议类型 端口号 解决: 1.JOSNP(only GET request) 2.CORS(back-end config) 3.proxy 
// const BASE = "http://localhost:5000";   ajax(BASE + '/login', {username, password}, 'POST');
// 登陆
// export function reqLogin() {
//     return ajax('/login', {username, password}, 'POST');
// }

export const reqLogin = (username, password) => ajax('/login', { username, password }, 'POST');

// 添加用户
export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST');

// jsonp请求接口的请求函数
export const reqWeather = city => new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
    jsonp(url, {}, (err, data) => {
        // console.log("jsonp()", err, data);
        if (!err && data.status === 'success') {
            const { dayPictureUrl, weather } = data.result[0].weather_data[0];
            resolve({ dayPictureUrl, weather });
        } else {
            message.error('获取天气信息失败!');
        }
    });
});
