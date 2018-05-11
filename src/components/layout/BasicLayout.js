import React from 'react';
import {Layout, Menu, Icon} from 'antd';
import style from  './BasicLayout.css';
import Home from '../Home';
import SetIp from '../setIp/SetIp';
import {Route, Switch} from 'dva/router';
import NewGroup from '../cgroup/NewCgroup';
import GroupList from '../cgroup/GroupList';
import Cpu from '../subsystem/Cpu';
import Mem from '../subsystem/Mem';
import Blkio from '../subsystem/Blkio';
import Cpuset from '../subsystem/Cpuset';
import Devices from '../subsystem/Devices';
import SysMonitor from '../sysinfo/SysMonitor';
import Exec from '../exec/Exec';

const SubMenu = Menu.SubMenu;
const {Header, Content, Footer} = Layout;


class BasicLayout extends React.Component {
  componentWillMount(){
    var ip = localStorage.getItem("ip");
    if (ip === "" || ip === null) {
      () => this.refs.setIp.showModal();
    }
  }
  handleChangeMenu = (item, key, selectdKeys) => {
    switch (item.key) {
      case "newCgroup" : {
        break;
      }
      case "cgroupList" : {
        break;
      }
      case "cpu" : {
        break;
      }
      case "memory" : {
        break;
      }
      case "blkio" : {
        break;
      }
      case "cpuset" :{
        break;
      }
      case "devices" :{
        break;
      }
      case "freezer" :{
        break;
      }
      case "cpuacct" :{
        break;
      }
      case "dashboard" : {
        break;
      }
      case "changIp" :{
        this.refs.setIp.showModal();
        break;
      }
      default :{

      }
    }
  };
  render() {
    return (
      <Layout className="layout">
        <Header className={style.header}>
          <a href={'/'} ><div className={style.logo} /></a>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            onClick={this.handleChangeMenu}
            style={{lineHeight: '45px'}}
          >
            <Menu.Item key={'home'} ><a href={'/'}><Icon type="home"/>主页</a></Menu.Item>
            <SubMenu title={<span><Icon type="menu-fold" />CGroup</span>}>
              <Menu.Item key="newCgroup"><a href={"/#/group/new"}>新建Group</a></Menu.Item>
              <Menu.Item key="cgroupList"><a href={"/#/group/list"}>Group列表</a></Menu.Item>
            </SubMenu>
            <SubMenu title={<span><Icon type="tool" />子系统</span>}>
              <Menu.Item key="cpu"><a href={"/#/subsystem/cpu"}>Cpu</a></Menu.Item>
              <Menu.Item key="memory"><a href={"/#/subsystem/memory"}>Memory</a></Menu.Item>
              <Menu.Item key="blkio"><a href={"/#/subsystem/blkio"}>Blkio</a></Menu.Item>
              {/*<Menu.Item key="cpuset"><a href={"/#/subsystem/cpuset"}>Cpuset</a></Menu.Item>*/}
              {/*<Menu.Item key="devices"><a href={"/#/subsystem/devices"}>Devices</a></Menu.Item>*/}
            </SubMenu>
            <Menu.Item key="exec"><a href={'/#/exec'}><Icon type="codepen" />执行服务</a></Menu.Item>
            <Menu.Item key="dashboard"><a href={'/#/sys/monitor'}><Icon type="dashboard" />系统监控</a></Menu.Item>
            <Menu.Item key="changIp" style={{float:'right'}}><Icon type="logout" />切换IP</Menu.Item>
          </Menu>
        </Header>
        <Content>
          <div style={{background: '#ECECEC', padding: 15}}>
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/group/new" exact component={NewGroup}/>
              <Route path="/group/list" exact component={GroupList}/>
              <Route path='/subsystem/cpu' exact component={Cpu}/>
              <Route path='/subsystem/memory' exact component={Mem}/>
              <Route path='/subsystem/blkio' exact component={Blkio}/>
              <Route path='/subsystem/cpuset' exact component={Cpuset}/>
              <Route path='/subsystem/devices' exact component={Devices}/>
              <Route path='/sys/monitor' exact component={SysMonitor}/>
              <Route path='/exec' exact component={Exec}/>
            </Switch>
          </div>
          <div>
            <SetIp ref='setIp'/>
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
