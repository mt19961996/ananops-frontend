const menuConfig = [
    {
      title: '首页',
      key: '/',
      icon: 'home'
    },
    {
      title: '用户',
      key: '/user',
      icon: 'user',
      children: [
        {
          title: '联系',
          key: '/user/connect',
        },
        {
          title: '用户列表',
          key: '/user/list',
        },
      ]
    },
    {
      title: '组件',
      key: '/tool',
      icon: 'build',
      children: [
        {
          title: '富文本',
          key: '/tool/rich',
        }
      ]
    }
  ];
  
  export default menuConfig;