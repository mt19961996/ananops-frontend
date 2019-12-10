const menuConfig = [
  {
    title: '首页',
    key: '/',
    icon: 'home'
  },
  {
    title: '维修维护',
    key: '/service',
    icon: 'build',
    children: [
      {
        title: '我的工单',
        key: '/service/my',
      },
      {
        title: '新建工单',
        key: '/service/new',
      },
    ]
  },
  {
    title: '项目管理',
    key: '/contract',
    icon: 'book',
    children:[
      {
        title: '我的项目',
        key: '/contract/project',
      },{
        title: '我的合同',
        key: '/contract/management',
      },{
        title: '我的巡检',
        key: '/contract/inspection',
      }
    ]
  },
  {
    title:'审批管理',
    key:'/approval',
    icon: 'solution'  
  },
  {
    title:'巡检管理',
    key:'/inspection',
    icon: 'build' 
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
    title:'加盟服务商',
    key:'/serviceProvider',
    icon: 'team'  
  },
  {
    title:'报警管理',
    key:'/alarm',
    icon: 'alert'  
  },
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