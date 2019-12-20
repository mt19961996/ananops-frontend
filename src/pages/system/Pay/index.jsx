import React,{Component,} from 'react'
import { Button,Row,Col,Table,Input,Popconfirm,message  } from 'antd';
import { Link } from 'react-router-dom'
import moment from 'moment';

const FIRST_PAGE = 0;
const PAGE_SIZE = 10;
const Search = Input.Search;
class Pay extends Component{
    constructor(props){
        super(props)
        this.state={
            data:{
                data:[{
                    "facilitatorId": 0,
                    "payMode": 0,
                    "principalId": 0,
                    "projectId": 0,
                    "taskItems": [
                      {
                        "audioUrl": "string",
                        "description": "string",
                        "deviceId": 0,
                        "deviceLatitude": 0,
                        "deviceLongitude": 0,
                        "deviceName": "string",
                        "imageUrl": "string",
                        "laborCost": 0,
                        "troubleType": "string",
                        "videoUrl": "string"
                      }
                    ],
                    "title": "string",
                    "totalCost": 0,
                    "uid": 231,
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
            title: '工单ID ',
            key: 'uid',
            render: (text, record) => {
              return ((record.uid && record.uid) || '--')
            }   
          }, {
            title: '维修任务名称',
            key: 'title',
            render: (text, record) => {
              return (record.title && record.title) || '--'
            }
          }, {
            title: '审核人ID',
            key: 'facilitatorId',
            render: (text, record) => {
              return (record.facilitatorId && record.facilitatorId) || '--'
            }
          },{
            title: '项目ID', 
            key: 'projectId',
            render: (text, record) => {
              return (record.projectId && record.projectId) || '--'
            }
          }, {
            title: '服务商ID',
            key: 'principalId',
            render: (text, record) => {
              return (record.principalId && record.principalId) || '--'
            }
          },{
            title: '报修人ID',
            key: 'userId',
            render: (text, record) => {
              return (record.userId && record.userId) || '--'
            }
          },{
            title: '总花费',
            key: 'totalCost',
            render: (text, record) => {
              return (record.totalCost && record.totalCost) || '--'
            }
          },{
            title: '支付方式',
            key: 'payMode',
            render: (text, record) => {
              return (record.payMode && record.payMode) || '--'
            }
          },{
            title: '操作',
            render: (text, record, index) => (
              <div className="operate-btns"
                style={{ display: 'block' }}
              >
                <Link
                  to={`/service/data/sub/${record.uid}`}
                  style={{marginRight:'12px'}}
                >任务子项</Link>                
                <Link
                  to={`/service/data/process/${record.uid}`}
                  style={{marginRight:'12px'}}
                >维修过程</Link>
                <Link
                  to={`/service/data/fault/${record.uid}`}
                  style={{marginRight:'12px'}}
                >支付</Link>
                <br/>
                <Link
                  to={`/service/data/progress/${record.uid}`}
                  style={{marginRight:'12px'}}
                >处理进度</Link>
                <Link
                  to={`/service/data/fault/${record.uid}`}
                  style={{marginRight:'12px'}}
                >故障信息</Link>
              </div>
            ),
          }]}
        />
      </div>  
    )
}
}
export default Pay;