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
import { reqCategories } from '../../api';

const { Item } = Form;
const { TextArea } = Input;

// product的添加和更新子路由页面
class ProductAddUpdate extends Component {
    state = {
        options: [],
    };

    initOptions = categories => {
        // 根据categories生成options数组
        const options = categories.map(c => ({
            value: c._id,
            label: c.name,
            isLeaf: false,

        }));
        // 更新options状态
        this.setState({
            options
        })
    }

    // 获取一级和二级分类列表
    getCategories = async parentId => {
        const result = await reqCategories(parentId);
        if (result.status === 0) {
            const categories = result.data;
            // 如果是一级
            if (parentId === '0') {
                this.initOptions(categories);
            } else { // 如果是二级
                return categories;
            }

        }
    }
    // 针对商品价格的自定义验证函数
    validatePrice = (rule, value, callback) => {
        if (value * 1 > 0) {
            callback();
        } else {
            callback('价格必须大于0');
        }
    }

    // 加载下一级列表的回调函数
    loadData = async selectedOptions => {
        // 得到选择的option对象
        const targetOption = selectedOptions[selectedOptions.length - 1];
        // 显示loading效果
        targetOption.loading = true;

        // 根据选中的分类, 请求获取二级分类列表
        const subCategories = await this.getCategories(targetOption.value);
        targetOption.loading = false;
        
        if (subCategories && subCategories.length > 0) {
            // 生成一个二级列表的options
            const childOptions = subCategories.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true
            }));
            // 关联到当前option上
            targetOption.children = childOptions;
        } else { // 当前选中分类没有二级分类
            targetOption.isLeaf = true;
        }

        this.setState({
            options: [...this.state.options],
        });
    };

    submit = () => {
        // 进行表单验证
        this.props.form.validateFields((error, values) => {
            if (!error) {
                alert('发送Ajax请求!');
            }
        });
    }

    componentDidMount() {
        this.getCategories('0');
    }

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

        const { getFieldDecorator } = this.props.form;

        return (
            <Card title={title}>
                <Form {...formItemLayout}>
                    <Item label='商品名称'>
                        {
                            getFieldDecorator('name', {
                                initialValue: '',
                                rules: [
                                    { required: true, message: '必须输入商品名称' }
                                ]
                            })(<Input placeholder='请输入商品名称' />)
                        }
                    </Item>
                    <Item label='商品描述'>
                        {
                            getFieldDecorator('desc', {
                                initialValue: '',
                                rules: [
                                    { required: true, message: '必须输入商品描述' }
                                ]
                            })(<TextArea placeholder='请输入商品描述' autoSize={{ minRows: 2, maxRows: 6 }} />)
                        }

                    </Item>
                    <Item label='商品价格'>
                        {
                            getFieldDecorator('price', {
                                initialValue: '',
                                rules: [
                                    { required: true, message: '必须输入商品价格' },
                                    { validator: this.validatePrice }
                                ]
                            })(<Input type='number' placeholder='请输入商品价格' addonAfter='元' />)
                        }

                    </Item>
                    <Item label='商品分类'>
                        <Cascader
                            options={this.state.options} // 一级列表项数组
                            loadData={this.loadData} // 选择某个列表项后加载其下一级列表的监听回调
                        />
                    </Item>
                    <Item label='商品图片'>
                        <Upload />
                    </Item>
                    <Item label='商品详情'>
                        <Input placeholder='请输入商品名称' />
                    </Item>
                    <Item>
                        <Button type='primary' onClick={this.submit}>提交</Button>
                    </Item>
                </Form>
            </Card>
        );
    }
}

export default Form.create()(ProductAddUpdate);