import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { Modal } from 'antd';

import LinkButton from '../link-button';
import { reqWeather } from '../../api';
import menuList from '../../config/menuConfig';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import "./index.less";
// import {formateDate} from '../../utils/dateUtils'
/**
 * 头部组件
 */
class Header extends Component {
    state = {
        currentTime: moment(new Date()).format('yyyy-MM-DD HH:mm:ss'),   // 当前时间
        dayPictureUrl: '', // 天气图标
        weather: '' // 天气
    }

    getTitle = () => {
        // 得到当前请求路径
        const path = this.props.location.pathname;
        let title = '';
        menuList.forEach(item => {
            if (item.key === path) {
                title = item.title;
            } else if (item.children) {
                const cItem = item.children.find(cItem => cItem.key === path);
                if (cItem) {
                    title = cItem.title;
                }
            }
        });

        return title;
    }

    getTime = () => {
        // 每隔1s获取当前时间, 并更新状态数据currentTime
        this.intervalId = setInterval(() => {
            // const currentTime = formateDate(Date.now())
            const currentTime = moment(new Date()).format('yyyy-MM-DD HH:mm:ss');
            this.setState({ currentTime });
        }, 1000);
    }

    getWeather = async () => {
        const { dayPictureUrl, weather } = await reqWeather('武汉');
        this.setState({ dayPictureUrl, weather });
    }

    logout = () => {
        // 显示对话框
        Modal.confirm({
            content: '确定退出吗?',
            onOk: () => {
               // 删除保存的user数据
                storageUtils.removeUser();
                memoryUtils.user = {};
               // 跳转到登陆页
               this.props.history.replace('/login');
            },
        });
    }

    // 第一次render之后执行
    // 一般在此执行异步操作: 发ajax/启动定时器
    componentDidMount() {
        // 获取当前时间
        this.getTime();

        // 获取当前天气显示
        this.getWeather();
    }

    // 当前组件卸载前调用
    componentWillUnmount() {
        // 清除定时器
        clearInterval(this.intervalId);
    }

    render() {

        const { currentTime, weather } = this.state;
        const username = memoryUtils.user.username;
        const title = this.getTitle();

        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎, {username}</span>
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        {title}
                    </div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span> &nbsp;
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header);