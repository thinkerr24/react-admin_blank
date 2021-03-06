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
export const reqAddUser = user => ajax('/manage/user/add', user, 'POST');

// 获取一级/二级分类列表
export const reqCategories = parentId => ajax('/manage/category/list', { parentId });
// 添加分类
export const reqAddCategory = (categoryName, parentId) => ajax('/manage/category/add', { categoryName, parentId }, 'POST');
// 更新分类
export const reqUpdateCategory = (categoryId, categoryName) => ajax('/manage/category/update', { categoryId, categoryName }, 'POST');
// 获取一个分类
export const reqCategory = categoryId => ajax('/manage/category/info', {categoryId});
// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax('/manage/product/list', { pageNum, pageSize });
// 更新商品状态(上架/下架)
export const reqUpdateStatus = (productId, status) => ajax('/manage/product/updateStatus', {productId, status}, 'POST');
// 搜索商品分页列表(searchType有两个值 productName/productDesc, 通过商品名/商品描述搜索)
export const reqSearchProducts = (pageNum, pageSize, searchName, searchType) => ajax('/manage/product/search', { pageNum, pageSize, [searchType]: searchName });
// 删除图片
export const reqDeleteImg = name => ajax('/manage/img/delete', { name }, 'POST');
// jsonp请求接口的请求函数
export const reqWeather = city => new Promise((resolve) => {
    const url = `http://wthrcdn.etouch.cn/weather_mini?city=${city}`;
    jsonp(url, {}, (err, data) => {
        // console.log("jsonp()", err, data);
        if (!err && data.status === 1000) {
            const { type } = data.data.forecast[0];
            resolve({ weather: type });
        } else {
            message.error('获取天气信息失败!');
        }
    });
});
/**
 * 1). jsonp只能解决GET类型的ajax请求跨域问题
   2). jsonp请求不是ajax请求, 而是一般的get请求
   3). 基本原理
        浏览器端:
            动态生成<script>来请求后台接口(src就是接口的url)
            定义好用于接收响应数据的函数(fn), 并将函数名通过请求参数提交给后台(如: callback=fn)
        服务器端:
            接收到请求处理产生结果数据后, 返回一个函数调用的js代码, 并将结果数据作为实参传入函数调用
        浏览器端:
            收到响应自动执行函数调用的js代码, 也就执行了提前定义好的回调函数, 并得到了需要的结果数据
 */