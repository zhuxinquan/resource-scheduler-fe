import React from 'react';
import { Card, Col, Form, Row, Input, Tooltip, Icon, Button, Select, Alert } from 'antd';
import Api from '../../common/Api';
import { notification } from 'antd/lib/index';

const FormItem = Form.Item;

var $ = require('jquery');
var _ = require('lodash');


class BlkioCom extends React.Component {
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
          label="Group名称"
        >
          {getFieldDecorator('groupPath', {
            rules: [{
              type: 'string', message: '请输入Group名称!',
            }, {
              required: true, message: '请输入Group名称!',
            }],
          })(
            <Select placeholder="请选择一个Group">
              {
                _.map(this.state.groupList, (value) => {
                  return <Select.Option value={value}>{value}</Select.Option>;
                })
              }
            </Select>,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="子系统"

        >
          {getFieldDecorator('subSystem', {
            initialValue: 'blkio',
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
              blkio.weight&nbsp;
              <Tooltip title="此参数用于指定一个 cgroup 在默认情况下可存取块 I/O 的相对比例（加权），范围是 100 到 1000。该值可被指定设备的 blkio.weight_device 参数覆盖。">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('blkio__weight', {
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
              blkio.weight_device&nbsp;
              <Tooltip title="此参数用于设定 cgroup 中指定设备 I/O 存取的相对比例（加权），范围是 100 到 1000。对于指定的设备，此参数值可覆盖 blkio.weight 参数值。值的格式为 major:minor weight。其中 major 和 minor 是〈Linux 分配的设备〉所指定的设备类型和节点数，我们也称之为〈Linux 设备列表〉，可从 http://www.kernel.org/doc/Documentation/devices.txt 中找到。">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('blkio__weight_device', {
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
             blkio.throttle.read_bps_device&nbsp;
              <Tooltip
                title="此参数用于设定设备执行“读”操作字节的上限。“读”的操作率以每秒的字节数来限定。条目有三种字段：major、minor 和 bytes_per_second。major 和 minor 是〈Linux 分配的设备〉所指定的设备类型和节点数。bytes_per_second 是“读”操作可被执行的上限率。">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('blkio__throttle__read_bps_device', {
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
              blkio.throttle.read_iops_device&nbsp;
              <Tooltip title="此参数用于设定设备执行“读”操作次数的上限。“读”的操作率以每秒的操作次数来表示。条目有三个字段：major、minor 和 operations_per_second。major 和 minor 是〈Linux 分配的设备〉指定的设备类型和节点数。operations_per_second 是“读”可被执行的上限率。">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('blkio__throttle__read_iops_device', {
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
              blkio.throttle.write_bps_device&nbsp;
              <Tooltip
                title="此参数用于设定设备执行“写”操作次数的上限。“写”的操作率用“字节/秒”来表示。条目有三个字段：major、minor 和 bytes_per_second。major 和 minor 是〈Linux 分配的设备〉指定的设备类型和节点数。bytes_per_second 是“写”操作可被执行的上限率。">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('blkio__throttle__write_bps_device', {
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
              blkio.throttle.write_iops_device&nbsp;
              <Tooltip
                title="此参数用于设定设备执行 “写” 操作次数的上限。“写”的操作率以每秒的操作次数来表示。条目有三个字段：major、minor 和 operations_per_second。major 和 minor 是〈Linux 分配的设备〉指定的设备类型和节点数。operations_per_second 是“写” 操作可被执行的上限率。">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('blkio__throttle__write_iops_device', {
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

const BlkioForm = Form.create()(BlkioCom);

class BlkioPara extends React.Component {
  render() {
    return (
      <Row gutter={0}>
        <Col span={18} offset={3}>
          <Card title="Blkio子系统"
                extra={
                  <Row>
                    <Col span={24} offset={0}>
                      <Alert message="块 I/O（blkio）子系统可以控制并监控 cgroup 中的任务对块设备 I/O 的存取" type="info" showIcon/>
                    </Col>
                  </Row>
                }  bordered={true}>
            <BlkioForm/>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default BlkioPara;
