import React, { Component } from 'react';
import {
    Card,
    Table,
    Button,
    Icon,
    message,
    Modal
} from 'antd';
import LinkButton from '../../components/link-button';
import { reqAddCategory, reqCategories, reqUpdateCategory } from '../../api';
import AddForm from './add-form';
import UpdateForm from './update-form';

/**
 * 商品分类路由
 */
export default class Category extends Component {

    state = {
        loading: false,
        categories: [], // 一级分类列表
        parentId: '0',  // 当前需要显示的分类列表的父分类Id
        parentName: '', // 当前需要显示的分类列表的父分类name
        subCategories: [], // 二级分类列表
        showStatus: 0,  // 标识确认框是否显示: 0-都不显示, 1-只显示添加, 2-只显示更新
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
                render: category => ( // 返回需要显示的页面标签
                    <span>
                        <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>
                        {/* 如何向事件回调函数传递参数: 先定义一个函数, 然后在这个函数中调用原函数 */}
                        {/* {this.state.parentId === '0' ? <LinkButton onClick={() => this.showSubCategories(category)}>查看子分类</LinkButton> : null} */}
                        {this.state.parentId === '0' && <LinkButton onClick={() => this.showSubCategories(category)}>查看子分类</LinkButton>}
                    </span>
                )
            },
        ];
    }

    // 异步获取一级/二级分类列表显示
    getCategories = async parentId => {
        // 发请求前, 显示loading
        this.setState({ loading: true });
        parentId  = parentId || this.state.parentId;
        const result = await reqCategories(parentId);
        this.setState({ loading: false });
        if (result.status === 0) {
            const categories = result.data;
            // 更新状态
            if (parentId === '0') {
                this.setState({ categories });
            } else {
                this.setState({ subCategories: categories });
            }
        } else {
            message.error('获取分类列表失败!');
        }
    }

    // 显示指定一级分类对象的二级列表
    showSubCategories = category => {
        // setState是异步更新状态
        this.setState({
            parentId: category._id,
            parentName: category.name
        }, () => {
            // setState的回调函数:在状态更新且重新render()后执行
            this.getCategories();
        });
    }

    showCategories = () => {
        this.setState({
            parentId: '0',
            parentName: '',
            subCategories: []
        })
    }

    // 响应点击取消: 隐藏确定框
    handleCancel = () => {
        this.form.resetFields();
        this.setState({
            showStatus: 0
        });
    }

    // 添加分类
    showAdd = () => {
        this.setState({
            showStatus: 1
        });
    }
    addCategory = async () => {
        // 1. 隐藏对话框
        this.setState({
            showStatus: 0
        });

        // 2. 收集数据并提交添加分类请求
        const { categoryName, parentId } = this.form.getFieldsValue();
        // 清除缓存数据(重置所有字段)
        this.form.resetFields();
        const result = await reqAddCategory(categoryName, parentId);
        if (result.status === 0) {
            if (parentId === this.state.parentId) {
                // 重新获取分类列表显示(选取当前页建立子分类)
                this.getCategories();
            } else if (parentId === '0') { 
                // 二级分类选取一级分类建立子分类(不需要显示, 但是需要更新state)
                this.getCategories('0');
            }
           
        }
    }

    // 更新分类
    showUpdate = category => {
        // 保存分类对象
        this.category = category;
        this.setState({
            showStatus: 2
        });
    }
    updateCategory = async () => {
        // 1.隐藏确定框
        this.setState({
            showStatus: 0
        });

        const categoryId = this.category._id;
        const categoryName = this.form.getFieldValue('categoryName');

        // 清除缓存数据(重置所有字段)
        this.form.resetFields();
        // 2. 发请求更新分类
        const result = await reqUpdateCategory(categoryId, categoryName);
        if (result.status === 0) {
            // 3. 重新显示列表
            this.getCategories();
        }

    }
    // 为第一次render()准备数据
    componentWillMount() {
        this.initColumns();
    }

    // 发异步ajax请求
    componentDidMount() {
        // 获取一级分类列表
        this.getCategories();
    }


    render() {

        const { categories, subCategories, parentName, parentId, loading, showStatus } = this.state;
        // 读取指定的分类
        const category = this.category || {}; // 页面初始时this.category是没有值的
        // Card左侧
        const title = parentId === '0' ? '一级分类列表' : (
            <span>
                <LinkButton onClick={this.showCategories}>一级分类列表</LinkButton>
                <Icon type="arrow-right" style={{ marginRight: 5 }} />
                <span>{parentName}</span>
            </span>
        );
        // Card右侧
        const extra = (
            <Button type="primary" onClick={this.showAdd}>
                <Icon type="plus" />
                添加
            </Button>
        );

        return (
            <Card title={title} extra={extra}>
                <Table dataSource={parentId === '0' ? categories : subCategories}
                    bordered
                    columns={this.columns}
                    rowKey="_id"
                    pagination={{ defaultPageSize: 5, showQuickJumper: true }}
                    loading={loading}
                />;
                <Modal
                    title="添加分类"
                    visible={showStatus === 1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                >
                    <AddForm categories={categories} parentId={parentId} setForm={form => this.form = form} />
                </Modal>
                <Modal
                    title="更新分类"
                    visible={showStatus === 2}
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}
                >
                    <UpdateForm categoryName={category.name} setForm={form => this.form = form} />
                </Modal>
            </Card>
        )
    }
}