import React from 'react';
import { Card, Col, Form, Row, Input, Tooltip, Icon, Button, Select, Alert } from 'antd';
import Api from '../../common/Api';
import { notification } from 'antd/lib/index';

const FormItem = Form.Item;

var $ = require('jquery');
var _ = require('lodash');


class CpusetCom extends React.Component {
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
            initialValue: 'cpuset',
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
              cpuset.cpus&nbsp;
              <Tooltip title="设定该 cgroup 任务可以访问的 CPU。这是一个逗号分隔列表，格式为 ASCII，小横线（-）代表范围。">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('cpuset__cpus', {
            rules: [{
              type: 'string',
            }, { required: true }],
          })(
            <Input/>,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              cpuset.mems&nbsp;
              <Tooltip title="设定该 cgroup 中任务可以访问的内存节点。这是一个逗号分隔列表，格式为 ASCII，小横线（-）代表范围。">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('cpuset__mems', {
            rules: [{
              type: 'string',
            }, { required: true }],
          })(
            <Input/>,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
             cpuset.memory_migrate&nbsp;
              <Tooltip
                title="包含一个标签（0 或者 1），用来指定当 cpuset.mems 的值更改时，是否应该将内存中的页迁移到新节点。默认情况下禁止内存迁移（0）且页就保留在原来分配的节点中，即使此节点不再是 cpuset.mems 指定的节点。如果启用（1），系统会将页迁移到 cpuset.mems 指定的新参数的内存节点中，如果可能的话会保留其相对位置。">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('cpuset__memory_migrate', {
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
              cpuset.cpu_exclusive&nbsp;
              <Tooltip title="包含标签（0 或者 1），它可以指定：其它 cpuset 及其父、子 cpuset 是否可共享该 cpuset 的特定 CPU。默认情况下（0），CPU 不会专门分配给某个 cpuset 。">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('cpuset__cpu_exclusive', {
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
              cpuset.mem_exclusive&nbsp;
              <Tooltip
                title="包含标签（0 或者 1），它可以指定：其它 cpuset 是否可共享该 cpuset 的特定内存节点。默认情况下（0），内存节点不会专门分配给某个 cpuset 。为某个 cpuset 保留其专用内存节点（1）与使用 cpuset.mem_hardwall 参数启用内存 hardwall 功能是一样的。">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('cpuset__mem_exclusive', {
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
              cpuset.mem_hardwall&nbsp;
              <Tooltip
                title="包含标签（0 或者 1），它可以指定：内存页和缓冲数据的 kernel 分配是否受到 cpuset 特定内存节点的限制。默认情况下 0，页面和缓冲数据在多用户进程间共享。启用 hardwall 时（1）每个任务的用户分配可以保持独立。">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('cpuset__mem_hardwall', {
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
              cpuset.memory_pressure_enabled&nbsp;
              <Tooltip
                title="包含标签（0 或者 1），它可以设定系统是否计算该 cgroup 进程生成的“内存压力”。计算出的值会输出到 cpuset.memory_pressure，代表进程试图释放被占用内存的速率，报告值为：每秒尝试回收内存的整数值再乘以 1000。">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('cpuset__memory_pressure_enabled', {
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
              cpuset.memory_spread_page&nbsp;
              <Tooltip
                title="包含标签（0 或者 1），它可以设定文件系统缓冲是否应在该 cpuset 的内存节点中均匀分布。默认情况下 0，系统不会为这些缓冲平均分配内存页面，缓冲被置于生成缓冲的进程所运行的同一节点中。">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('cpuset__memory_spread_page', {
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
              cpuset.memory_spread_slab&nbsp;
              <Tooltip
                title="包含标签（0 或者 1），它可以设定是否在 cpuset 间平均分配用于文件输入 / 输出操作的 kernel 高速缓存板。默认情况下 0，kernel 高速缓存板不被平均分配，高速缓存板被置于生成它们的进程所运行的同一节点中。">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('cpuset__memory_spread_slab', {
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
              cpuset.sched_load_balance&nbsp;
              <Tooltip
                title="包含标签（0 或者 1），它可以设定 kernel 是否在该 cpuset 的 CPU 中平衡负载。默认情况下 1，kernel 将超载 CPU 中的进程移动到负载较低的 CPU 中以便平衡负载。
请注意：如果任意一个父 cgroup 启用负载平衡，那么在 cgroup 中设定这个标签将没有任何效果，因为负载平衡已在更高层级中运行。因此，要禁用 cgroup 中的负载平衡，则层级中的每一个父 cgroup 负载平衡都要禁用。这里您还应该考虑是否在所有平级 cgroup 中启用负载平衡。">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('cpuset__sched_load_balance', {
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
              cpuset.sched_relax_domain_level&nbsp;
              <Tooltip
                title="包含 -1 到一个小正数间的整数，它代表 kernel 应尝试平衡负载的 CPU 宽度范围。如果禁用 cpuset.sched_load_balance，则该值无意义。">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('cpuset__sched_relax_domain_level', {
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

const CpusetForm = Form.create()(CpusetCom);

class CpusetPara extends React.Component {
  render() {
    return (
      <Row gutter={0}>
        <Col span={18} offset={3}>
          <Card title="Cpuset子系统"
                extra={
                  <Row>
                    <Col span={24} offset={0}>
                      <Alert message="cpuset 子系统可以为 cgroup 分配独立 CPU 和内存节点" type="info" showIcon/>
                    </Col>
                  </Row>
                }  bordered={true}>
            <CpusetForm/>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default CpusetPara;
