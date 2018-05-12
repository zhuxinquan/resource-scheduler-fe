import React from 'react';
import Api from '../common/Api';
import { notification } from 'antd';
import { Row, Col } from 'antd';
import { Card } from 'antd';
import { Table } from 'antd';
import SysInfo from './sysinfo/SysInfo';

var $ = require('jquery');
var _ = require('lodash');

class Home extends React.Component {
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
      title: '权重(1 - 10)',
      dataIndex: 'weight',
      // render: (text, record) => {
      //   return _.join(text, ',');
      // },
    },  {
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
          description: '返回值:' + res.responseJSON.result,
        });
      }
    });
  };
  render() {
    return (
      <Row gutter={10} style={{margin: '0 10px'}}>
        <Col span={12}>
          <Card title="Group列表" bordered={true}>
            <Table rowKey={record => record.groupPath} columns={this.getColumns()} dataSource={this.state.groupInfo} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="系统状态" bordered={true}>
            <SysInfo/>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Home;
