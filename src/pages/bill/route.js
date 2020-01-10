// import React, { Component, } from 'react';
// import { Switch, Route } from 'react-router-dom';
// import { Spin } from 'antd';
// import Loadable from 'react-loadable';

// class BillRoute extends Component{
//   constructor(props){
//     super(props);
//     this.state = {
     
//     };
 
//   }

//   render(){
//     const Loading = () => {
//       return (
//         <div className="loading">
//           <Spin size="large"></Spin>
//         </div>
//       );
//     };
//     return (
//       <Switch>
//         <Route 
//           exact   
//           path="/cbd/bill"
//           component={Loadable({
//             loader: () => import(
//               /* webpackChunkName: "EntranceWork" */
//               './route'),
//             loading: Loading
//           })}
//         />    
//       </Switch>
//     );
//   }

// }


// export default BillRoute;
