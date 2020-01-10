import React, { Component, } from 'react';
import { Button,Row,Col,Table,Input,Popconfirm,message,Modal  } from 'antd';
import { Link } from 'react-router-dom'
import moment from 'moment';
import axios from 'axios'
//import './index.styl'
const FIRST_PAGE = 0;
const PAGE_SIZE = 10;
const Search = Input.Search;
class Bill extends Component{
    constructor(props){
        super(props);
        this.state={
            token:window.localStorage.getItem('token'),
            current: FIRST_PAGE,
            id:window.localStorage.getItem('id'),
            connectVisible:false,
            disVisible:false,
            data:[],
            add:{},
            projectId:null,
        }
        this.getGroupList = this.getGroupList.bind(this);
    }
    componentDidMount(){
        // this.getGroupList(FIRST_PAGE);   
        this.getGroupList();   
    }

    //分页
    handlePageChange = (page) => {
        this.getGroupList(page-1)
    }
    //获取列表信息+分页
    // getGroupList = (page) => {
    //     const { size, } = this.state;
    //     const values={orderBy:'',pageSize:size,pageNum:page}
    //     axios({
    //         method: 'POST',
    //         url: '/pmc/project/getProjectListWithPage',
    //         headers: {
    //            'deviceId': this.deviceId,
    //           'Authorization':'Bearer '+this.state.token,
    //         },
    //         data:values
    //       })
    //     .then((res) => {
    //         if(res && res.status === 200){
    //         console.log(res.data.result)
    //         this.setState({
    //             data: res.data.result.list,
    //             nowCurrent:res.data.result.pageNum-1
    //         }) ;
    //         console.log(this.state.data)
    //         }
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
        
    // }
    //获取信息列表 无分页
    getGroupList = () => {
        const userid=this.state.id
        console.log(userid)
        axios({
            method: 'GET',
            url: '/bill/bill/getallbyuser/{userid}?userid='+userid,
            headers: {
               'deviceId': this.deviceId,
              'Authorization':'Bearer '+this.state.token,
            },
          })
        .then((res) => {
            if(res && res.status === 200){
            console.log(res)
            this.setState({
                data: res.data.result,
            }) ;
            // console.log(this.state.data)
            }
        })
        .catch(function (error) {
            console.log(error);
        });
        
    }
    //删除该项目
    deleteGroup=(record)=>{
        console.log(record)
        axios({
            method:'POST',
            url:'/pmc/project/deleteProjectById/'+record.id,
            headers:{
                'deviceId': this.deviceId,
                'Authorization':'Bearer '+this.state.token,
            }           
        }) 
        .then((res) => {
            if(res && res.status === 200){
            console.log(res.data.result)
            // this.getGroupList(this.state.nowCurrent)
            this.getGroupList()
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    selectActivity=(value)=>{
        axios({
            method: 'POST',
            url: '/pmc/project/getProjectListByGroupId/'+value,
            headers: {
               'deviceId': this.deviceId,
              'Authorization':'Bearer '+this.state.token,
            },
          })
        .then((res) => {
            if(res && res.status === 200){
            console.log(res.data.result)
            this.setState({
                data: res.data.result.list,
                // nowCurrent:res.data.result.pageNum-1
            }) ;
            console.log(this.state.data)
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        const {
         data,
         nowCurrent,
         size,
         add
        } = this.state;
        // const total = allCount
        const current = nowCurrent+1
        const limit = size
        return(
            <div>
                <div className="searchPart">
                <Row>
                    {/* <Col span={2}>巡检人姓名：</Col> */}
                    {/* <Col span={5}>
                    <Search
                        placeholder="请输入组织ID"
                        enterButton
                        onSearch={value => this.selectActivity(value)}
                    />
                    </Col> */}
                    <Col push={20}>
                    {/* <Link to={"/cbd/pro/project/new"}>
                        <Button type="primary">
                                    +新建项目
                        </Button>
                    </Link> */}
                    </Col>
                </Row> 
                </div>
                <Table
                className="group-list-module"
                bordered
                showHeader={true}
                // pagination={{
                //     current,
                //     // total,
                //     pageSize: limit,
                //     onChange: this.handlePageChange,
                //     // showTotal: () => `共${allCount} 条数据`
                // }}
                rowClassName={this.setRowClassName}
                dataSource={data}
                columns={[{
                    title: '账单ID',
                    key: 'id',
                    render: (text, record) => {
                    return ((record.id && record.id) || '--')
                    }   
                }, {
                    title: '支付方式',
                    key: 'paymentMethod',
                    render: (text, record) => {
                    return (record.paymentMethod && record.paymentMethod) || '--'
                    }
                }, {
                    title: '交易方式',
                    key: 'transactionMethod',
                    render: (text, record) => {
                    return (record.transactionMethod && record.transactionMethod) || '--'
                    }
                },{
                    title: '金额', 
                    key: 'amount',
                    render: (text, record) => {
                    return (record.amount&& record.amount) || '--'
                    }
                }, {
                    title: ' 用户ID',
                    key: 'userid',
                    render: (text, record) => {
                    return (record.userid && record.userid) || '--'
                    }
                },{
                    title: '当前时间',
                    key: ' time',
                    render: (text, record) => {
                    return  (record.time &&  moment(parseInt(record.time)).format('YYYY-MM-DD HH:mm:ss')) || '--'
                    }
                },{
                    title: '供应商',
                    key: 'supplier',
                    render: (text, record) => {
                    return (record.supplier && record.supplier) || '--'
                    }
                },
                {
                  title: '工单ID',
                  key: 'wordorderid',
                  render: (text, record) => {
                  return (record.wordorderid && record.wordorderid) || '--'
                  }
              },{
                title: '支付状态',
                key: 'state',
                render: (text, record) => {
                return (record.state && record.state) || '--'
                }
            },
              // {
              //       title: '操作',
              //       render: (text, record, index) => (
              //       <div className="operate-btns"
              //           style={{ display: 'block' }}
              //       >
              //           <Link
              //           to={`/cbd/pro/project/detail/${record.id}`}
              //           style={{marginRight:'12px'}}
              //           >详情</Link>
            
              //           <Link
              //           to={`/cbd/pro/project/edit/${record.id}`}
              //           style={{marginRight:'12px'}}
              //           >修改</Link>
              //       </div>
              //       ),
              //   }
              ]}
                />
         </div>
        )
    }
}
export default Bill;