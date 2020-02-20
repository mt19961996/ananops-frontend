import React, { Component, } from 'react';
import { Button,Row,Col,Table,Input,Popconfirm,message,Modal  } from 'antd';
import { Link } from 'react-router-dom'
import moment from 'moment';
import Add from './add'
import axios from 'axios'
import './index.styl'
const FIRST_PAGE = 0;
const PAGE_SIZE = 10;
const Search = Input.Search;
class Project extends Component{
    constructor(props){
        super(props);
        this.state={
            token:window.localStorage.getItem('token'),
            role:window.localStorage.getItem('role'),
            current: FIRST_PAGE,
            // size: PAGE_SIZE,
            // total: 20, 
            // nowCurrent:FIRST_PAGE,
            loginAfter:window.localStorage.getItem('loginAfter'),
            connectVisible:false,
            disVisible:false,
            data:[],
            add:{},
            flag:null,
            projectId:null,
            lastPathName:null,
        }
        this.getGroupList = this.getGroupList.bind(this);
    }
    componentDidMount(){
        // this.getGroupList(FIRST_PAGE);
        this.state.lastPathName=this.props.location.pathname;
        this.getGroupList();   
    }

    //分页
    handlePageChange = (page) => {
        this.getGroupList(page)
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
        const id=JSON.parse(this.state.loginAfter).loginAuthDto.groupId
        const role = this.state.role
        if(role!=null && role.includes("平台"))
        {
            axios({
                method: 'POST',
                url: '/pmc/project/getProjectListWithPage',
                headers: {
                  'Content-Type':'application/json',
                  'deviceId': this.deviceId,
                  'Authorization':'Bearer '+this.state.token,
                },
                data:JSON.stringify({
                  'baseQuery':null
                })
              })
            .then((res) => {
                if(res && res.status === 200){
                console.log(res)
                this.setState({
                    data: res.data.result.list,
                }) ;
                console.log("当前项目信息：" + JSON.stringify(this.state.data))
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }else{
            axios({
                method: 'POST',
                url: '/pmc/project/getProjectListByGroupId/'+id,
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
                console.log("当前项目信息：" + id)
                // console.log(this.state.data)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        
        
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
    
    //显示关联模态框
    add(record){
        console.log("cdca" + record.id)
        var addDetail={'projectId':record.id,userId:null,flag:0}
        console.log("lalallalalalal+" + JSON.stringify(addDetail))
        this.setState({
            connectVisible:true,
            add:addDetail,
        })
    }

     //关联模态框 取消
     handleCancel=e=>{
        console.log(123)
        this.setState({
            connectVisible:false
        })
    }

     //显示解绑模态框
     delete(record){
        var addDetail={'projectId':record.id,userId:null,flag:1}
        this.setState({
            disVisible:true,
            add:addDetail,
        })
       
    }

     //解绑模态框 取消
     disCancel=e=>{
        this.setState({
            disVisible:false
        })
    }
    
    
    //确认提交
    handleOk = e =>{
        this.setState({
            connectVisible: false,
        });
        const values = this.form.getFieldsValue() 
        let data = {
            projectId:values.projectId,
            userId:values.userId
        }
        console.log(data)
        axios({
            method: 'POST',
            url: '/pmc/project/addProUser',
            headers: {
                'Content-Type':'application/json',
                'deviceId': this.deviceId,
                'Authorization':'Bearer '+this.state.token,
            },
            data:JSON.stringify(data)
        })
        .then((res) => {
        if(res && res.status === 200){
            // this.changeStatus(res.data.result.id,8,'维修工提交维修结果，待服务商审核维修结果')
            alert('绑定成功')
        }
        })
        .catch(function (error) {
            console.log(error);
            alert('绑定失败')
        });
  
  }  
  //确认解绑
  disOk = e =>{
      this.setState({
          disVisible: false,
      });
      const values = this.form.getFieldsValue() 
      let data = {
        projectId:values.projectId,
        userId:values.userId
      }
      axios({
        method: 'POST',
        url: '/pmc/project/deleteProUser',
        headers: {
            'Content-Type':'application/json',
            'deviceId': this.deviceId,
            'Authorization':'Bearer '+this.state.token,
        },
        data:JSON.stringify(data)
      })
      .then((res) => {
      if(res && res.status === 200){
          // this.changeStatus(res.data.result.id,8,'维修工提交维修结果，待服务商审核维修结果')
          alert('解绑成功')
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
                    {/* <Col push={20}>
                    <Link to={"/cbd/pro/project/new"}>
                        <Button type="primary" lastPathName = {this.state.lastPathName}>
                                    +新建项目
                        </Button>
                    </Link>
                    </Col> */}
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
                    title: '项目ID',
                    key: 'id',
                    render: (text, record) => {
                    return ((record.id && record.id) || '--')
                    }   
                }, {
                    title: '项目名称',
                    key: 'projectName',
                    render: (text, record) => {
                    return (record.projectName && record.projectName) || '--'
                    }
                }, {
                    title: '项目类型',
                    key: 'projectType',
                    render: (text, record) => {
                    return (record.projectType && record.projectType) || '--'
                    }
                },
                // {
                //   title: '预计开始时间',
                //   key: 'inspection_date',
                //   render: (text, record) => {
                //     var date= moment(parseInt(record.inspection_date)).format('YYYY-MM-DD')
                //     return (date && date) || '--'
                //   }
                // }, {
                //   title: '预计完成时间',
                //   key: 'inspection_date',
                //   render: (text, record) => {
                //     var date= moment(parseInt(record.inspection_date)).format('YYYY-MM-DD')
                //     return (date && date) || '--'
                //   }
                // }, {
                //   title: '实际开始时间',
                //   key: 'inspection_date',
                //   render: (text, record) => {
                //     var date= moment(parseInt(record.inspection_date)).format('YYYY-MM-DD')
                //     return (date && date) || '--'
                //   }
                // }, {
                //   title: '实际完成时间',
                //   key: 'inspection_date',
                //   render: (text, record) => {
                //     var date= moment(parseInt(record.inspection_date)).format('YYYY-MM-DD')
                //     return (date && date) || '--'
                //   }
                // },
                //  {
                //   title: '最迟完成时间',
                //   key: 'inspection_date',
                //   render: (text, record) => {
                //     var date= moment(parseInt(record.inspection_date)).format('YYYY-MM-DD')
                //     return (date && date) || '--'
                //   }
                // },
                {
                    title: '甲方名称', 
                    key: 'partyAName',
                    render: (text, record) => {
                    return (record.partyAName && record.partyAName) || '--'
                    }
                }, {
                    title: ' 乙方名称',
                    key: 'partyBName',
                    render: (text, record) => {
                    return (record.partyBName && record.partyBName) || '--'
                    }
                },{
                    title: '项目是否作废',
                    key: 'isDestroy',
                    render: (text, record) => {
                    return  record.isDestroy==0?'有效':'作废' || '--'
                    }
                },{
                    title: '是否签署合同',
                    key: 'isContract',
                    render: (text, record) => {
                    return record.isContract==0?'否':'是' || '--'
                    }
                },
                {
                    title: '操作',
                    render: (text, record, index) => (
                    <div className="operate-btns"
                        style={{ display: 'block' }}
                    >
                        <Link
                        to={`/cbd/pro/project/detail/${record.id}`}
                        style={{marginRight:'12px'}}
                        >详情</Link>
                        <Link
                        to={`/cbd/pro/inspection/${record.id}`}
                        style={{marginRight:'5px'}}
                        >巡检计划</Link>                 
                        <Link
                        to={`/cbd/pro/project/edit/${record.id}`}
                        style={{marginRight:'12px'}}
                        >修改</Link>
                        <Popconfirm
                            title="确定要删除吗？"
                            onConfirm={()=> {this.deleteGroup(record)}}
                        >
                            <Button 
                            type="simple"
                            style={{border:'none',padding:0,color:"#357aff",background:'transparent'}}
                            >删除</Button>
                            </Popconfirm>
                        <br/>
                        <Button 
                            type="simple"
                            style={{border:'none',padding:0,color:"#357aff",background:'transparent',marginRight:'12px'}}
                            onClick={()=> {this.add(record)}}
                        >添加关联</Button>
                        <Button 
                            type="simple"
                            style={{border:'none',padding:0,color:"#357aff",background:'transparent'}}
                            onClick={()=> {this.delete(record)}}
                        >删除关联</Button>
                        
                    </div>
                    ),
                }]}
                />
                <Modal
                    title="关联用户"
                    visible={this.state.connectVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText='确定'
                    cancelText='取消'
                    destroyOnClose='true'
                >
                    <Add setAdd={(form)=>{this.form = form}}  add={add}/>

                </Modal>
                <Modal
                    title="解绑用户"
                    visible={this.state.disVisible}
                    onOk={this.disOk}
                    onCancel={this.disCancel}
                    okText='解绑'
                    cancelText='取消'
                    destroyOnClose='true'
                >
                    <Add setAdd={(form)=>{this.form = form}}  add={add}/>
                </Modal>
         </div>
        )
    }
}
export default Project;