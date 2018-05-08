import React from 'react';
import Api from '../../common/Api';
import { notification } from 'antd';
import { Card } from 'antd';
import { Table } from 'antd';

var $ = require('jquery');
var _ = require('lodash');

class GroupList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      groupInfo: []
    };
  }
  componentWillMount(){
    this.getGroupInfo();
  }
  componentWillReceiveProps(props){
    this.getGroupInfo();
  }
  getColumns = () => {
    const columns = [{
      title: 'Group 路径',
      dataIndex: 'groupPath',
    }, {
      title: '子系统列表',
      dataIndex: 'subSystems',
      render:  (text, record) => {
        return _.join(text, ",")
      }
    }];
    return columns;
  };
  getGroupInfo = () => {
    $.ajax({
      url: Api.getGroupInfo,
      dataType: 'json',
      type: 'GET',
      success: res => {
        let info = $.parseJSON(res.result);
        this.setState({ groupInfo: info});
      },
      error: (res, textStatus) => {
        notification['error']({
          message: '请求失败',
          description: '返回码:' + res.status + ';返回值:' + res.responseText,
        });
      }
    });
  };
  render() {
    return (
      <Card title="Group列表" bordered={true}>
        <Table rowKey={record => record.groupPath} columns={this.getColumns()} dataSource={this.state.groupInfo} />
      </Card>
    );
  }
}

export default GroupList;
