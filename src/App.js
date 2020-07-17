import React, {Component} from 'react'
import { Button, message} from 'antd';


/*
 * 应用的根组件
 */

 export default class App extends Component {
     
    handleClick = () => message.success('This is a success message');
     render = () => <Button type="primary" onClick={this.handleClick}>Primary</Button>
 }