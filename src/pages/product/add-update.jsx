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


const options = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        isLeaf: false,
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        isLeaf: false,
    },
    {
        value: 'isLeaf',
        label: 'isLeaf',
        isLeaf: true,
    },
];

// product的添加和更新子路由页面
class ProductAddUpdate extends Component {
    state = {
        options,
    };

    // 针对商品价格的自定义验证函数
    validatePrice = (rule, value, callback) => {
        if (value * 1 > 0) {
            callback();
        } else {
            callback('价格必须大于0');
        }
    }

    // 加载下一级列表的回调函数
    loadData = selectedOptions => {
        // 得到选择的option对象
        const targetOption = selectedOptions[selectedOptions.length - 1];
        // 显示loading效果
        targetOption.loading = true;

        // 模拟发请求, 有延迟
        // load options lazily
        setTimeout(() => {
            targetOption.loading = false;
            targetOption.children = [
                {
                    label: `${targetOption.label} Dynamic 1`,
                    value: 'dynamic1',
                },
                {
                    label: `${targetOption.label} Dynamic 2`,
                    value: 'dynamic2',
                },
            ];
            this.setState({
                options: [...this.state.options],
            });
        }, 1000);
    };

    submit = () => {
        // 进行表单验证
        this.props.form.validateFields((error, values) => {
            if (!error) {
                alert('发送Ajax请求!');
            }
        });
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