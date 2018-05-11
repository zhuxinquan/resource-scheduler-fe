import React from 'react';
import { Card, Col, Form, Row, Input, Tooltip, Icon, Button, Select, Alert } from 'antd';
import Api from '../../common/Api';
import { notification } from 'antd/lib/index';

const FormItem = Form.Item;
const Option = Select.Option;

var $ = require('jquery');
var _ = require('lodash');


class CpuCom extends React.Component {
  state = {
    groupList: [],
  };

  componentWillMount() {
    $.ajax({
      url: Api.groupList,
      dataType: 'json',
      type: 'GET',
      success: res => {
        this.setState({
          groupList: $.parseJSON(res.result),
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
                  return <Option value={value}>{value}</Option>;
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
            initialValue: 'cpu',
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
              cpu.cfs_period_us&nbsp;
              <Tooltip
                title="此参数可以设定重新分配 cgroup 可用 CPU 资源的时间间隔，单位为微秒（µs，这里以 “us” 表示）。如果一个 cgroup 中的任务在每 1 秒钟内有 0.2 秒的时间可存取一个单独的 CPU，则请将 cpu.rt_runtime_us 设定为 2000000，并将 cpu.rt_period_us 设定为 1000000。cpu.cfs_quota_us 参数的上限为 1 秒，下限为 1000 微秒。">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('cpu__cfs_period_us', {
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
              cpu.cfs_quota_us&nbsp;
              <Tooltip title="此参数可以设定在某一阶段（由 cpu.cfs_period_us 规定）某个 cgroup 中所有任务可运行的时间总量，单位为微秒。一旦 cgroup 中任务用完按配额分得的时间，它们就会被在此阶段的时间提醒限制流量，并在进入下阶段前禁止运行。如果 cgroup 中任务在每 1 秒内有 0.2 秒，可对单独 CPU 进行存取，请将 cpu.cfs_quota_us 设定为 200000，cpu.cfs_period_us 设定为 1000000。请注意，配额和时间段参数都根据 CPU 来操作。例如，如要让一个进程完全利用两个 CPU，请将 cpu.cfs_quota_us 设定为 200000，cpu.cfs_period_us 设定为 100000。
如将 cpu.cfs_quota_us 的值设定为 -1，这表示 cgroup 不需要遵循任何 CPU 时间限制。这也是每个 cgroup 的默认值（root cgroup 除外）。">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('cpu__cfs_quota_us', {
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
              cpu.shares&nbsp;
              <Tooltip title="此参数用一个整数来设定 cgroup 中任务 CPU 可用时间的相对比例。例如： cpu.shares 设定为 100 的任务，即便在两个 cgroup 中，也将获得相同的 CPU 时间；但是 cpu.shares 设定为 200 的任务与 cpu.shares 设定为 100 的任务相比，前者可使用的 CPU 时间是后者的两倍，即便它们在同一个 cgroup 中。cpu.shares 文件设定的值必须大于等于 2。
请注意：在多核系统中，CPU 时间比例是在所有 CPU 核中分配的。即使在一个多核系统中，某个 cgroup 受限制而不能 100% 使用 CPU，它仍可以 100% 使用每个单独的 CPU 核。">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('cpu__shares', {
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
              cpu.rt_runtime_us&nbsp;
              <Tooltip
                title="此参数可以指定在某个时间段中， cgroup 中的任务对 CPU 资源的最长连续访问时间，单位为微秒。只可用于实时调度任务。建立这个限制是为了防止一个 cgroup 中的任务独占 CPU 时间。如果 cgroup 中的任务，在每秒内有 0.2 秒可存取 CPU 资源，请将 cpu.rt_runtime_us 设定为 200000，并将 cpu.rt_period_us 设定为 1000000。">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('cpu__rt_runtime_us', {
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
              cpu.rt_period_us&nbsp;
              <Tooltip
                title="此参数可以设定在某个时间段中 ，每隔多久，cgroup 对 CPU 资源的存取就要重新分配，单位为微秒，只可用于实时调度任务。如果某个 cgroup 中的任务，每秒内有 0.2 秒可存取 CPU 资源，则请将 cpu.rt_runtime_us 设定为 200000，并将 cpu.rt_period_us 设定为 1000000。">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('cpu__rt_period_us', {
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

const CpuForm = Form.create()(CpuCom);

class CpuPara extends React.Component {
  render() {
    return (
      <Row gutter={0}>
        <Col span={18} offset={3}>
          <Card title="Cpu子系统"
                extra={
                  <Row>
                    <Col span={24} offset={0}>
                      <Alert message="cpu 子系统可以调度 cgroup 对 CPU 的获取量" type="info" showIcon/>
                    </Col>
                  </Row>
                } bordered={true}>
            <CpuForm/>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default CpuPara;
