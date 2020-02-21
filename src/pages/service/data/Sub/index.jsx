import React,{Component,} from 'react'
import { Button,Row,Col,Table,Input,Select,Popconfirm,message  } from 'antd';
import { Link } from 'react-router-dom'
import moment from 'moment';
import './index.styl'
import axios from 'axios'
import ReactDOM from 'react-dom'


const FIRST_PAGE = 0;
const PAGE_SIZE = 10;
const Search = Input.Search;

class Sub extends Component{
  constructor(props){
    super(props)
    this.state={
      data:{},
      token:window.localStorage.getItem('token'),
      roleCode:window.localStorage.getItem('roleCode'),
      size: PAGE_SIZE,
      // total: 20, 
      nowCurrent:FIRST_PAGE,
      data:[],
      status:null,
    }
    this.getInfo=this.getInfo.bind(this)
  }
  componentDidMount(){
    const { 
      match : { params : { id } }
    } = this.props
    this.getInfo(id,FIRST_PAGE)
  }
    //获取工单对应的子项
    getInfo=(id,page)=>{
      const { size, status} = this.state;
      const values={orderBy: "string",pageSize:size,pageNum:page,taskId:id,status:status}
      axios({
        method: 'POST',
        url: '/mdmc/mdmcItem/getItemList',
        headers: {
          'deviceId': this.deviceId,
          'Authorization':'Bearer '+this.state.token,
        },
        data:values
      })
        .then((res) => {
          if(res && res.status === 200){
            console.log(res.data.result)
            var taskItemList
            var pageNum
            res.data.result==null?taskItemList=[]:taskItemList=res.data.result.taskItemList
            res.data.result==null?pageNum=0:pageNum=res.data.result.pageNum
            this.setState({
              data:taskItemList,
              nowCurrent:pageNum,
              //status:status,
              // roleCode:roleCode,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
        
    }
    //搜索
   selectActivity = (value) => {     
     this.setState({status:value})
   }
   //改变备品备件状态
   changeStatus(Id,status,msg){
     const { 
       match : { params : { id } }
     } = this.props
     const values={"status": status,"statusMsg": msg,"itemId":Id}
     axios({
       method: 'POST',
       url: '/mdmc/mdmcItem/modifyItemStatusByItemId',
       headers: {
         'Content-Type': 'application/json',
         'deviceId': this.deviceId,
         'Authorization':'Bearer '+this.state.token,
       },
       data:JSON.stringify(values)
     })
       .then((res) => {
         if(res && res.status === 200){
           this.getInfo(id,FIRST_PAGE)
         }
       })
       .catch(function (error) {
         console.log(error);
       });
   }
   
   render(){
     const { 
       match : { params : { id } }
     } = this.props
     const {
       data,
       nowCurrent,
       size, 
       roleCode
     } = this.state;
     const current = nowCurrent+1
     const limit = size
     console.log(roleCode)
     return(
       <div>
         <div className="searchPart">
           <Row>            
             <Col span={3}>
               <Link to="/cbd/maintain/data">返回上级</Link>
             </Col>
             {/* <Col span={3}>任务子项状态：</Col> */}
             <Col span={3}>
               <Select placeholder="请选择任务子项状态"
                 style={{ width: 180 }}
                 onChange={this.selectActivity}
               >
                 <Select.Option key="0"
                   value={1}
                 >无备件</Select.Option>
                 <Select.Option key="1" 
                   value={2}
                 >待审核</Select.Option>
                 <Select.Option key="2" 
                   value={3}
                 >已通过</Select.Option>
                 <Select.Option key="3" 
                   value={4}
                 >未通过</Select.Option>
               </Select>
             </Col>
             <Col span={2}>
               <Button  
                 type="primary" 
                 onClick={() => {this.getInfo(id,0)}}
               >搜索</Button>
             </Col>
             <Col push={12}>
               {roleCode=="user_watcher"&&<Link to={`/cbd/service/sub/new/${id}`}>
                 <Button type="primary">
                                +新建任务子项
                 </Button>
               </Link>}
             </Col>
           </Row> 
         </div>
         <Table
           className="group-list-module"
           bordered
           showHeader={true}
           pagination={{
             current,
             // total,
             pageSize: size,
             onChange: this.handlePageChange,
             // showTotal: () => `共${allCount} 条数据`
           }}
           rowClassName={this.setRowClassName}
           dataSource={data}
           columns={[{
             title: '工单编号 ',
             key: 'taskId',
             render: (text, record) => {
               return ((record.taskId && record.taskId) || '--')
             }   
           }, {
             title: '子任务编号',
             key: 'id',
             render: (text, record) => {
               return ((record.id && record.id) || '--')
             }   
           }, {
             title: '设备名称',
             key: 'deviceName',
             render: (text, record) => {
               return (record.deviceName && record.deviceName) || '--'
             }
           }, {
             title: '设备编号',
             key: 'deviceId',
             render: (text, record) => {
               return (record.deviceId && record.deviceId) || '--'
             }
           },{
             title: '设备纬度', 
             key: 'deviceLatitude',
            
             render: (text, record) => {
               return (record.deviceLatitude && record.deviceLatitude) || '--'
             }
           }, {
             title: '设备经度',
             key: 'deviceLongtitude',
             render: (text, record) => {
               return (record.deviceLongtitude && record.deviceLongtitude) || '--'
             }
           },{
             title: '报修人',
             key: 'creator',
             render: (text, record) => {
               return (record.creator && record.creator) || '--'
             }
           },{
             title: '故障等级',
             key: 'level',
             render: (text, record) => {
               return (record.level && record.level) || '--'
             }
           },{
             title: '故障描述',
             key: 'description',
             render: (text, record) => {
               return (record.description && record.description) || '--'
             }
           },{
             title: '操作',
             render: (text, record, index) => (
               <div className="operate-btns"
                 style={{ display: 'block' }}
               >
                 <Link
                   to={`/cbd/service/sublog/${id}/${record.id}`}
                   style={{marginRight:'12px'}}
                 >子项日志</Link>
                 <Link
                   to={`/cbd/service/subplan/${id}/${record.id}`}
                   style={{marginRight:'12px'}}
                 >备件方案</Link>
                 {(roleCode==='user_leader'&&this.state.status=='2')&&
                 <div>
                   <Button 
                     type="simple"
                     style={{border:'none',padding:0,color:"#357aff",background:'transparent',marginRight:'12px'}}
                     onClick={()=>{this.changeStatus(record.id,3,'用户负责人通过备件方案')}}
                   >通过</Button>
                   <Button 
                     type="simple"
                     style={{border:'none',padding:0,color:"#357aff",background:'transparent'}}
                     onClick={()=>{this.changeStatus(record.id,4,'驳回备件方案')}}
                   >拒绝</Button>
                 </div>
                 }
               </div>
             ),
           }]}
         />
       </div>  
     )
   }
}
export default Sub