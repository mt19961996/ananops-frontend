import React, { Component, } from 'react';
import {Route} from 'react-router-dom';
import { Tabs } from 'antd';
import Test from './Test';
import axios from 'axios'
import './index.styl'
const TabPane = Tabs.TabPane;

class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {
        tabKey:"",
        role:window.localStorage.getItem('role'),
    };
    this.onTabChange=this.onTabChange.bind(this);
    // this.getUserInfo=this.getUserInfo.bind(this)
  }
  componentDidMount(){
    //   this.getUserInfo()
  }

  //tab栏每一个状态之间切换
  onTabChange=(key)=>{

    this.setState({tabKey:key});
    this.props.history.replace({pathname:"/cbd/maintain/data/"+key,state:{tabKey:key}});
    
  }

  //返回用户id和角色的信息
//   getUserInfo(){
//     const username=window.localStorage.getItem('loginName')
//     const token=window.localStorage.getItem('token')
//     axios({
//       method: 'POST',
//       url: '/uac/user/queryUserInfo/'+username,
//       headers: {
//         'deviceId': this.deviceId,
//         'Authorization':'Bearer '+token,
//       },
//     })
//   .then((res) => {
//       if(res && res.status === 200){
//       var role=res.data.result.roles?res.data.result.roles[0].roleName:null
//       var roleCode=res.data.result.roles?res.data.result.roles[0].roleCode:null
//       var role=window.localStorage.setItem('role',role)
//       var roleCode=window.localStorage.setItem('roleCode',roleCode)
//       this.setState({role:role})
//       window.localStorage.setItem('id',res.data.result.id)
//       }
//   })
//   .catch(function (error) {
//       console.log(error);
//   });
//   }

  //tab栏不同角色的切换
  getRole=(role)=>{
      console.log(role)
//     if(role==='用户负责人'){
//         return(
//             <Tabs  
//             activeKey={(this.props.location.state && this.props.location.state.tabKey) ? this.props.location.state.tabKey : ''}
//             onChange={this.onTabChange}>
//                 <TabPane 
//                 tab="全部"
//                 key=""
//                 >
//                 <Route exact 
//                     path="/system" 
//                     component={All} 
//                     />
//                 </TabPane>
//                 <TabPane 
//                 tab="待审核"
//                 key="approval"
//                 >
//                 <Route exact 
//                     path="/system/approval" 
//                     component={Approval} 
//                     />
//                 </TabPane>
//                 <TabPane tab="待支付"
//                 key="pay"
//                 >  
//                    <Route exact 
//                     path="/system/pay" 
//                     component={Pay} 
//                     />                        
//                 </TabPane>
//         </Tabs>
//         )
//     }
//     else if(role=='维修工程师'){
//         return(
//             <Tabs 
//             activeKey={(this.props.location.state && this.props.location.state.tabKey) ? this.props.location.state.tabKey : ''}
//             onChange={this.onTabChange}>
//                 <TabPane 
//                 tab="全部"
//                 key=""
//                 >
//                 <Route exact 
//                     path="/system" 
//                     component={All} 
//                     />
//                 </TabPane>
//                 <TabPane 
//                 tab="待接单"
//                 key="check"
//                 >
//                 <Route exact 
//                     path="/system/check" 
//                     component={Check} 
//                     />
//                 </TabPane>
//                 <TabPane tab="维修中"
//                 key="maintain"
//                 >  
//                    <Route exact 
//                     path="/system/maintain" 
//                     component={Maintain} 
//                     />                         
//                 </TabPane>
//         </Tabs>
//         )
//     }
//     else if(role=='用户值机员'){
//         return(
//             <Tabs
//             activeKey={(this.props.location.state && this.props.location.state.tabKey) ? this.props.location.state.tabKey : ''}
//             onChange={this.onTabChange}>
//                  <TabPane 
//                 tab="全部"
//                 key=""
//                 >
//                   <Route exact 
//                     path="/system" 
//                     component={All} 
//                     />
//                 </TabPane>
//                 <TabPane tab="待确认"
//                 key="check"
//                 >  
//                     <Route exact 
//                     path="/system/check" 
//                     component={Check} 
//                     />                                          
//                 </TabPane>
//                 <TabPane 
//                 tab="维修中"
//                 key="maintain"
//                 >
//                    <Route exact 
//                     path="/system/maintain" 
//                     component={Maintain} 
//                     />
//                 </TabPane>
//                 <TabPane 
//                 tab="待验收"
//                 key="examine"
//                 >
//                    <Route exact 
//                     path="/system/examine" 
//                     component={Examine} 
//                     />
//                 </TabPane>
//                 <TabPane 
//                 tab="待评价"
//                 key="comment"
//                 >
//                     <Route exact 
//                     path="/system/comment" 
//                     component={Comment} 
//                     />
//                 </TabPane>
//         </Tabs>
//         )
//     }
//     else if(role=='服务商负责人'){
//         return(
//             <Tabs
//             activeKey={(this.props.location.state && this.props.location.state.tabKey) ? this.props.location.state.tabKey : ''}
//             onChange={this.onTabChange}>
//                  <TabPane 
//                 tab="全部"
//                 key=""
//                 >
//                   <Route exact 
//                     path="/system" 
//                     component={All} 
//                     />
//                 </TabPane>
//                 <TabPane 
//                 tab="待接单"
//                 key="check"
//                 >
//                    <Route exact 
//                     path="/system/check" 
//                     component={Check} 
//                     />
//                 </TabPane>
//                 <TabPane 
//                 tab="待审核"
//                 key="approval"
//                 >
//                     <Route exact 
//                     path="/system/approval" 
//                     component={Approval} 
//                     />
//                 </TabPane>
//         </Tabs>
//         )
//     }
//     else{
//         return(
//             <Tabs
//             activeKey={(this.props.location.state && this.props.location.state.tabKey) ? this.props.location.state.tabKey : ''}
//             onChange={this.onTabChange}>
//                 <TabPane 
//                 tab="全部订单"
//                 key=""
//                 >
//                     <Route exact 
//                     path="/system" 
//                     component={All} 
//                     />
//                 </TabPane>
//         </Tabs>
//         )
//     }
//   }
if(role==='用户负责人'){
    return(
        <Tabs  
        activeKey={(this.props.location.state && this.props.location.state.tabKey) ? this.props.location.state.tabKey : ''}
        onChange={this.onTabChange}>
            <TabPane 
            tab="全部"
            key=""
            >
            <Route exact 
                path="/cbd/maintain/data" 
                component={Test} 
                />
            </TabPane>
            <TabPane 
            tab="工单审核"
            key="orderApproval"
            >
            <Route exact 
                path="/cbd/maintain/data/orderApproval" 
                component={Test} 
                />
            </TabPane>
            <TabPane 
            tab="方案审核"
            key="planApproval"
            >
            <Route exact 
                path="/cbd/maintain/data/planApproval" 
                component={Test} 
                />
            </TabPane>
            <TabPane 
            tab="确认服务"
            key="serviceConfirm"
            >
            <Route exact 
                path="/cbd/maintain/data/serviceConfirm" 
                component={Test} 
                />
            </TabPane>
            <TabPane tab="待支付"
            key="pay"
            >  
               <Route exact 
                path="/cbd/maintain/data/pay" 
                component={Test} 
                />                        
            </TabPane>
    </Tabs>
    )
}
else if(role=='维修工程师'){
    return(
        <Tabs 
        activeKey={(this.props.location.state && this.props.location.state.tabKey) ? this.props.location.state.tabKey : ''}
        onChange={this.onTabChange}>
            <TabPane 
            tab="全部"
            key=""
            >
            <Route exact 
                path="/cbd/maintain/data" 
                component={Test} 
                />
            </TabPane>
            <TabPane 
            tab="待接单"
            key="maintainerWait"
            >
            <Route exact 
                path="/cbd/maintain/data/maintainerWait" 
                component={Test} 
                />
            </TabPane>
            <TabPane tab="方案确定"
            key="planConfirm"
            >  
               <Route exact 
                path="/cbd/maintain/data/planConfirm" 
                component={Test} 
                />                         
            </TabPane>
            <TabPane tab="结果提交"
            key="resultSubmit"
            >  
               <Route exact 
                path="/cbd/maintain/data/resultSubmit" 
                component={Test} 
                />                         
            </TabPane>
    </Tabs>
    )
}
else if(role=='用户值机员'){
    return(
        <Tabs
        activeKey={(this.props.location.state && this.props.location.state.tabKey) ? this.props.location.state.tabKey : ''}
        onChange={this.onTabChange}>
             <TabPane 
            tab="全部"
            key=""
            >
              <Route exact 
                path="/cbd/maintain/data" 
                component={Test} 
                />
            </TabPane>
            <TabPane tab="待审核"
            key="orderSubmit"
            >  
                <Route exact 
                path="/cbd/maintain/data/orderSubmit" 
                component={Test} 
                />                                          
            </TabPane>
            <TabPane 
            tab="确认服务"
            key="serviceFinish"
            >
               <Route exact 
                path="/cbd/maintain/data/serviceFinish" 
                component={Test} 
                />
            </TabPane>
            <TabPane 
            tab="待评价"
            key="comment"
            >
               <Route exact 
                path="/cbd/maintain/data/comment" 
                component={Test} 
                />
            </TabPane>
    </Tabs>
    )
}
else if(role=='服务商管理员'){
    return(
        <Tabs
        activeKey={(this.props.location.state && this.props.location.state.tabKey) ? this.props.location.state.tabKey : ''}
        onChange={this.onTabChange}>
             <TabPane 
            tab="全部"
            key=""
            >
              <Route exact 
                path="/cbd/maintain/data" 
                component={Test} 
                />
            </TabPane>
            <TabPane 
            tab="待接单"
            key="serverWait"
            >
               <Route exact 
                path="/cbd/maintain/data/serverWait" 
                component={Test} 
                />
            </TabPane>
            <TabPane 
            tab="账单审核"
            key="billApproval"
            >
                <Route exact 
                path="/cbd/maintain/data/billApproval" 
                component={Test} 
                />
            </TabPane>
    </Tabs>
    )
}
else{
    return(
        <Tabs
        activeKey={(this.props.location.state && this.props.location.state.tabKey) ? this.props.location.state.tabKey : ''}
        onChange={this.onTabChange}>
            <TabPane 
            tab="全部订单"
            key=""
            >
                <Route exact 
                path="/cbd/maintain/data" 
                component={Test} 
                />
            </TabPane>
    </Tabs>
    )
}
}
  render() {
    const role=window.localStorage.getItem('role')
    return (    
      <div className="plan-approval-list-page">
          {this.getRole(role)}
        
      </div>
      
    );
  }
}

export default Data;