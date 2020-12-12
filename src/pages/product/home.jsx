import React, { Component } from 'react';
import {
    Card,
    Select,
    Input,
    Button,
    Icon,
    Table,
    message
} from 'antd';
import LinkButton from '../../components/link-button';
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api';
import { PAGE_SIZE } from '../../utils/constants';

const Option = Select.Option;

// product的默认子路由页面
export default class ProductHome extends Component {

    state = {
        total: 0, // 商品总数量
        products: [], // 商品的数组
        loading: false, // 是否正在加载中
        searchName: '', // 搜索关键字
        searchType: 'productName'  // 搜索类型
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
                // dataIndex: 'status',
                render: product => {
                    const { status, _id } = product;
                    const newStatus = status === 1 ? 2 : 1;
                    return (
                        <span>
                            <Button type='danger' onClick={() => this.updateStatus(_id, newStatus)}>
                                {status === 1 ? '下架' : '上架'}
                            </Button>
                            <span>{status === 1 ? '在售' : '已下架'}</span>
                        </span>);
                }
            },
            {
                width: 100,
                title: '操作',
                render: product => (
                    <div>
                        <div>
                            <LinkButton onClick={() => this.props.history.push('/product/detail', product)}>详情</LinkButton>
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
        this.pageNum = pageNum; // 保存pageNum
        this.setState({ loading: true }); // 显示loading
        const { searchName, searchType } = this.state;
        let result;
        if (searchName) {
            result = await reqSearchProducts(pageNum, PAGE_SIZE, searchName, searchType);
        } else {
            result = await reqProducts(pageNum, pageSize);
        }
        this.setState({ loading: false }); // 隐藏loading
        if (result.status === 0) {
            const { total, list } = result.data;
            this.setState({
                total,
                products: list
            });
        }
    }

    // 更新指定商品的状态
    updateStatus = async (productId, status) => {
        const result = await reqUpdateStatus(productId, status);
        if (result.status === 0) {
            message.success('更新商品上架状态成功!');
            this.getProducts(this.pageNum);
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
        const { products, total, loading, searchName, searchType } = this.state;
        const title = (
            <span>
                <Select value={searchType} style={{ width: '120px' }} onChange={value => this.setState({ searchType: value })}>
                    <Option value='productName'>按名称搜索</Option>
                    <Option value='productDesc'>按描述搜索</Option>
                </Select>
                <Input placeholder='关键字' style={{ width: 200, margin: '0 15px' }} value={searchName} onChange={e => this.setState({ searchName: e.target.value })} />
                <Button type='primary' onClick={() => this.getProducts(1)}>搜索</Button>
            </span>
        );

        const extra = (
            <Button type='dashed' onClick={() => this.props.history.push('/product/addupdate')}>
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