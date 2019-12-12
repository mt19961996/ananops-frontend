import React, { Component, } from 'react';
import { Button,Row,Col,Table,Input,Popconfirm,message  } from 'antd';
import { Link } from 'react-router-dom'
import moment from 'moment';
import './index.styl'
const FIRST_PAGE = 0;
const PAGE_SIZE = 10;
const Search = Input.Search;

class Inspection extends Component{
    constructor(props){
        super(props)
        this.state={
            current: FIRST_PAGE,
            size: PAGE_SIZE,
            total: 20, 
            nowCurrent:FIRST_PAGE,
            data:{
                data:[
                    {
                        "cycleTime" : 0,
                        "deadlineTime" : "2019-12-01 12:18:48",
                        "dealResult" : "string",
                        "description" : "string",
                        "deviceName" : "string",
                        "deviceType" : "string",
                        "id" : 0,
                        "inspectionCondition" : 0,
                        "inspectionContent" : "string",
                        "projectId" : 0,
                        "projectName" : "string",
                        "scheduledStartTime" : "2019-12-01 12:18:48"
                      
                    }
                ],
                limit:3,
                page:0,
                allCount:0,
            }
        }
    }
    render(){
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
                <Link to={"/contract/inspection/new"}>
                    <Button type="primary">
                                +新建巡检计划
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
                title: '巡检设备ID',
                key: 'id',
                render: (text, record) => {
                return ((record.id && record.id) || '--')
                }   
            }, {
                title: '项目ID',
                key: 'projectId',
                render: (text, record) => {
                return (record.projectId && record.projectId) || '--'
                }
            }, {
                title: '项目名称',
                key: 'projectName',
                render: (text, record) => {
                return (record.projectName && record.projectName) || '--'
                }
            },
            {
                title: '设备名字', 
                key: 'deviceName',
                render: (text, record) => {
                return (record.deviceName && record.deviceName) || '--'
                }
            }, {
                title: '巡检内容',
                key: 'inspectionContent',
                render: (text, record) => {
                return (record.inspectionContent && record.inspectionContent) || '--'
                }
            },{
                title: '巡检情况',
                key: 'inspectionCondition',
                render: (text, record) => {
                return (record.inspectionCondition && record.inspectionCondition) || '--'
                }
            },{
                title: '处理结果',
                key: 'dealResult',
                render: (text, record) => {
                return (record.dealResult && record.dealResult) || '--'
                }
            },
            {
                title: '操作',
                render: (text, record, index) => (
                <div className="operate-btns"
                    style={{ display: 'block' }}
                >
                    <Link
                    to={`/contract/inspection/detail/${record.id}`}
                    style={{marginRight:'12px'}}
                    >详情</Link>               
                    <Link
                    to={`/contract/inspection/edit${record.id}`}
                    style={{marginRight:'12px'}}
                    >修改</Link>
                    <Link
                    to={`/contract/inspection/edit/${record.id}`}
                    style={{marginRight:'8px'}}
                    >删除</Link>
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
export default Inspection;