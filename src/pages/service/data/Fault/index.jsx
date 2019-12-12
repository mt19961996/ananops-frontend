import React,{Component,} from 'react'
import { Button,Row,Col,Table,Input,Steps, Icon   } from 'antd';
import { Link } from 'react-router-dom'
import moment from 'moment';

const FIRST_PAGE = 0;
const PAGE_SIZE = 10;
const Search = Input.Search;
const { Step } = Steps;

class Fault extends Component{
    constructor(props){
        super(props)
        this.state={
            data:{
                data:[{
                    "last_operator": "string",
                    "movement": "string",
                    "status": 0,
                    "status_timestamp": "2019-12-11T06:56:21.176Z"
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
                {/* <Col span={5}>
                  <Search
                    placeholder="搜索从这里开始"
                    enterButton
                    onSearch={value => this.selectActivity(value)}
                  />
                </Col>
                <Col push={16}>
                  <Link to={"/contract/management/new"}>
                    <Button type="primary">
                                +新建任务子项
                    </Button>
                  </Link>
                </Col> */}
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
                title: '工单编号 ',
                key: 'orderId',
                render: (text, record) => {
                  return ((record.orderId && record.orderId) || '--')
                }   
              }, {
                title: '故障等级',
                key: 'level',
                render: (text, record) => {
                  return (record.level && record.level) || '--'
                }
              }, {
                title: '报修人',
                key: 'caller',
                render: (text, record) => {
                  return (record.caller && record.caller) || '--'
                }
              },{
                title: '故障描述', 
                key: 'description',
                render: (text, record) => {
                  return (record.description && record.description) || '--'
                }
              },{
                title: '操作',
                render: (text, record, index) => (
                  <div className="operate-btns"
                    style={{ display: 'block' }}
                  >
                    {/* <Link
                      to={`/service/data/edit/${record.id}`}
                      style={{marginRight:'12px'}}
                    >修改</Link>
                    <Link
                      to={`/service/data/delete/${record.id}`}
                      style={{marginRight:'12px'}}
                    >删除</Link> */}
                  </div>
                ),
              }]}
            />
          </div>  
        )
    }
}
export default Fault