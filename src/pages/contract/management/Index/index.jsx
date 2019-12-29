import React, { Component, } from 'react';
import { Button,Row,Col,Table,Input,Popconfirm,message  } from 'antd';
import { Link } from 'react-router-dom'
import moment from 'moment';
import './index.styl'
import axios from 'axios'
const FIRST_PAGE = 0;
const PAGE_SIZE = 10;
const Search = Input.Search;
const token=window.localStorage.getItem('token')
class Management extends Component{
    constructor(props){
        super(props)
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
      const { size,unit } = this.state;
      const values={orderBy:'contractCode',pageSize:size,pageNum:page}
      axios({
          method: 'POST',
          url: '/pmc/contract/getContractListWithPage',
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
          url:'/pmc/contract/deleteContractById/'+record.id,
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
      url: '/pmc/contract/getContactListByGroupId/'+value,
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
    render(){
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
                {/* <Col span={5}>
                  <Search
                    placeholder="组织ID"
                    enterButton
                    onSearch={value => this.selectActivity(value)}
                  />
                </Col> */}
                <Col push={16}>
                  <Link to={"/cbd/pro/contract/new"}>
                    <Button type="primary">
                                +新建合同
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
              }, {
                title: '甲方组织名称',
                key: 'partyAName',
                render: (text, record) => {
                  return (record.partyAName && record.partyAName) || '--'
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
                      to={`/cbd/pro/contract/${record.id}`}
                      style={{marginRight:'12px'}}
                    >详情</Link>
                    <Link
                      to={`/cbd/pro/contract/edit/${record.id}`}
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
export default Management;