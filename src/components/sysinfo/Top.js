import React from 'react';
import Api from '../../common/Api';
import { notification } from 'antd/lib/index';
import { Card, Table, Input, Button, Switch } from 'antd';


var $ = require('jquery');
var _ = require('lodash');


class Top extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      originData: [],
      searchText: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  componentDidMount() {
    this.reloadData();
  }

  onSearchCmd = () => {
    const { searchText } = this.state;
    if (searchText === '') {
      this.setState({
        data: this.state.originData,
      });
      return;
    }
    const reg = new RegExp(searchText, 'gi');
    this.setState({
      data: this.state.originData.map((record) => {
        const match = record.cmd.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          cmd: (
            <span>
                            {record.cmd.split(reg).map((text, i) => (
                              i > 0 ? [<span style={{color: 'red'}}>{match[0]}</span>, text] : text
                            ))}
                        </span>
          ),
        };
      }).filter(record => !!record),
    });
  };

  onInputChange(e) {
    e.persist();
    this.setState({ searchText: e.target.value }, () => this.onSearchCmd());
  };

  reloadData = () => {
    $.ajax({
      dataType: 'json',
      url: Api.getProcessInfo,
      success: res => {
        let info = $.parseJSON(res.result);
        this.setState({
          originData: info,
        }, () => this.onSearchCmd());
      },
      error: (res, textStatus) => {
        notification['error']({
          message: '请求失败',
          description: '返回值:' + res.responseJSON.result,
        });
      },
    });
  };
  getColumns = () => {
    const columns = [{
      title: 'Pid',
      dataIndex: 'pid',
    }, {
      title: '用户',
      dataIndex: 'user',
    }, {
      title: '运行状态',
      dataIndex: 'state',
      // render: (text, record) => {
      //   return _.join(text, ',');
      // },
    }, {
      title: 'CPU使用率',
      dataIndex: 'cpu',
      render: (text, record) => {
        return text + '%';
      },
    }, {
      title: '内存使用率',
      dataIndex: 'mem',
      render: (text, record) => {
        return text + '%';
      },
    }, {
      title: 'Cmd',
      dataIndex: 'cmd',
      width: 700,
    }];
    return columns;
  };
  onChange = (checked) => {
    // console.log(`switch to ${checked}`);
    if (checked === true) {
      this.timer = setInterval(() => {
        $.ajax({
          dataType: 'json',
          url: Api.getProcessInfo,
          success: res => {
            let info = $.parseJSON(res.result);
            this.setState({
              originData: info,
              data: info,
            }, () => this.onSearchCmd());
          },
          error: (res, textStatus) => {
            notification['error']({
              message: '请求失败',
              description: '返回值:' + res.responseJSON.result,
            });
          },
        });
      }, 2000);
    } else {
      this.timer && clearTimeout(this.timer);
    }
  };
  getExtra = () => {
    return (
      <span>自动刷新：<Switch defaultChecked={false} onChange={(checked) => this.onChange(checked)} /></span>
    )
  };
  render() {
    return (
      <Card title={'进程信息'} extra={this.getExtra()}>
        <Input placeholder="搜索服务或命令" onChange={(e) => this.onInputChange(e)}/>
        <Table size={'small'} bordered={true} rowKey={record => record.pid} columns={this.getColumns()}
               dataSource={this.state.data}/>
      </Card>
    );
  }
}

export default Top;
