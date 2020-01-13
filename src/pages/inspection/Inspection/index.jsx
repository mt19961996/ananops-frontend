import React,{Component,} from 'react'
import { Button,Row,Col,Table,Input,Popconfirm,message,Modal,Form  } from 'antd';
import { Link } from 'react-router-dom'
import moment from 'moment';
import axios from 'axios';

const FIRST_PAGE = 0;
const PAGE_SIZE = 100;
const Search = Input.Search;
class Inspection extends Component{
    constructor(props){
        super(props)
        this.state={
            id:window.localStorage.getItem('id'),
            token:window.localStorage.getItem('token'),
            role:window.localStorage.getItem('role'),
            status:1,
            statusMsg:'',
            roleCode:window.localStorage.getItem('roleCode'),
            current: FIRST_PAGE,
            size: PAGE_SIZE,
            // total: 20, 
            nowCurrent:FIRST_PAGE,
            data:[],
        }
        this.getInfo=this.getInfo.bind(this)
    }
    componentDidMount(){
        this.getInfo(FIRST_PAGE)
    }

  //根据不同的路由，加载不同的信息
  getInfo(page){  
    var location=this.props.location.pathname
    var status
 
    if(location=='/cbd/inspection'){  
      status=2
    }
    else if(location==='/cbd/inspection/execute'){
      status=3
    }
    else if(location==='/cbd/inspection/confirm'){
      status=4
    }
    else if(location==='/cbd/inspection/pay'){
      status=5
    }
    else if(location==='/cbd/inspection/comment'){
      status=6
    }
    else if(location==='/cbd/inspection/finish'){
      status=7
    }
    const { size, } = this.state;
    var whichRole=null
    const {role}=this.state
    if(role==='用户管理员'||role==='用户负责人'||role==='用户值机员')
      whichRole=1;
    else if(role==='服务商管理员'||role==='服务商负责人'||role==='服务商业务员')
      whichRole=2 
    const values={orderBy: "string",pageSize:size,pageNum:page,userId:this.state.id,role:whichRole,status:status,projectId:null}
        axios({
            method: 'POST',
            url: '/imc/inspectionTask/getTaskByUserId',
            headers: {
              'deviceId': this.deviceId,
              'Authorization':'Bearer '+this.state.token,
            },
            data:values
          })
        .then((res) => {
            if(res && res.status === 200){
            this.setState({
                data: res.data.result.taskList,
                nowCurrent:res.data.result.pageNum,
                status:status,
               // roleCode:roleCode,
            });
            console.log(res.data)
            }
        })
        .catch(function (error) {
            console.log(error);
        });
      
}
  //返回不同的状态按钮

  render(){
    const {
      data,
      nowCurrent,
      size, 
      status,
      } = this.state;
      const current = nowCurrent+1
      const limit = size

    return(
      
        <div>
          
        <div className="searchPart">
          <Row>
            {/* <Col span={2}>巡检人姓名：</Col> */}
            {/* <Col span={5}>
              <Search
                placeholder="搜索从这里开始"
                enterButton
                onSearch={value => this.selectActivity(value)}
              />
            </Col> */}
          </Row> 
        </div>
        <Table
          className="group-list-module"
          bordered
          showHeader={true}
          pagination={{
            current,
            pageSize: limit,
            onChange: this.handlePageChange,
            // showTotal: () => `共${allCount} 条数据`
          }}
          rowClassName={this.setRowClassName}
          dataSource={data}
          columns={[
          //   {
          //   title: 'ID ',
          //   key: 'id',
          //   render: (text, record) => {
          //     return ((record.id && record.id) || '--')
          //   }   
          // }, 
          {
            title: '巡检任务ID ',
            key: 'id',
            render: (text, record) => {
              return (record.id && record.id) || '--'
            }
          }, {
            title: '巡检任务名称',
            key: 'taskName',
            render: (text, record) => {
              return (record.taskName && record.taskName) || '--'
            }
          },{
            title: '审核人ID',
            key: 'principalId',
            render: (text, record) => {
              return (record.principalId && record.principalId) || '--'
            }
          },{
            title: '项目ID', 
            key: 'projectId',
            render: (text, record) => {
              return (record.projectId && record.projectId) || '--'
            }
          }, {
            title: '服务商ID',
            key: 'facilitatorId',
            render: (text, record) => {
              return (record.facilitatorId && record.facilitatorId) || '--'
            }
          },{
            title: '巡检类型',
            key: 'inspectionType',
            render: (text, record) => {
              return (record.inspectionType && record.inspectionType) || '--'
            }
          },
          // {
          //   title: '合同ID',
          //   key: 'contractId',
          //   render: (text, record) => {
          //     return (record.contractId && record.contractId) || '--'
          //   }
          // },
          {
            title: '操作',
            render: (text, record, index) => (
              <div className="operate-btns"
                style={{ display: 'block' }}
              >
                <Link
                  to={`/cbd/item/sub/${record.id}`}
                  style={{marginRight:'12px'}}
                >巡检子项</Link>                
                <Link
                  to={`/cbd/item/log/${record.id}`}
                  style={{marginRight:'12px'}}
                >巡检日志</Link>
                 <Link
                  to={`/cbd/item/detail/${record.id}`}
                  style={{marginRight:'12px'}}
                >详情</Link>          
              </div>
            ),
          }]}
        />
      </div>  
    )
}
}
export default Inspection;