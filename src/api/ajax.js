/**
 * 能发送异步ajax请求的函数模块
 * 封装axios库
 * 函数返回值是promise对象
 * 1. 优化: 统一处理请求异常(error generator: change api/index.js line 15 to ajax('/login3', {username, password}, 'POST');)
 *      在外层包一个自己创建的promise对象，在请求出错时，不reject(error), 而是显示错误提示
 */

import axios from 'axios';
import {message} from 'antd';

export default function ajax(url, data = {}, method = "GET") {
    return new Promise((resolve, reject) => {
        let promise;
        // 1. 执行异步ajax请求
        if (method === "GET") { // 发GET请求
            promise = axios.get(url, { // 配置对象
                params: data // 指定请求参数
              });
        } else { // 发POST请求
            promise = axios.post(url, data);
        }
        // 2. 如果执行成功, 调用resolve(value)
        promise.then(response => {
            resolve(response);
        // 3. 如果执行失败, 不调用reject(reason), 而是提示异常信息
        }).catch(error => {
            // reject(error)
            message.error('request err:' + error.message);
        });
       
    });
   
}

    // 请求登录接口
    // ajax('/login', {username: 'Tom', password: '12345'}, 'POST').then()
    // 添加用户
    // ajax('/manage/user/add', {username: 'Tom', password: '12345', phone: '137546xxxxx'}, 'POST').then()