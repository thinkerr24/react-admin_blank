import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils';
/*
 * 后台管理的路由组件
 */
export default class Admin extends Component{
    render() {
        const user = memoryUtils.user;
        // 如果内存中没有存储user ==> 当前没有登陆(问题:刷新之后又回到login)
        if (!user || !user._id) {
            // 自动跳转到登陆页
            return <Redirect to='/login'/>
        }
        return (
            <div>
                Hello, {user.username}
            </div>
        )
    }
}