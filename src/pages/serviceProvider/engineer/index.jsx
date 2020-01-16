import React,{Component} from 'react'
import {Table,Button,Card,Select,Input,Icon,Modal,message} from 'antd'
import axios from 'axios';
import Add from './add'
const Option = Select.Option
const FIRST_PAGE = 0;
const PAGE_SIZE = 30;
export default class Engineer extends Component{
    state={
      total:0,//角色总条数
      current: FIRST_PAGE,
      size: PAGE_SIZE,
      nowCurrent:FIRST_PAGE,
      data:[],
      addDetail:{},
      token:window.localStorage.getItem('token')
    }
    
    componentDidMount(){
      this.getInfo(FIRST_PAGE)
    }
    getInfo=(page)=>{
      const { size,total } = this.state;
      const values={pageSize:size,pageNum:page,position:'engineer'}
      axios({
        method: 'POST',
        url: '/spc/engineer/queryAllEngineers',
        headers: {
          'deviceId': this.deviceId,
          'Authorization':'Bearer '+this.state.token,
        },
        data:values
      })
        .then((res) => {
          if(res && res.status === 200){
            this.setState({
              data: res.data.result.list,
              nowCurrent:res.data.result.pageNum,
              total:res.data.result.total
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    showAdd=()=>{
      this.setState({
        addVisible:true
      })
    }
    addOk=e=>{
      this.setState({
        addVisible:false
      })
      const values = this.form.getFieldsValue() 
      console.log(values)
      axios({
        contentType:'application/json',
        method: 'POST',
        url: '/spc/engineer/add',
        headers: {
          'deviceId': this.deviceId,
          'Authorization':'Bearer '+this.state.token,
        },
        data:values
      })
        .then((res) => {
          if(res && res.status === 200){
            this.getInfo(FIRST_PAGE)
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    addCancel=()=>{
      this.setState({
        addVisible:false
      })
    }
    render(){
    
      const {current,size,total,data,addDetail} = this.state
      const extra = (
        <span>
          <Button type="primary" style={{marginRight:'15px'}} onClick={() => this.showAdd()}><Icon type="plus"/>添加工程师</Button>
        </span>
      )
    
      return (
        <Card title={'工程师信息'} extra={extra} >
          <Table
            className="group-list-module"
            bordered
            showHeader={true}
            pagination={{
              current,
              pageSize: size,
              onChange: this.handlePageChange,
              showTotal: () => `共${total} 条数据`
            }}
            rowClassName={this.setRowClassName}
            dataSource={data}
            columns={[
              {  title:'登录名',
                dataIndex:'loginName',
                width:70,
              },
              {
                title:'手机号',
                dataIndex:'mobileNo',
                width:70,
              },
              {
                title:'邮箱',
                dataIndex:'email',
                width:70,
              },
              {
                title:'身份证号码',
                dataIndex:'identityNumber',
                width:150
              },
              {
                title:'工号',
                dataIndex:'userCode',
                width:150
              },
              {
                title:'职称证书编号',
                dataIndex:'titleCeNumber',
                width:180,
              },
    
            ]}
          />
          <Modal
            title="添加工程师"
            visible={this.state.addVisible}
            onOk={this.addOk}
            onCancel={this.addCancel}
            okText="确定"
            cancelText="取消"
          >
            <Add setSubmit={(form)=>{this.form = form}}  addDetail={addDetail}/>
          </Modal>
        </Card>
      )
    }
}