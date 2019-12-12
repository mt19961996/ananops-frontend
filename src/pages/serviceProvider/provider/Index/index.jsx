import React, { Component, } from 'react';
import { Button,Row,Col,Table,Input,Popconfirm,message  } from 'antd';
import { Link } from 'react-router-dom'
import moment from 'moment';
import './index.styl'
const FIRST_PAGE = 0;
const PAGE_SIZE = 10;
const Search = Input.Search;

class Provider extends Component{
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
                        "accountId": "string",
                        "accountName": "string",
                        "businessScope": "string",
                        "companyAddress": "string",
                        "companyName": "string",
                        "companyType": "string",
                        "contactName": "string",
                        "contactPhone": "string",
                        "country": "string",
                        "expirationDate": "2019-12-10T14:59:04.025Z",
                        "id": 0,
                        "legalId": "string",
                        "legalName": "string",
                        "legalPhone": "string",
                        "licenseType": "string",
                        "mainWork": "string",
                        "productCategory": "string",
                        "registeredAddress": "string",
                        "registeredCaptial": "string",
                        "socialCreditCode": "string",
                        "zipCode": "string"
                      
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
                <Link to={"/serviceProvider/provider/new"}>
                    <Button type="primary">
                                +添加服务加盟商
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
                title: 'ID',
                key: 'id',
                render: (text, record) => {
                return ((record.id && record.id) || '--')
                }   
            }, {
                title: '公司名称',
                key: 'companyName',
                render: (text, record) => {
                return (record.companyName && record.companyName) || '--'
                }
            }, {
                title: '所属国家',
                key: 'country',
                render: (text, record) => {
                return (record.country && record.country) || '--'
                }
            },
            {
                title: '公司类型', 
                key: 'companyType',
                render: (text, record) => {
                return (record.companyType && record.companyType) || '--'
                }
            }, {
                title: '联系电话',
                key: 'contactPhone',
                render: (text, record) => {
                return (record.contactPhone && record.contactPhone) || '--'
                }
            },{
                title: '公司地址',
                key: 'companyAddress',
                render: (text, record) => {
                return (record.companyAddress && record.companyAddress) || '--'
                }
            },{
                title: '经营范围',
                key: 'businessScope',
                render: (text, record) => {
                return (record.businessScope && record.businessScope) || '--'
                }
            },
            {
                title: '操作',
                render: (text, record, index) => (
                <div className="operate-btns"
                    style={{ display: 'block' }}
                >
                    <Link
                    to={`/serviceProvider/provider/detail/${record.id}`}
                    style={{marginRight:'12px'}}
                    >详情</Link>               
                    <Link
                    to={`/serviceProvider/provider/edit${record.id}`}
                    style={{marginRight:'12px'}}
                    >修改</Link>
                    <Link
                    to={`/serviceProvider/provider/delete/${record.id}`}
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
export default Provider;