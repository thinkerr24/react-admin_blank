import React, { Component } from 'react';
import {
    Card,
    Icon,
    List
} from 'antd';
import './product-detail.less';
import { BASE_IMG_URL } from '../../utils/constants';

const Item = List.Item;

// product的详情子路由页面
export default class ProductDetail extends Component {
    render() {
        const product = this.props.location.state;
        const title = (
            <span>
                <Icon type='arrow-left' style={{ color: 'green', marginRight: 10, fontSize: 16 }} onClick={() => this.props.history.goBack()} />
                <span>商品详情</span>
            </span>
        );
        return (
            <Card title={title} className='product-detail'>
                <List>
                    <Item>
                        <span className='left'>商品名称</span>
                        &nbsp;
                        <span>{product.name}</span>
                    </Item>
                    <Item>
                        <span className='left'>商品描述</span>
                        &nbsp;
                        <span>{product.desc}</span>
                    </Item>
                    <Item>
                        <span className='left'>商品价格</span>
                        &nbsp;
                        <span>{product.price}元</span>
                    </Item>
                    <Item>
                        <span className='left'>所属分类</span>
                        &nbsp;
                        <span>电脑-&gt;笔记本</span>
                    </Item>
                    <Item>
                        <span className='left'>商品图片</span>
                        &nbsp;
                        <span>
                            {
                                product.imgs.map(img => <img className="product-img" key={img} src={BASE_IMG_URL + img} alt="img" />)
                            }
                        </span>
                    </Item>
                    <Item>
                        <span className='left'>商品详情</span>
                        &nbsp;
                        <span dangerouslySetInnerHTML={{ __html: product.detail }}></span>
                    </Item>
                </List>
            </Card>
        );
    }
}