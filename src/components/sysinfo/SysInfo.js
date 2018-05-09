import echarts from 'echarts';
import React from 'react';
import Api from '../../common/Api';
import { notification } from 'antd/lib/index';
import { Row, Col } from 'antd';


var $ = require('jquery');


class EchartsCpu extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cpu: 0,
      mem: 0,
    };
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      $.ajax({
        url: Api.getSysInfo,
        dataType: 'json',
        type: 'GET',
        success: res => {
          let info = $.parseJSON(res.result);
          let cpuRate =  parseFloat(info.cpuUserUse) + parseFloat(info.cpuSysUse)
          if (cpuRate > 100) {
            cpuRate = 100
          }
          this.setState({
            cpu: parseFloat((cpuRate).toFixed(2)),
            mem: parseFloat(info.memRate)
          });
        },
        error: (res, textStatus) => {
          notification['error']({
            message: '请求失败',
            description: '返回码:' + res.status + ';返回值:' + res.responseText,
          });
        }
      });
      // 基于准备好的dom，初始化echarts实例
      var cpuChart = echarts.init(document.getElementById('echarts-cpu'));
      var memChart = echarts.init(document.getElementById('echarts-mem'));
      // 绘制图表
      cpuChart.setOption({
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        title: {
          left: 'center',
          text: 'CPU使用率',
        },
        toolbox: {
          show : true,
          feature : {
            mark : {show: true},
            restore : {show: false},
            saveAsImage : {show: false}
          }
        },
        series : [
          {
            name:'CPU',
            type:'gauge',
            detail : {formatter:'{value}%'},
            data:[{value: this.state.cpu, name: 'CPU'}]
          }
        ]
      });
      memChart.setOption({
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        title: {
          left: 'center',
          text: '内存使用率',
        },
        toolbox: {
          show : true,
          feature : {
            mark : {show: true},
            restore : {show: false},
            saveAsImage : {show: false}
          }
        },
        series : [
          {
            name:'Mem',
            type:'gauge',
            detail : {formatter:'{value}%'},
            data:[{value: this.state.mem, name: 'Mem'}]
          }
        ]
      });
    },2000);
  }
  render() {
    return (
      <Row gutter={3}>
        <Col className="gutter-row" span={12}>
          <div id="echarts-cpu" style={{ width: 300, height: 300}}></div>
        </Col>
        <Col className="gutter-row" span={12}>
          <div id="echarts-mem" style={{ width: 300, height: 300}}></div>
        </Col>
      </Row>
    );
  }
}

export default EchartsCpu;
