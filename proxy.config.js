module.exports = {

  // Forward 到另一个服务器，不指定来源服务器
  'GET /agent/*': "http://0.0.0.0:10086/",
};
