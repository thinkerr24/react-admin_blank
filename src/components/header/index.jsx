import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { reqWeather } from '../../api';
import menuList from '../../config/menuConfig';
import memoryUtils from '../../utils/memoryUtils';
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
        setInterval(() => {
            // const currentTime = formateDate(Date.now())
            const currentTime = moment(new Date()).format('yyyy-MM-DD HH:mm:ss');
            this.setState({ currentTime });
        }, 1000);
    }

    getWeather = async () => {
        const { dayPictureUrl, weather } = await reqWeather('武汉');
        this.setState({ dayPictureUrl, weather });
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
        const title = this.getTitle();

        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎, {username}</span>
                    <a>退出</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        {title}
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

export default withRouter(Header);