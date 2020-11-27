import React, { Component } from 'react';
import moment from 'moment';
import { reqWeather } from '../../api';
import memoryUtils from '../../utils/memoryUtils';
import "./index.less";
/**
 * 头部组件
 */
export default class Header extends Component {
    state = {
        currentTime: moment(new Date()).format('yyyy-MM-DD HH:mm:ss'),   // 当前时间
        dayPictureUrl: '', // 天气图标
        weather: '' // 天气
    }

    getTime = () => {
        // 每隔1s获取当前时间, 并更新状态数据currentTime
        setInterval(() => {
            const currentTime = moment(new Date()).format('yyyy-MM-DD HH:mm:ss');
            this.setState({ currentTime });
        }, 1000);
    }

    getWeather = async () => {
        const {dayPictureUrl, weather} = await reqWeather('武汉');
        this.setState({dayPictureUrl, weather}); 
    }

    // 第一次render之后执行
    // 一般在此执行异步操作: 发ajax/启动定时器
    componentDidMount() {
        // 获取当前时间
        this.getTime();

        // 获取当前天气显示
        this.getWeather();
    }

    render() {

        const { currentTime, dayPictureUrl, weather } = this.state;
        const username = memoryUtils.user.username;
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎, {username}</span>
                    <a>退出</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        首页
                    </div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="weather" />
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}