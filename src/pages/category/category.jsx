import React, { Component } from 'react';
import {
    Card,
    Table,
    Button,
    Icon
} from 'antd';
import LinkButton from '../../components/link-button';

/**
 * 商品分类路由
 */
export default class Category extends Component {
    render() {
        // Card左侧
        const title = '一级分类列表';
        // Card右侧
        const extra = (
            <Button type="primary">
                <Icon type="plus" />
                添加
            </Button>
        );

        const dataSource = [
            {
                parentId: "0",
                _id: "5ca9d69b49ef916541160ba",
                name: "家用电器",
                _v: 0
            },
            {
                parentId: "0",
                _id: "5ca9d69b49ef916541160bb",
                name: "电脑",
                _v: 0
            },
        ];

        const columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                width: 300,
                render: () => ( // 返回需要显示的页面标签
                    <span>
                        <LinkButton>修改分类</LinkButton>
                        <LinkButton>查看子分类</LinkButton>
                    </span>
                )
            },
        ];

        return (
            <Card title={title} extra={extra}>
                <Table dataSource={dataSource} bordered columns={columns} rowKey="_id"/>;
            </Card>
        )
    }
}