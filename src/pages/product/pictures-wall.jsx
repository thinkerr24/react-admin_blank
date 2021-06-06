import React from 'react';
import PropTypes from 'prop-types';
import { Upload, Icon, Modal, message } from 'antd';
import { reqDeleteImg } from '../../api';
import { BASE_IMG_URL } from '../../utils/constants';
// 用于图片上传的组件
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends React.Component {

  static propTypes = {
    imgs: PropTypes.array
  }

  constructor (props) {
    super(props);

    let fileList = [];

    // 如果传入imgs属性
    const { imgs } = this.props;
    if (imgs && imgs.length > 0) {
      fileList = imgs.map((img, index) => ({
        uid: -index,
        name: img,
        status: 'done',
        url: BASE_IMG_URL + img
      }));
    }

    // 初始化状态
    this.state = {
      previewVisible: false, // 标识是否显示大图预览Modal
      previewImage: '', // 大图的url
      fileList  // 所有已上传图片的数组
    };
  
  }

  // 获取所有已上传文件名的数组
  getImages = () => {
    return this.state.fileList.map(file => file.name);
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  // file: 当前操作的图片文件(上传/删除)
  // fileList: 所有已上传图片文件对象的数组
  handleChange = async ({ file, fileList }) => {
    // console.log('upload handleChange:', file.status, file);
    // 一旦上传成功, 将当前上传的file信息修正(name, url)
    if (file.status === 'done') {
      const result = file.response; // { status: 0, data: {name: 'xxx.jpg', url: '图片地址'}}
      if (result.status === 0) {
        message.success('上传图片成功!');
        const { name, url } = result.data;
        file = fileList[fileList.length - 1];
        file.name = name;
        file.url = url;
      } else {
        message.error('上传图片失败!');
      }
    } else if (file.status === 'removed') { // 删除图片
      const result = await reqDeleteImg(file.name);
      if (result.status === 0) {
        message.success('删除图片成功!');
      } else {
        message.success('删除图片失败!');
      }
    }
    this.setState({ fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <Upload
          action="/manage/img/upload"
          accept="image/*"
          name="image"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

/**
 * 1.子组件调用父组件的方法: 将父组件的方法以函数属性的形式传递给子组件，子组件就可以调用
 * 2.父组件调用子组件的方法: 在父组件中通过ref得到子组件标签对象(也就是组件对象)，调用其方法
 */
