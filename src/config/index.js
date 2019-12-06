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
      title: '巡检管理',
      key: '/inspection',
      icon: 'build',
      children: [
        {
          title: '巡检计划管理',
          key: '/inspection/plan',
        },
      ]
    }
  ];
  
  export default menuConfig;