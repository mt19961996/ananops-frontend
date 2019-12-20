
//const target = 'http://39.104.189.84:30300';  //阿里云IP
// const target = 'http://10.128.175.8:8086'
//const target = 'http://10.112.217.199:8100';
//  const target = 'http://10.112.9.107:7979';
  const target='http://www.ananops.com:29995';

const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy(['/uac','/pmc','/mdmc'],{target})
    // proxy(['/default'],{target})
  );
};