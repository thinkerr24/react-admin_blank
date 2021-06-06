import React from 'react';
import { Upload, Icon, Modal, message } from 'antd';
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
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

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
  handleChange = ({ file, fileList }) => {
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
