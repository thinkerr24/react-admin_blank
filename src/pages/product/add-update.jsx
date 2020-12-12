import React, { Component } from 'react';
import {
    Card,
    Form,
    Input,
    Cascader,
    Upload,
    Button,
    Icon
} from 'antd';

const { Item } = Form;
const { TextArea } = Input;

// product的添加和更新子路由页面
export default class ProductAddUpdate extends Component {
    render() {
        // 指定Item布局的配置对象
        const formItemLayout = {
            labelCol: { span: 2 },   // 指定左侧label占宽比
            wrapperCol: { span: 8 }, // 指定右侧包裹的宽度
        };

        const title = (
            <span>
                <Icon type='arrow-left' style={{ color: 'green', marginRight: 10, fontSize: 16 }} onClick={() => this.props.history.goBack()} />
                <span>添加商品</span>
            </span>
        );
        return (
            <Card title={title}>
                <Form {...formItemLayout}>
                    <Item label='商品名称'>
                        <Input placeholder='请输入商品名称' />
                    </Item>
                    <Item label='商品描述'>
                        <TextArea placeholder='请输入商品描述' autosize={{ minRows: 2, maxRows: 6 }} />
                    </Item>
                    <Item label='商品价格'>
                        <Input type='number' placeholder='请输入商品价格' addonAfter='元'/>
                    </Item>
                </Form>
            </Card>
        );
    }
}