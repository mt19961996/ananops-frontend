import React, { Component, } from 'react';
import { Button,Row,Col,Table,Input,Popconfirm,message  } from 'antd';
import { Link } from 'react-router-dom'
import moment from 'moment';
import './index.styl'
import axios from 'axios'
const FIRST_PAGE = 0;
const PAGE_SIZE = 10;
const Search = Input.Search;

class Management extends Component{
    constructor(props){
        super(props)
        this.state={
          token:window.localStorage.getItem('token'),
          loginAfter:window.localStorage.getItem('loginAfter'),
          current: FIRST_PAGE,
          // size: PAGE_SIZE,
          // total: 20, 
          // nowCurrent:FIRST_PAGE,
          data:[],
          partA:null,
          partB:null,
          roleCode:window.localStorage.getItem('roleCode')
        }
        this.getGroupList = this.getGroupList.bind(this);
    }
    componentDidMount(){
      // this.getGroupList(FIRST_PAGE); 
      this.getGroupList();   
    }
    //分页
    handlePageChange = (page) => {
      this.getGroupList(page-1)
    }
    //获取列表信息+分页
    // getGroupList = (page) => {
    //   const { size,unit } = this.state;
    //   const values={orderBy:'contractCode',pageSize:size,pageNum:page}
    //   axios({
    //       method: 'POST',
    //       url: '/pmc/contract/getContractListWithPage',
    //       headers: {
    //         'deviceId': this.deviceId,
    //         'Authorization':'Bearer '+this.state.token,
    //       },
    //       data:values
    //     })
    //   .then((res) => {
    //       if(res && res.status === 200){
    //       console.log(res.data.result)
    //       this.setState({
    //           data: res.data.result.list,
    //           nowCurrent:res.data.result.pageNum-1,
    //       }) ;
    //       console.log(this.state.data)
    //       }
    //   })
    //   .catch(function (error) {
    //       console.log(error);
    //   });
        
    // }
     //获取信息列表 无分页
     getGroupList = () => {
      const id=JSON.parse(this.state.loginAfter).loginAuthDto.groupId
      axios({
          method: 'POST',
          url: '/pmc/contract/getContactListByGroupId/'+id,
          headers: {
             'deviceId': this.deviceId,
            'Authorization':'Bearer '+this.state.token,
          },
        })
      .then((res) => {
          if(res && res.status === 200){
          console.log(res)
          this.setState({
              data: res.data.result,
          }) ;
          // console.log(this.state.data)
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
              'Authorization':'Bearer '+this.state.token,
          }           
      }) 
      .then((res) => {
          if(res && res.status === 200){
          console.log(res.data.result)
          // this.getGroupList(this.state.nowCurrent)
          this.getGroupList()
          }
      })
      .catch(function (error) {
          console.log(error);
      });
  }

  //甲方ID
  partA=(e)=>{
    this.setState({
      partA:e.target.value
    })
  }
  partB=(value)=>{
    this.setState({
      partB:value.target.value
    })
  }

  //甲、乙方搜索
  search(){
    const{partA,partB}=this.state
    axios({
      method: 'POST',
      url: '/pmc/contract/getContactByAB/'+partA+'/'+partB,
      headers: {
         'deviceId': this.deviceId,
        'Authorization':'Bearer '+this.state.token,
      },
    })
  .then((res) => {
      if(res && res.status === 200){
      console.log(res.data.result)
      this.setState({
          data: res.data.result,
        //  nowCurrent:0
      }) ;
      console.log(this.res.data.result)
      }
  })
  .catch(function (error) {
      console.log(error);
  });
  }

  //重置
  blur=()=>{
    this.setState({
      partA:null,
      partB:null
    })
  // this.getGroupList(0)
   this.getGroupList()
  }

    render(){
      const {
        data,
        // nowCurrent,
        // size,
       } = this.state;
       // const total = allCount
      //  const current = nowCurrent+1
      //  const limit = size
        return(
            <div>
            <div className="searchPart">
              <Row>
                <Col span={3}>
                    <Input 
                    placeholder="请输入甲方ID"
                    value={this.state.partA}
                    onChange={(e) => this.partA(e)}
                   // onChange={this.partA.bind(this)}
                    />
                </Col>
                <Col span={3}>
                    <Input 
                     placeholder="请输入乙方ID"
                     value={this.state.partB}
                     onChange={(e) => this.partB(e)}
                   // onChange={value=>this.partB(value)}
                    />
                </Col>
                <Col span={2}>
                    <Button  type="primary" onClick={this.search.bind(this)}>
                      搜索
                    </Button>
                </Col>
                <Col span={2}>
                    <Button   type="primary" onClick={this.blur.bind(this)}>
                      重置
                    </Button>
    
                </Col>
                <Col push={11}>
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
              // pagination={{
              //   current,
              //   pageSize: size,
              //   onChange: this.handlePageChange,
              //   // showTotal: () => `共${allCount} 条数据`
              // }}
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
                      to={`/cbd/pro/contract/detail/${record.id}`}
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