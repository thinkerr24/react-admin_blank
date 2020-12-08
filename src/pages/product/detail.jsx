import React, { Component } from 'react';
import {
    Card,
    Icon,
    List
} from 'antd';
import './product-detail.less';

const Item = List.Item;

// product的详情子路由页面
export default class ProductDetail extends Component {
    render() {
        const title = (
            <span>
                <Icon type='arrow-left'/>
                <span>商品详情</span>
            </span>
        );
        return (
            <Card title={title} className='product-detail'>
                <List>
                    <Item>
                        <span className='left'>商品名称</span>
                        &nbsp;
                        <span>联想ThinkPad 翼480</span>
                    </Item>
                    <Item>
                        <span className='left'>商品描述</span>
                        &nbsp;
                        <span>年度重量级新品, X390、T490全新登场, 更加轻薄机身设计</span>
                    </Item>
                    <Item>
                        <span className='left'>商品价格</span>
                        &nbsp;
                        <span>6600元</span>
                    </Item>
                    <Item>
                        <span className='left'>商品图片</span>
                        &nbsp;
                        <span>
                            <img className="product-img" src="http://localhost:5000/upload/image-1559402396338.jpg" alt="img"/>
                            <img className="product-img" src="http://localhost:5000/upload/image-1559402396338.jpg" alt="img"/>
                        </span>
                    </Item>
                    <Item>
                        <span className='left'>商品详情</span>
                        &nbsp;
                        <span dangerouslySetInnerHTML={{__html: "<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;\">想你所需，超你所想！精致外观，轻薄便携带光驱，内置正版office杜绝盗版死机，全国联保两年！</span> 222</p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">联想（Lenovo）扬天V110 15.6英寸家用轻薄便携商务办公手提笔记本电脑 定制【E2-9010/4G/128G固态】 2G独显 内置</span></p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">99999</span></p>\n"}}></span>
                    </Item>
                </List>
            </Card>
        );
    }
}