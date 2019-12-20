const menuConfig = [
  {
    title: '首页',
    key: '/',
    icon: 'home'
  },
  {
    title: '维修维护',
    key: '/alarm',
    icon: 'build',
    // children: [
    //   {
    //     title: '数据管理',
    //     key: '/service/data',
    //   },

    // ]
  },
  {
    title: '项目管理',
    key: '/contract',
    icon: 'book',
    children:[
      {
        title: '我的合同',
        key: '/contract/management',
      },
      {
        title: '我的项目',
        key: '/contract/project',
      },
    ]
  },
  {
    title:'审批管理',
    key:'/approval',
    icon: 'solution'  
  },
  {
    title:'账单管理',
    key:'/bill',
    icon: 'account-book'  
  },
  {
    title:'人员管理',
    key:'/user',
    icon: 'user'  
  },
  {
    title:'权限管理',
    key:'/authority',
    icon: 'audit'  
  },
  {
    title:'加盟管理',
    key:'/serviceProvider',
    icon: 'team',
    children:[
    {
      title: '加盟服务商',
      key: '/serviceProvider/provider',
    },{
      title: '加盟工程师',
      key: '/serviceProvider/engineer',
    }]
  },
  // {
  //   title:'报警管理',
  //   key:'/alarm',
  //   icon: 'alert'  
  // },
  {
    title:'验收管理',
    key:'/acceptance',
    icon: 'sound'  
  },
  // {
  //   title:'Not Found',
  //   key:'/404',
  //   icon: 'frown'  
  // }
];
  
export default menuConfig;