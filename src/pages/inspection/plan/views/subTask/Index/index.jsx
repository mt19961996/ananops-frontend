import React, { Component, } from 'react';
import { Button,Row,Col,Table,Input,Popconfirm,message  } from 'antd';
import { Link } from 'react-router-dom'
import moment from 'moment';
import './index.styl'

const FIRST_PAGE = 0;
const PAGE_SIZE = 10;
const Search = Input.Search;
class SubTask extends Component{
    constructor(props) {
        super(props);
        this.state = {
            current: FIRST_PAGE,
            size: PAGE_SIZE,
            total: 20, 
            nowCurrent:FIRST_PAGE,
            data:{
                data:[
                { "actualFinishTime" : "string",
                "actualStartTime" : "string",
                "deadline" : "string",
                "description" : "无",
                "deviceId" : 'ZKM-03-003',
                "deviceLatitude" : 0.0,
                "deviceLongitude" : 0.0,
                "deviceStatus" : '维修中',
                "deviceType" : "string",
                "exceptionDescription" : "无反应",
                "exceptionLevel" : 1,
                "id" : 0,
                "inspectionTaskId" : 0,
                "maintenanceTaskId" : 0,
                "scheduledFinishTime" : "string",
                "scheduledStartTime" : "string",
                "status" : '暂停中'              
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
                        <Button type="primary">
                          +新建巡检子项
                        </Button>
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
                  title: '设备ID',
                  key: 'deviceId',
                  render: (text, record) => {
                    return (record.deviceId && record.deviceId) || '--'
                  }
                },
                  {
                  title: '设备状态',
                  key: 'deviceStatus',
                  render: (text, record) => {
                    return ((record.deviceStatus && record.deviceStatus) || '--')
                  }   
                }, {
                  title: '设备异常等级',
                  key: 'exceptionLevel',
                  render: (text, record) => {
                    return (record.exceptionLevel && record.exceptionLevel) || '--'
                  }
                }, , {
                  title: '设备异常描述',
                  key: 'exceptionDescription',
                  render: (text, record) => {
                    return (record.exceptionDescription && record.exceptionDescription) || '--'
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
                  title: '描述信息', 
                  key: 'description',
                  render: (text, record) => {
                    return (record.description && record.description) || '--'
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
                        to={`/inspection/plan/subTask/detail/1`}
                        style={{marginRight:'12px'}}
                      >详情</Link>
                      <Link
                        to={`/inspection/plan/edit/${record.id}`}
                        style={{marginRight:'12px'}}
                      >修改</Link>
                      <Link
                        to={`/inspection/plan/edit/${record.id}`}
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
export default SubTask;