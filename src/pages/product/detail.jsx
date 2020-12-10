import React, { Component } from 'react';
import {
    Card,
    Icon,
    List
} from 'antd';
import './product-detail.less';
import { BASE_IMG_URL } from '../../utils/constants';
import { reqCategory } from '../../api';

const Item = List.Item;

// product的详情子路由页面
export default class ProductDetail extends Component {

    state = {
        cName1: '', // 一级分类名称
        cName2: ''  // 二级分类名称
    }

    async componentDidMount() {
        const { pCategoryId, categoryId } = this.props.location.state;
        let result;
        if (pCategoryId === '0') {
            result = await reqCategory(categoryId);
            const cName1 = result.data.name;
            this.setState({ cName1 });
        } else {
            // 通过多个await方式发请求，效率不够: 后面的请求是在前一个请求成功返回之后才发送
            // result = await reqCategory(pCategoryId);
            // const cName1 = result.data.name;
            // result = await reqCategory(categoryId);
            // const cName2 = result.data.name;
            const results = await Promise.all([reqCategory(pCategoryId), reqCategory(categoryId)]);
            const cName1 = results[0].data.name;
            const cName2 = results[1].data.name;
            this.setState({ cName1, cName2 });
        }
    }


    render() {
        const product = this.props.location.state;
        const { cName1, cName2 } = this.state;
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
                         <span>{cName1}{cName2 ? '-->' + cName2 : ''}</span>
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