import React from 'react';
import Api from '../common/Api';
import { notification } from 'antd/lib/index';

var $ = require('jquery');

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      groupInfo: null,
      sysInfo: null,
    };
  }
  componentWillMount(){
    this.getGroupInfo();
  }
  componentWillReceiveProps(props){
    this.getGroupInfo();
  }
  getGroupInfo = () => {
    $.ajax({
      url: Api.getGroupInfo,
      dataType: 'json',
      type: 'GET',
      success: res => {
        this.setState({ groupInfo: res.result });
      },
      error: (res, textStatus) => {
        notification['error']({
          message: '请求失败',
          description: '返回码:' + res.status + ';返回值:' + res.responseText,
        });
      }
    });
  };
  getSysInfo = () => {

  };
  render() {
    return (
      <div>Hello</div>
    );
  }
}

export default Home;
