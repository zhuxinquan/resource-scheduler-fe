import React from 'react';
import {Button, Modal, Input, Icon, notification} from 'antd';
import Api from '../../common/Api'

var $ = require('jquery');


class SetIp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      visible: false,
      ip: "127.0.0.1",
    };
    this.onChange=this.onChange.bind(this)
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };
  handleOk = () => {
    this.setState({ loading: true });
    localStorage.setItem("ip", this.state.ip);
    $.ajax({
      url: Api.setAgentIp,
      dataType: 'json',
      type: 'POST',
      data: {
        agentIp: this.state.ip
      },
      success: res => {
        this.setState({ loading: false, visible: false });
      },
      error: (res, textStatus) => {
          notification['error']({
            message: '请求失败',
            description: '返回值:' + res.responseJSON.result,
          });
      },
      complete: (jqXHR, textStatus) => {
        this.setState({
          visible: false,
        })
      }
    });
  };
  onChange(event) {
    this.setState({
      ip:event.target.value
    })
  };
  render() {
    const { visible, loading } = this.state;
    return (
      <Modal
        visible={visible}
        title="请输入要控制的IP地址"
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
            确定
          </Button>
        ]}
      >
        <Input placeholder="Agent Ip" prefix={<Icon type="global" />} defaultValue={'127.0.0.1'} onChange={this.onChange}/>
      </Modal>
    );
  }
}

export default SetIp;
