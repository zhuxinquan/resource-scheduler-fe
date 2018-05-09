import React from 'react';
import Api from '../../common/Api';
import { notification, Popconfirm, message, Row, Col, Alert } from 'antd';
import { Card } from 'antd';
import { Table } from 'antd';

var $ = require('jquery');
var _ = require('lodash');

class GroupList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupInfo: [],
    };
  }

  componentWillMount() {
    this.getGroupInfo();
  }

  componentWillReceiveProps(props) {
    this.getGroupInfo();
  }

  confirm = (path) => {
    $.ajax({
      url: Api.deleteGroup,
      type: 'POST',
      data: { path: path },
      dataType: 'json',
      success: () => {
        message.success('删除成功');
        this.getGroupInfo();
      },
      error: (res, textStatus) => {
        notification['error']({
          message: '请求失败',
          description: '返回值:' + res.responseText,
        });
      },
    });
  };
  cancel = () => {
  };
  getColumns = () => {
    const columns = [{
      title: 'Group 路径',
      dataIndex: 'groupPath',
    }, {
      title: '子系统列表',
      dataIndex: 'subSystems',
      render: (text, record) => {
        return _.join(text, ',');
      },
    }, {
      title: '操作',
      render: (text, record) => {
        return (
          <Popconfirm title="确定删除该Group？删除时该Group所有进程被Kill，子Group被删除！" onConfirm={(e) => this.confirm(record.groupPath)}
                      onCancel={this.cancel}>
            <a>删除</a>
          </Popconfirm>
        );
      },
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
        this.setState({ groupInfo: info });
      },
      error: (res, textStatus) => {
        notification['error']({
          message: '请求失败',
          description: '返回值:' + res.responseText,
        });
      },
    });
  };

  render() {
    return (
      <Card title="Group列表" extra={
        <Alert message="/rs路径为默认起始路径" type="info" showIcon/>
      } bordered={true}>
        <Table bordered={true} rowKey={record => record.groupPath} columns={this.getColumns()}
               dataSource={this.state.groupInfo}/>
      </Card>
    );
  }
}

export default GroupList;
