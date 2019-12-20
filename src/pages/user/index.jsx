import React,{Component} from 'react'
import {Table,Button,Card,Select,Input,Icon,Modal} from 'antd'
import LinkButton from '../../components/link-button'
import {formatDate} from '../../utils/dateUtils'
import AddUpdateForm from './add-update-form'
import BindRole from './bind-role'


const Option = Select.Option
export default class User extends Component{

  state={
    users:[
      {
        _id:1,
        status:1,
        name:'test',
        phone:1211112351,
        workNum:123,
        userName:'test',
        code:123,
        regTime:133342234324,
        changeTime:15662222542,
        groupName:'215'
      }
    ], //当前页的用户数组
    user:{},//选中的user
    total:0,//角色总条数
    loading:false, //是否正在加载中
    searchLogName:'', //搜索登录名
    serachUserName:'', //搜索用户名
    searchPhone:'', //搜索手机号
    searchType:'roleOn', //根据哪个字段搜索
    isShowAddUpdate:false,
    isShowBindRole:false,
    
  }

  initColumns = () => {
    this.columns = [
      {
        title:'序号',
        dataIndex:'_id',
      }, 
      {
        title:'登陆名',
        dataIndex:'name'
      },
      {
        width:100,
        title:'状态',
        dataIndex:'status'
      },
     
      {
        title:'联系电话',
        dataIndex:'phone'
      },
      {
        title:'工号',
        dataIndex:'workNum'
      },
      {
        title:'用户名',
        dataIndex:'userName'
      },
      {
        title:'组织名称',
        dataIndex:'groupName'
      },{
        title:'注册时间',
        dataIndex:'regTime',
        render: formatDate
      },
      {
        title:'修改时间',
        dataIndex:'changeTime',
        render: formatDate
      },
      {
        title:'操作',
        render: (role) => {
          const {_id,status} = role
          return (
            <span>
              <LinkButton onClick={() => {this.updateStatus(_id,status===1?2:1)}}>{status===1?'启用':'禁用'}</LinkButton>|
              <LinkButton onClick={() => this.setState({isShowAddUpdate:true})}>修改</LinkButton>|
              <LinkButton onClick={() => this.setState({isShow:true})}>用户详情</LinkButton>|
              <LinkButton onClick={() => this.setState({isShowBindRole:true})}>角色绑定</LinkButton>|
              <LinkButton >重置密码</LinkButton>|
              <LinkButton >删除</LinkButton>
            </span>
            
          )
        }
      }
    ]
  }
  //启用/禁用
  updateStatus = (roleId,status) => {

  }

  addRole = () => {

  }

  onRow = () => {

  }

  componentWillMount() {
    this.initColumns()
  }

  render(){
  
    const {users,user,total,loading,searchType,searchUserName,searchLogName,searchPhone,isShowAddUpdate,isShowBindRole} = this.state
  
    const title = (
      <span>
        <Select value={searchType} style={{width:120,}} onChange={value => this.setState({searchType:value})}>
          <Option value="roleOn" key="roleOn">启用</Option>
          <Option value="roleOff" key="roleOff">禁用</Option>
        </Select>
        <Input placeholder="登录名" style={{width:150,margin:'0 15px'}} value={searchLogName} onChange={event => this.setState({searchCode:event.target.value})}/>
        <Input placeholder="用户名" style={{width:150,marginRight:'15px'}} value={searchUserName} onChange={event => this.setState({searchName:event.target.value})}/>
        <Input placeholder="手机号" style={{width:150,marginRight:'15px'}} value={searchPhone} onChange={event => this.setState({searchName:event.target.value})}/>
        <Button type="primary" onClick={() => {this.getProducts(1)}} style={{marginRight:'15px'}}>筛选</Button>
        <Button type="default" onClick={() => {this.getProducts(1)}}>重置</Button>
      </span>
    )

    const extra = (
      <span>
        <Button type="primary" style={{marginRight:'15px'}} onClick={() => this.setState({isShowAddUpdate:true})}><Icon type="plus"/>添加用户</Button>
        <Button type="primary" ><Icon type="delete"/>在线用户</Button>
      </span>
      
    )
  
    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          loading={loading}
          rowKey="_id"
          dataSource={users}
          columns={this.columns}
          rowSelection={{
            type:'checkbox',
            selectedRowKeys:[users._id],
            onSelect: (role) => {
              this.setState({
                role
              })
            }
          }}
          onRow={this.onRow}
          pagination={{
            current:this.pageNum,
            defaultPageSize:10,
            showQuickJumper:true,
            total:total,
            onChange:this.getProducts,
          }}
        />
        <Modal
          title="添加角色"
          visible={isShowAddUpdate}
          onOk={this.addRole}
          onCancel={() => {this.setState({isShowAddUpdate:false});this.form.resetFields()}}
          okText="确认"
          cancelText="取消"
        >
          <AddUpdateForm
            setForm={(form)=>{this.form = form}}
          />
        </Modal>
        <Modal
          title="绑定角色"
          visible={isShowBindRole}
          onOk={this.updateRole}
          onCancel={() => {this.setState({isShowBindRole:false});}}
          okText="确认"
          cancelText="取消"
        >
          <BindRole user={user}/>
        </Modal>
        
      </Card>
    )
  }
}