const Api = {

  // favoriteNsInfo (ns){
  //   return '/auth/v2/ns/collect/getInfo?ns='+ns;
  // },
  getGroupInfo: '/agent/cgroup/all/group/info',
  getSysInfo: '/agent/sysinfo',
  setAgentIp : '/agent/cgroup/set/ip',
  newGroup: '/agent/cgroup/new',
  setSubSystemPara: '/agent/metric/set',

};

export default Api;
