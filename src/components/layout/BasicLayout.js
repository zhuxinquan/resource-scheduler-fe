import React from 'react';
import {Layout, Menu, Icon} from 'antd';
import style from  './BasicLayout.css';
import Home from '../Home'
import SetIp from '../setIp/SetIp'
import {Route, Switch} from 'dva/router'

const SubMenu = Menu.SubMenu;
const {Header, Content, Footer} = Layout;

// const MenuMap = {
//   "home": Home
// };

class BasicLayout extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      Content: Home
    };
  }
  componentWillMount(){
    var ip = localStorage.getItem("ip");
    if (ip === "" || ip === null) {
      () => this.refs.setIp.showModal();
    }
  }
  handleChangeContent = (component) => {
    this.setState({
      Content: component
    });
  };
  handleChangeMenu = (item, key, selectdKeys) => {
    console.log("item:", item, "key:", key, "select: ",selectdKeys);
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
        this.setState({
          Content: Home
        })
      }
    }
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
            onClick={this.handleChangeMenu}
            style={{lineHeight: '45px'}}
          >
            <SubMenu title={<span><Icon type="menu-fold" />CGroup</span>}>
              <Menu.Item key="newCgroup">新建Group</Menu.Item>
              <Menu.Item key="cgroupList">Group列表</Menu.Item>
            </SubMenu>
            <SubMenu title={<span><Icon type="menu-fold" />子系统</span>}>
              <Menu.Item key="cpu">Cpu</Menu.Item>
              <Menu.Item key="memory">Memory</Menu.Item>
              <Menu.Item key="blkio">Blkio</Menu.Item>
              <Menu.Item key="cpuset">Cpuset</Menu.Item>
              <Menu.Item key="devices">Devices</Menu.Item>
              <Menu.Item key="freezer">Freezer</Menu.Item>
              <Menu.Item key="cpuacct">Cpuacct</Menu.Item>
            </SubMenu>
            <Menu.Item key="dashboard"><Icon type="dashboard" />系统监控</Menu.Item>
            <Menu.Item key="changIp" style={{float:'right'}}><Icon type="logout" />切换IP</Menu.Item>
          </Menu>
        </Header>
        <Content style={{marginTop: '15px'}}>
          <Switch>
            <Route path="/" component={Home}/>
            <Route path="/home" component={Home}/>
          </Switch>
          {/*<div style={{background: '#fff', padding: 24, minHeight: 500}}>*/}
            {/*<this.state.Content ref="content"/>*/}
          {/*</div>*/}
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
