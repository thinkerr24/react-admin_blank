import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import logo from '../../assets/images/logo.png';
import './index.less';
import menuList from '../../config/menuConfig';
const { SubMenu } = Menu;
/**
 * 左侧导航组件
 */
export default class LeftNav extends Component {
    // 根据menu的数据数组生成对应的标签数组(map + 递归)
    getMenuNodes_map = menuList => menuList.map(item => {
        if (!item.children) {
            return (
                <Menu.Item key={item.key}>
                    <Link to={item.key}>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                    </Link>
                </Menu.Item>
            )
        } else {
            return (
                <SubMenu
                    key={item.key}
                    title={
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>
                    }
                >
                    {this.getMenuNodes_map(item.children)}
                </SubMenu>
            )
        }
    })

    // (reduce + 递归)
    getMenuNodes = menuList => menuList.reduce((pre, item) => {
        if (!item.children) {
            // 向pre添加<Menu>
            pre.push((
                <Menu.Item key={item.key}>
                    <Link to={item.key}>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                    </Link>
                </Menu.Item>
            ));
        } else {
            // 向pre添加<SubMenu>
            pre.push((
                <SubMenu
                    key={item.key}
                    title={
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>
                    }
                >
                    {this.getMenuNodes(item.children)}
                </SubMenu>
            ));
        }
        return pre;
    }, [])

    render() {
        return (
            <div className="left-nav">
                <Link to='/' className='left-nav-header'>
                    <img src={logo} alt="logo" />
                    <h1>无名后台</h1>
                </Link>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                >
                    {
                        this.getMenuNodes(menuList)
                    }
                    {/* <Menu.Item key="/home">
                        <Link to='/home'>
                            <Icon type="pie-chart" />
                            <span>首页</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <Icon type="mail" />
                                <span>商品</span>
                            </span>
                        }
                    >
                        <Menu.Item key="/category">
                            <Link to='/category'>
                                <Icon type="mail" />
                                <span>品类管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/product">
                            <Link to='/product'>
                                <Icon type="mail" />
                                <span>商品管理</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="/user">
                        <Link to='/user'>
                            <Icon type="mail" />
                            <span>用户管理</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/role">
                        <Link to='/role'>
                            <Icon type="mail" />
                            <span>角色管理</span>
                        </Link>
                    </Menu.Item> */}
                </Menu>
            </div>
        )
    }
}