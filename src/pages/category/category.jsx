import React, { Component } from 'react';
import {
    Card,
    Table,
    Button,
    Icon,
    message
} from 'antd';
import LinkButton from '../../components/link-button';
import { reqCategories } from '../../api';

/**
 * 商品分类路由
 */
export default class Category extends Component {

    state = {
        loading: false,
        categories: [], // 一级分类列表
    }

    // 初始化Table所有列名的数组
    initColumns = () => {
        this.columns = [
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
    }

    // 异步获取一级分类列表显示
    getCategories = async () => {
        // 发请求前, 显示loading
        this.setState({ loading: true });
        const result = await reqCategories('0');
        this.setState({ loading: false });
        if (result.status === 0) {
            const categories = result.data;
            // 更新状态
            this.setState({ categories });
        } else {
            message.error('获取分类列表失败!');
        }
    }

    // 为第一次render()准备数据
    componentWillMount() {
        this.initColumns();
    }

    // 发异步ajax请求
    componentDidMount() {
        this.getCategories();
    }


    render() {

        const { categories, loading } = this.state;
        // Card左侧
        const title = '一级分类列表';
        // Card右侧
        const extra = (
            <Button type="primary">
                <Icon type="plus" />
                添加
            </Button>
        );

        return (
            <Card title={title} extra={extra}>
                <Table dataSource={categories}
                    bordered
                    columns={this.columns}
                    rowKey="_id"
                    pagination={{ defaultPageSize: 5, showQuickJumper: true }}
                    loading={loading}
                />;
            </Card>
        )
    }
}