import React, { Component, } from 'react';
import { Button,Row,Col,Table,Input,Popconfirm,message  } from 'antd';
import { Link } from 'react-router-dom'
import moment from 'moment';
import './index.styl'
const FIRST_PAGE = 0;
const PAGE_SIZE = 10;
const Search = Input.Search;
class Plan extends Component{
    constructor(props) {
        super(props);
        this.state = {
            current: FIRST_PAGE,
            size: PAGE_SIZE,
            total: 20, 
            nowCurrent:FIRST_PAGE,
            data:{
                data:[
                {"actualFinishTime" : "string",
                "actualStartTime" : "string",
                "createdTime" : "string",
                "creator" : "string",
                "creatorId" : 0,
                "deadline" : "string",
                "facilitatorId" : 34,
                "id" : 1,
                "inspectionType" : '设备巡检',
                "lastOperator" : "string",
                "lastOperatorId" : 0,
                "location" : "枫蓝国际电梯01号门",
                "maintenanceCost" : 0.0,
                "orderBy" : "string",
                "pageNum" : 0,
                "pageSize" : 0,
                "principalId" : 23,
                "projectId" : 44,
                "remark" : "string",
                "scheduledFinishTime" : "string",
                "scheduledStartTime" : "string",
                "status" : '进行中',
                "totalCost" : 0.0,
                "updateTime" : "string",
                "version" : 0         
            }],
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
              <div className='searchPart'>
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
                        <Link to={"/inspection/plan/new"}>
                          <Button type="primary">
                            +新建巡检任务
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
                  title: '任务ID',
                  key: 'id',
                  render: (text, record) => {
                    return ((record.id && record.id) || '--')
                  }   
                }, {
                  title: '巡检类型',
                  key: 'inspectionType',
                  render: (text, record) => {
                    return (record.inspectionType && record.inspectionType) || '--'
                  }
                }, {
                  title: '状态',
                  key: 'status',
                  render: (text, record) => {
                    return (record.status && record.status) || '--'
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
                  title: '负责人ID', 
                  key: 'principalId',
                  render: (text, record) => {
                    return (record.principalId && record.principalId) || '--'
                  }
                }, {
                  title: '服务商ID',
                  key: 'facilitatorId',
                  render: (text, record) => {
                    return (record.facilitatorId && record.facilitatorId) || '--'
                  }
                },{
                  title: '所属项目',
                  key: 'projectId',
                  render: (text, record) => {
                    return (record.projectId && record.projectId) || '--'
                  }
                },{
                  title: '地址',
                  key: 'location',
                  render: (text, record) => {
                    return (record.location && record.location) || '--'
                  }
                },
                // {
                //   title: '维修维护花费',
                //   key: 'status',
                //   render: (text, record) => {
                //     return (record.status && record.status) || '--'
                //   }
                // },{
                //   title: '总花费',
                //   key: 'status',
                //   render: (text, record) => {
                //     return (record.status && record.status) || '--'
                //   }
                // },
                // {
                //   title: '详情',
                //   key: 'status',
                //   render: (text, record) => {
                //     return (record.status && record.status) || '--'
                //   }
                // },{
                //   title: '备注',
                //   key: 'status',
                //   render: (text, record) => {
                //     return (record.status && record.status) || '--'
                //   }
                // },
                {
                  title: '操作',
                  render: (text, record, index) => (
                    <div className="operate-btns"
                      style={{ display: 'block' }}
                    >
                      <Link
                        to={`/inspection/plan/detail/${record.id}`}
                        style={{marginRight:'12px'}}
                      >详情</Link>
                      <Link
                        to={`/inspection/plan/edit/${record.id}`}
                        style={{marginRight:'12px'}}
                      >修改</Link>
                      <Link
                        to={`/inspection/plan/comment/new`}
                      >评论</Link>
                      <br/>
                      <Link
                        to={`/inspection/plan/subTask/new`}
                        style={{marginRight:'5px'}}
                      >添加子项</Link>
                       <Link
                        to={`/inspection/plan/edit/${record.id}`}
                        style={{marginRight:'8px'}}
                      >创建订单</Link>
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
export default Plan;