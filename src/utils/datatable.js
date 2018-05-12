/*
table 封装
this.props: {
  columns,
  url,
}
pagination 配置
current: page, //当前页数参数
pageSize: pageSize //每页显示条数参数
 */

import React from 'react';
import { Table, Input } from 'antd';

var _  = require('lodash');
var $ = require('jquery');

class DataTable extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: [],
      originData: [],
      loading: true,
      search: "",
      pagination: {},
      url: this.props.url,
    };
  }
  setInterval = () => {
    let timerTime = 60;
    if (this.props.timerTime) {
      timerTime = this.props.timerTime;
    }
    setInterval(this.reloadData, timerTime*1000)
  };
  componentDidMount() {
    console.log("com did mount");
    this.reloadData();
    if (this.props.timer) {
      () => this.setInterval()
    }
    () => this.ChangePagination();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.url !== this.state.url) {
      this.setState({
        url: nextProps.url,
      }, this.reloadData);
    }
  }
  ChangePagination = (pagination) => {
    if (pagination === undefined) {
      pagination ={'pageSize':10, showTotal:this.showTotal, showSizeChanger:true, size:"small"};
      if (this.props.pagination === false) {
        pagination= false;
      } else {
        pagination = $.extend(pagination, this.props.pagination)
      }
    }
    this.setState({
      pagination: pagination,
    })
  };
  reloadData = () => {
    console.log("reloadData");
    this.setState({ loading: true });
    $.ajax({
      dataType: 'json',
      url: this.props.url,
      success: res => {
        let info = $.parseJSON(res.result);
        // let columns = res;
        // if (res.result) {
        //   columns = res.result;
        // }
        this.setState({
          originData: info,
          data: info,
          loading: false,
        });
        () => this.handleUpdate(info);
      },
    });
  };
  handleUpdate = (columns) => {
    let filterCloumns = [];
    let search = this.state.search;
    if (search === "" || (search.replace(" ", "").length)===0) {
      filterCloumns = columns;
    } else {
      for (let index in columns) {
        let originText = "";
        let column = columns[index];
        for (let key in column) {
          let value = column[key];
          originText += value;
        }
        let parts = search.split(" ");
        let isAllMatch = true;
        for (var inIndex in parts) {
          var searchPart = parts[inIndex];
          if (searchPart.length>0 && originText.indexOf(searchPart) == -1) {
            isAllMatch = false;
            break;
          }
        }
        if (isAllMatch) {
          column.key = index + 1;
          filterCloumns.push(column);
        }
      }
    }

    let data = filterCloumns;
    // if (this.props.timerCallback) {
    //   this.props.timerCallback(data);
    // }
    this.setState({
      data: data
    })
  };
  handleChange = (event) => {
    console.log(event);
    let value = event.target.value;
    this.setState({
      search: value,
    }, () => this.handleUpdate(this.state.originData))
  };
  showTotal = (total) => {
    return `共 ${total} 条`;
  };
  render() {
    let search = <div></div>
    if (this.props.isNeedSearch) {
      search = <Input placeholder="模糊搜索表格内容(多个关键词请用空格分隔。如：key1 key2)" onChange={(event) => this.handleChange(event)}></Input>;
    }
    let hasBorded = true
    if (this.props.bordered === false){
      hasBorded = false
    }
    return (
      <div className="ant-input-dropdown">
        {search}
        <Table
          bordered = {hasBorded}
          columns={this.props.columns}
          dataSource={this.state.data}
          onChange={() => this.ChangePagination}
          pagination={this.state.pagination}
          loading={this.state.loading}
          rowKey={this.props.rowKey}
          size={this.props.tableSize}
          showHeader={this.props.showHeader}
        />
      </div>
    );
  }
}

export default DataTable;
