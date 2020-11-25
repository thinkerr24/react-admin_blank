import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils';
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav';
import Header from '../../components/header'; 
const { Footer, Sider, Content } = Layout;

/*
 * 后台管理的路由组件
 */
export default class Admin extends Component {
    render() {
        const user = memoryUtils.user;
        // 如果内存中没有存储user ==> 当前没有登陆(问题:刷新之后又回到login)
        if (!user || !user._id) {
            // 自动跳转到登陆页
            return <Redirect to='/login' />
        }
        return (
            <Layout style={{height: '100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header/>
                    <Content style={{backgroundColor: '#fff'}}>Content</Content>
                    <Footer style={{textAlign: 'center', color: '#cccccc'}}>推荐使用谷歌浏览器, 可以获得更佳的页面操作体验</Footer>
                </Layout>
            </Layout>
        )
    }
}