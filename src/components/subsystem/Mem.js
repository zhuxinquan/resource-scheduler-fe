import React from 'react';
import { Card, Col, Form, Row, Input, Tooltip, Icon, Button, Alert, Select } from 'antd';
import Api from '../../common/Api';
import { notification } from 'antd/lib/index';

const FormItem = Form.Item;

var $ = require('jquery');
var _ = require('lodash');


class MemCom extends React.Component {
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
              description: '返回值:' + res.responseJSON.result,
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
            initialValue: 'memory',
            rules: [{
              type: 'string',
            }, {
              required: true,
            }],
          })(
            <Input disabled={true}/>,
          )}
        </FormItem>
        <Row>
          <Col span={16} offset={8}>
            <Alert message="注意" type="warning" showIcon
                   description="在设定 memory.memsw.limit_in_bytes 参数“之前”设定 memory.limit_in_bytes 参数非常重要：顺序颠倒会导致错误。这是因为 memory.memsw.limit_in_bytes 只有在消耗完所有内存限额（之前在 memory.limit_in_bytes 中设定）后方可用。"/>
          </Col>
        </Row>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              memory.limit_in_bytes&nbsp;
              <Tooltip title="设定用户内存（包括文件缓存）的最大用量。如果没有指定单位，则该数值将被解读为字节。但是可以使用后缀代表更大的单位 —— k 或者 K 代表千字节，m 或者 M 代表兆字节 ，g 或者 G 代表千兆字节。
您不能使用 memory.limit_in_bytes 限制 root cgroup；您只能对层级中较低的群组应用这些值。
在 memory.limit_in_bytes 中写入 -1 可以移除全部已有限制。">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('memory__limit_in_bytes', {
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
              memory.memsw.limit_in_bytes&nbsp;
              <Tooltip title="设定内存与 swap 用量之和的最大值。如果没有指定单位，则该值将被解读为字节。但是可以使用后缀代表更大的单位 —— k 或者 K 代表千字节，m 或者 M 代表兆字节，g 或者 G 代表千兆字节。
您不能使用 memory.memsw.limit_in_bytes 来限制 root cgroup；您只能对层级中较低的群组应用这些值。
在 memory.memsw.limit_in_bytes 中写入 -1 可以删除已有限制。">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('memory__memsw__limit_in_bytes', {
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
              memory.force_empty&nbsp;
              <Tooltip
                title="当设定为 0 时，该 cgroup 中任务所用的所有页面内存都将被清空。这个接口只可在 cgroup 没有任务时使用。如果无法清空内存，请在可能的情况下将其移动到父 cgroup 中。移除 cgroup 前请使用 memory.force_empty 参数以免将废弃的页面缓存移动到它的父 cgroup 中。">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('memory__force_empty', {
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
              memory.swappiness&nbsp;
              <Tooltip title="将 kernel 倾向设定为换出该 cgroup 中任务所使用的进程内存，而不是从页高速缓冲中再生页面。这与 /proc/sys/vm/swappiness 为整体系统设定的倾向、计算方法相同。默认值为 60。低于 60 会降低 kernel 换出进程内存的倾向；高于 0 会增加 kernel 换出进程内存的倾向。高于 100 时，kernel 将开始换出作为该 cgroup 中进程地址空间一部分的页面。
请注意：值 0 不会阻止进程内存被换出；系统内存不足时，换出仍可能发生，因为全局虚拟内存管理逻辑不读取该 cgroup 值。要完全锁定页面，请使用 mlock() 而不是 cgroup。">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('memory__swappiness', {
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
              memory.use_hierarchy&nbsp;
              <Tooltip
                title="包含标签（0 或者 1），它可以设定是否将内存用量计入 cgroup 层级的吞吐量中。如果启用（1），内存子系统会从超过其内存限制的子进程中再生内存。默认情况下（0），子系统不从任务的子进程中再生内存。">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('memory__use_hierarchy', {
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
              memory.oom_control&nbsp;
              <Tooltip
                title="包含标签（0 或者 1），它可以为 cgroup 启用或者禁用“内存不足”（Out of Memory，OOM） 终止程序。如果启用（0），尝试消耗超过其允许内存的任务会被 OOM 终止程序立即终止。默认情况下，所有使用 memory 子系统的 cgroup 都会启用 OOM 终止程序。要禁用它，请在 memory.oom_control 文件中写入 1, 禁用 OOM 杀手程序后，尝试使用超过其允许内存的任务会被暂停，直到有额外内存可用。">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('memory__oom_control', {
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

const MemForm = Form.create()(MemCom);

class MemPara extends React.Component {
  render() {
    return (
      <Row gutter={0}>
        <Col span={18} offset={3}>
          <Card title="Memory子系统"
                extra={
                  <Row>
                    <Col span={24} offset={0}>
                      <Alert message="memory 子系统自动生成 cgroup 任务使用内存资源的报告，并限定这些任务所用内存的大小" type="info" showIcon/>
                    </Col>
                  </Row>
                } bordered={true}>
            <MemForm/>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default MemPara;
