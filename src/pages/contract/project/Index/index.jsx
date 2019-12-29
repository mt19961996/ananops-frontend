import React, { Component, } from 'react';
import { Button,Row,Col,Table,Input,Popconfirm,message,Modal  } from 'antd';
import { Link } from 'react-router-dom'
import moment from 'moment';
import axios from 'axios'
import './index.styl'
const FIRST_PAGE = 0;
const PAGE_SIZE = 10;
const Search = Input.Search;
const token=window.localStorage.getItem('token')
class Project extends Component{
    constructor(props){
        super(props);
        this.state={
            current: FIRST_PAGE,
            size: PAGE_SIZE,
            // total: 20, 
            nowCurrent:FIRST_PAGE,
            data:[],
        }
        this.getGroupList = this.getGroupList.bind(this);
    }
    componentDidMount(){
        this.getGroupList(FIRST_PAGE);   
    }

    //分页
    handlePageChange = (page) => {
        this.getGroupList(page-1)
    }
    //获取列表信息
    getGroupList = (page) => {
        const { size, } = this.state;
        const values={orderBy:'',pageSize:size,pageNum:page}
        axios({
            method: 'POST',
            url: '/pmc/project/getProjectListWithPage',
            headers: {
               'deviceId': this.deviceId,
              'Authorization':'Bearer '+token,
            },
            data:values
          })
        .then((res) => {
            if(res && res.status === 200){
            console.log(res.data.result)
            this.setState({
                data: res.data.result.list,
                nowCurrent:res.data.result.pageNum-1
            }) ;
            console.log(this.state.data)
            }
        })
        .catch(function (error) {
            console.log(error);
        });
        
    }
    deleteGroup=(record)=>{
        console.log(record)
        axios({
            method:'POST',
            url:'/pmc/project/deleteProjectById/'+record.id,
            headers:{
                'deviceId': this.deviceId,
                'Authorization':'Bearer '+token,
            }           
        }) 
        .then((res) => {
            if(res && res.status === 200){
            console.log(res.data.result)
            this.getGroupList(this.state.nowCurrent)
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
              'Authorization':'Bearer '+token,
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
        } = this.state;
        // const total = allCount
        const current = nowCurrent+1
        const limit = size
        return(
            <div>
                <div className="searchPart">
                <Row>
                    {/* <Col span={2}>巡检人姓名：</Col> */}
                    <Col span={5}>
                    <Search
                        placeholder="请输入组织ID"
                        enterButton
                        onSearch={value => this.selectActivity(value)}
                    />
                    </Col>
                    <Col push={16}>
                    <Link to={"/contract/project/new"}>
                        <Button type="primary">
                                    +新建项目
                        </Button>
                    </Link>
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
                    pageSize: limit,
                    onChange: this.handlePageChange,
                    // showTotal: () => `共${allCount} 条数据`
                }}
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
                    title: '甲方组织名称', 
                    key: 'partAName',
                    render: (text, record) => {
                    return (record.partAName && record.partAName) || '--'
                    }
                }, {
                    title: '乙方组织名称',
                    key: 'partyBName',
                    render: (text, record) => {
                    return (record.partyBName && record.partyBName) || '--'
                    }
                },{
                    title: '项目是否作废',
                    key: 'projectId',
                    render: (text, record) => {
                    return (record.isDestory && record.isDestory) || '--'
                    }
                },{
                    title: '是否签署合同',
                    key: 'isContract',
                    render: (text, record) => {
                    return (record.isContract && record.isContract) || '--'
                    }
                },
                {
                    title: '操作',
                    render: (text, record, index) => (
                    <div className="operate-btns"
                        style={{ display: 'block' }}
                    >
                        <Link
                        to={`/contract/project/detail/${record.id}`}
                        style={{marginRight:'12px'}}
                        >详情</Link>
                        <Link
                        to={`/contract/inspection/${record.id}`}
                        style={{marginRight:'5px'}}
                        >巡检计划</Link>                 
            
                        <Link
                        to={`/contract/project/edit/${record.id}`}
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
                       
                    </div>
                    ),
                }]}
                />
         </div>
        )
    }
}
export default Project;