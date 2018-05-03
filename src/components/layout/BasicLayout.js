import React from 'react';
import {Layout, Menu, Icon} from 'antd';
import style from  './BasicLayout.css';

const SubMenu = Menu.SubMenu;
const {Header, Content, Footer} = Layout;


class BasicLayout extends React.Component {
  state = {
    menu = "home"
  };
  render() {
    return (
      <Layout className="layout">
        <Header className={style.header}>
          <div className={style.logo} />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{lineHeight: '45px'}}
          >
            <SubMenu title={<span><Icon type="menu-fold" />CGroup</span>}>
              <Menu.Item key="cgroup:1">新建Group</Menu.Item>
              <Menu.Item key="cgroup:2">Group列表</Menu.Item>
            </SubMenu>
            <SubMenu title={<span><Icon type="menu-fold" />子系统</span>}>
              <Menu.Item key="subSystem:1">Cpu</Menu.Item>
              <Menu.Item key="subSystem:2">Memory</Menu.Item>
              <Menu.Item key="subSystem:3">Blkio</Menu.Item>
              <Menu.Item key="subSystem:4">Cpuset</Menu.Item>
              <Menu.Item key="subSystem:5">Devices</Menu.Item>
              <Menu.Item key="subSystem:6">Freezer</Menu.Item>
              <Menu.Item key="subSystem:7">Cpuacct</Menu.Item>
            </SubMenu>
            <Menu.Item key="2"><Icon type="dashboard" />系统监控</Menu.Item>
            <Menu.Item key="3" style={{float:'right'}}> <Icon type="logout" />切换IP</Menu.Item>
          </Menu>
          <div className={style.Ip}>123</div>
        </Header>
        <Content style={{marginTop: '15px'}}>
          <div style={{background: '#fff', padding: 24, minHeight: 500}}>
            <this.props.Content />
          </div>
        </Content>
        <Footer style={{textAlign: 'center'}}>
          Resource-Scheduler ©2018 Created By zxq
        </Footer>
      </Layout>
    );
  }
}

export default BasicLayout;
