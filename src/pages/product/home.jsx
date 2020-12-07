import React, { Component } from 'react';
import {
    Card,
    Select,
    Input,
    Button,
    Icon,
    Table
} from 'antd';
import LinkButton from '../../components/link-button';
import { reqProducts } from '../../api';
import { PAGE_SIZE } from '../../utils/constants';

const Option = Select.Option;

// product的默认子路由页面
export default class ProductHome extends Component {

    state = {
        total: 0, // 商品总数量
        products: [], // 商品的数组
        loading: false // 是否正在加载中
    };

    // 初始化table的列名数组
    initColumns = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: price => '¥' + price
            },
            {
                width: 100,
                title: '状态',
                dataIndex: 'status',
                render: status => (
                    <span>
                        <Button type='danger'>
                            下架
                        </Button>
                        <span>在售</span>
                    </span>
                )
            },
            {
                width: 100,
                title: '操作',
                render: product => (
                    <div>
                        <div>
                            <LinkButton>详情</LinkButton>
                        </div>
                        <div>
                            <LinkButton>修改</LinkButton>
                        </div>
                    </div>


                )
            }
        ];
    }

    // 获取指定页码的列表数据显示
    getProducts = async (pageNum, pageSize = PAGE_SIZE) => {
        this.setState({ loading: true }); // 显示loading
        const result = await reqProducts(pageNum, pageSize);
        this.setState({ loading: false }); // 隐藏loading
        if (result.status === 0) {
            const { total, list } = result.data;
            this.setState({
                total,
                products: list
            });
        }
    }
    componentWillMount() {
        this.initColumns();
    }

    componentDidMount() {
        this.getProducts(1);
    }



    render() {

        // 取出状态数据
        const { products, total, loading } = this.state;
        const title = (
            <span>
                <Select value='1' style={{ width: '120px' }}>
                    <Option value='1'>按名称搜索</Option>
                    <Option value='2'>按描述搜索</Option>
                </Select>
                <Input placeholder='关键字' style={{ width: 200, margin: '0 15px' }} />
                <Button type='primary'>搜索</Button>
            </span>
        );

        const extra = (
            <Button type='dashed'>
                <Icon type='plus' />
                添加商品
            </Button>
        );

        return (
            <Card title={title} extra={extra}>
                <Table
                    bordered
                    rowKey='_id'
                    dataSource={products} columns={this.columns}
                    loading={loading}
                    pagination={{
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        onChange: this.getProducts,
                        total,
                    }}
                />;
            </Card>
        );
    }
}