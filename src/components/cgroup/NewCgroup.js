import React from 'react';
import { Card, Col, Form, Row, Input, Tooltip, Icon, Button } from 'antd';
import Api from '../../common/Api';
import { notification } from 'antd/lib/index';

const FormItem = Form.Item;

var $ = require('jquery');


class NewGroupFormCom extends React.Component {
  state = {
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        $.ajax({
          url: Api.newGroup,
          dataType: 'json',
          type: 'POST',
          data: values,
          success: res => {
            notification['success']({
              message: 'Group创建成功',
              description: '返回值:' + res.result,
            });
          },
          error: (res, textStatus) => {
            notification['error']({
              message: '请求失败',
              description: '返回值:' + res.result,
            });
          }
        });
        console.log('Received values of form: ', values);
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
              type: 'string', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your Group Path!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              子系统&nbsp;
              <Tooltip title="Group需要关联的子系统">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('subSystems', {
            rules: [{ required: true, message: '请输入子系统列表,以\',\'分隔', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">新建</Button>
        </FormItem>
      </Form>
    );
  }
}

const NewGroupForm = Form.create()(NewGroupFormCom)

class NewCgroup extends React.Component {
  render() {
    return (
      <Row gutter={0}>
        <Col span={18} offset={3}>
          <Card title="新建Group" bordered={false}>
            <NewGroupForm />
          </Card>
        </Col>
      </Row>
    );
  }
}

export default NewCgroup;
