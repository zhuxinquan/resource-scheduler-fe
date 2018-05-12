import React from 'react';
import { Card, Col, Form, Row, Input, Tooltip, Icon, Button, Select } from 'antd';
import Api from '../../common/Api';
import { notification } from 'antd/lib/index';

const FormItem = Form.Item;

var $ = require('jquery');
var _ = require('lodash');


class ExecFormCom extends React.Component {
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
          description: '返回值:' + res.responseJSON.result,
        });
      }
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        $.ajax({
          url: Api.execCmd,
          dataType: 'json',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(values),
          success: res => {
            notification['success']({
              message: '服务执行成功',
              description: '返回值:' + res.result,
            });
          },
          error: (res, textStatus) => {
            notification['error']({
              message: '请求失败',
              description: '返回值:' + res.responseJSON.result,
            });
          }
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
          {getFieldDecorator('path', {
            rules: [{
              type: 'string', message: 'The input is not valid E-mail!',
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
          label={(
            <span>
              命令&nbsp;
              <Tooltip title="要执行的命令">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('cmd', {
            rules: [{ required: true, message: '请输入子系统列表,以\',\'分隔', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              执行用户&nbsp;
              <Tooltip title="为空时默认以root用户执行">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('user', {
            rules: [{ required: false}],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">执行</Button>
        </FormItem>
      </Form>
    );
  }
}

const ExecForm = Form.create()(ExecFormCom)

class Exec extends React.Component {
  render() {
    return (
      <Row gutter={0}>
        <Col span={18} offset={3}>
          <Card title="执行服务" bordered={true}>
            <ExecForm />
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Exec;
