import React, { Component, } from 'react';
import { Button,Row,Col,Table,Input,Popconfirm,message  } from 'antd';
import { Link } from 'react-router-dom'
import moment from 'moment';
import './index.styl'
const FIRST_PAGE = 0;
const PAGE_SIZE = 10;
const Search = Input.Search;

class Project extends Component{
    constructor(props){
        super(props);
        this.state={
            current: FIRST_PAGE,
            size: PAGE_SIZE,
            total: 20, 
            nowCurrent:FIRST_PAGE,
            data:{
                data:[
                    {
                        "agentContent" : "string",
                        "alegalName" : "string",
                        "assitMoney" : 0,
                        "bankAccount" : "string",
                        "bankName" : "string",
                        "blegalName" : "string",
                        "contractCode" : "string",
                        "contractName" : "string",
                        "contractType":"string",
                        "description" : "string",
                        "deviceCount" : 0,
                        "endTime" : "2019-12-01 12:18:48",
                        "filePath" : "string",
                        "id" : 1,
                        "isChange" : 0,
                        "isDestory" : 0,
                        "isPostpone" : 0,
                        "isSparePart" : 0,
                        "isSpareService" : 0,
                        "lastResponseTime" : 0,
                        "partyAId" : 0,
                        "partyAName" : "A商场",
                        "partyBId" : 0,
                        "partyBName" : "B公司",
                        "paymentTime" : "2019-12-01 12:18:48",
                        "paymentType" : 0,
                        "projectMoney" : 0,
                        "recordTime" : 0,
                        "signTime" : "2019-12-01 12:18:48",
                        "startTime" : "2019-12-01 12:18:48",
                        "verification" : "string"
                    }
                ],
                limit:3,
                page:0,
                allCount:0,
            }
        }
    }
    render() {
        const {
          data:{
            allCount,
            data,
            limit,
            page,
          },
        } = this.state;
        const total = allCount
        const current = page+1
        const size = limit
        return(
            <div>
                <div className="searchPart">
                <Row>
                    {/* <Col span={2}>巡检人姓名：</Col> */}
                    <Col span={5}>
                    <Search
                        placeholder="搜索从这里开始"
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
                    total,
                    pageSize: size,
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
                        to={`/contract/project/new`}
                        style={{marginRight:'5px'}}
                        >巡检计划</Link>                 
                        <br/>
                        <Link
                        to={`/contract/project/detail${record.id}`}
                        style={{marginRight:'12px'}}
                        >修改</Link>
                        <Link
                        to={`/contract/project/edit/${record.id}`}
                        style={{marginRight:'8px'}}
                        >查看合同</Link>
                        {/* <Popconfirm
                                title="确定要删除吗？"
                                onConfirm={()=> {this.deleteGroup(record)}}
                            >
                                <Button 
                                type="simple"
                                style={{border:'none',padding:0,color:"#357aff",background:'transparent'}}
                                >删除</Button>
                            </Popconfirm> */}
                    </div>
                    ),
                }]}
                />
         </div>
        )
    }
}
export default Project;