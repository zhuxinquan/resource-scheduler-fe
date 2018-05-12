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
          description: '返回值:' + res.responseJSON.result,
        });
      },
    });
  };
  cancel = () => {
  };
  getColumns = () => {
    const columns = [{
      title: 'Group名称',
      dataIndex: 'groupPath',
    }, {
      title: '权重(1 - 10)',
      dataIndex: 'weight',
      // render: (text, record) => {
      //   return _.join(text, ',');
      // },
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
          <Popconfirm title="确定删除该Group？删除时该Group所有进程被Kill！" onConfirm={(e) => this.confirm(record.groupPath)}
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
          description: '返回值:' + res.responseJSON.result,
        });
      },
    });
  };

  render() {
    return (
      <Card title="Group列表" bordered={true}>
        <Table bordered={true} rowKey={record => record.groupPath} columns={this.getColumns()}
               dataSource={this.state.groupInfo}/>
      </Card>
    );
  }
}

export default GroupList;
