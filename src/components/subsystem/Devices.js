import React from 'react';
import { Card, Col, Form, Row, Input, Tooltip, Icon, Button, Select, Alert } from 'antd';
import Api from '../../common/Api';
import { notification } from 'antd/lib/index';

const FormItem = Form.Item;

var $ = require('jquery');
var _ = require('lodash');


class DevicesCom extends React.Component {
  state = {
    groupList: []
  };
  componentWillMount() {
    $.ajax({
      url: Api.groupList,
      dataType: 'json',
      type: 'GET',
      success: res => {
        this.setState({
          groupList: $.parseJSON(res.result)
        })
      },
      error: (res, textStatus) => {
        notification['error']({
          message: '请求失败',
          description: '返回值:' + res.result,
        });
      }
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        $.ajax({
          url: Api.setSubSystemPara,
          dataType: 'json',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(values),
          success: res => {
            notification['success']({
              message: '子系统参数设置成功',
              description: '返回值:' + res.result,
            });
          },
          error: (res, textStatus) => {
            notification['error']({
              message: '请求失败',
              description: '返回值:' + res.result,
            });
          },
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="Path"
        >
          {getFieldDecorator('groupPath', {
            rules: [{
              type: 'string', message: 'Please input your Group Path!',
            }, {
              required: true, message: 'Please input your Group Path!',
            }],
          })(
            <Select placeholder="Please select a country">
              {
                _.map(this.state.groupList, (value) => {
                  return <Select.Option value={value}>{value}</Select.Option>
                })
              }
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="子系统"
        >
          {getFieldDecorator('subSystem', {
            initialValue: 'devices',
            rules: [{
              type: 'string',
            }, {
              required: true,
            }],
          })(
            <Input disabled={true}/>,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              devices.allow&nbsp;
              <Tooltip
                title="指定 cgroup 任务可访问的设备。每个条目有四个字段：type、major、minor 和 access。type、major 和 minor 字段使用的值对应 〈Linux 分配的设备〉（也称为〈Linux 设备列表〉）指定的设备类型和节点数，如需此介绍，请访问 http://www.kernel.org/doc/Documentation/devices.txt。">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('devices__allow', {
            rules: [{
              type: 'string',
            }, { required: false }],
          })(
            <Input/>,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              devices.deny&nbsp;
              <Tooltip
                title="指定 cgroup 任务无权访问的设备。条目语法与 devices.allow 一致。">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('devices__deny', {
            rules: [{
              type: 'string',
            }, { required: false }],
          })(
            <Input/>,
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">设置参数</Button>
        </FormItem>
      </Form>
    );
  }
}

const DevicesForm = Form.create()(DevicesCom);

class DevicesPara extends React.Component {
  render() {
    return (
      <Row gutter={0}>
        <Col span={18} offset={3}>
          <Card title="Devices子系统"
                extra={
                  <Row>
                    <Col span={24} offset={0}>
                      <Alert message="devices 子系统允许或者拒绝 cgroup 任务存取设备" type="info" showIcon/>
                    </Col>
                  </Row>
                } bordered={true}>
            <DevicesForm/>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default DevicesPara;
