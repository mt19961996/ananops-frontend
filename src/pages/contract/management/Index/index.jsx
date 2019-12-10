import React, { Component, } from 'react';
import { Button,Row,Col,Table,Input,Popconfirm,message  } from 'antd';
import { Link } from 'react-router-dom'
import moment from 'moment';

const FIRST_PAGE = 0;
const PAGE_SIZE = 10;
const Search = Input.Search;

class Management extends Component{
    constructor(props){
        super(props)
        this.state={
            data:{
                data:[{
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
                    "id" : 0,
                    "isChange" : 0,
                    "isDestory" : 0,
                    "isPostpone" : 0,
                    "isSparePart" : 0,
                    "isSpareService" : 0,
                    "lastResponseTime" : 0,
                    "partyAId" : 0,
                    "partyAName" : "string",
                    "partyBId" : 0,
                    "partyBName" : "string",
                    "paymentTime" : "2019-12-01 12:18:48",
                    "paymentType" : 0,
                    "projectMoney" : 0,
                    "recordTime" : 0,
                    "signTime" : "2019-12-01 12:18:48",
                    "startTime" : "2019-12-01 12:18:48",
                    "verification" : "string"
                }],
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
                  <Link to={"/contract/management/new"}>
                    <Button type="primary">
                                +新建合同信息
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
                title: '合同编号',
                key: 'contractCode',
                render: (text, record) => {
                  return ((record.contractCode && record.contractCode) || '--')
                }   
              }, {
                title: '合同名称',
                key: 'contractName',
                render: (text, record) => {
                  return (record.contractName && record.contractName) || '--'
                }
              }, {
                title: '合同类型',
                key: 'contractType',
                render: (text, record) => {
                  return (record.contractType && record.contractType) || '--'
                }
              },{
                title: '甲方ID', 
                key: 'partyAId',
                render: (text, record) => {
                  return (record.partyAId && record.partyAId) || '--'
                }
              }, {
                title: '甲方组织名称',
                key: 'partyAName',
                render: (text, record) => {
                  return (record.partyAName && record.partyAName) || '--'
                }
              },{
                title: '乙方ID',
                key: 'partyBId',
                render: (text, record) => {
                  return (record.partyBId && record.partyBId) || '--'
                }
              },{
                title: '乙方组织名称',
                key: 'partyBName',
                render: (text, record) => {
                  return (record.partyBName && record.partyBName) || '--'
                }
              },{
                title: '操作',
                render: (text, record, index) => (
                  <div className="operate-btns"
                    style={{ display: 'block' }}
                  >
                    <Link
                      to={`/contract/management/detail/${record.id}`}
                      style={{marginRight:'12px'}}
                    >详情</Link>
                    <Link
                      to={`/contract/management/edit/${record.id}`}
                      style={{marginRight:'12px'}}
                    >修改</Link>
                    <Link
                      to={`/contract/management/delete/${record.id}`}
                    >删除</Link>
                  </div>
                ),
              }]}
            />
          </div>  
        )
    }
}
export default Management;