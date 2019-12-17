import React,{Component} from 'react'
import {Table,Button,Card,Select,Input,Icon,Modal} from 'antd'
import LinkButton from '../../components/link-button'
import {formatDate} from '../../utils/dateUtils'
import AddUpdateForm from './add-update-form'
import BindUser from './bind-user'
import BindMenu from './bind-menu'
import AuthForm from './auth-form'

const Option = Select.Option
export default class Role extends Component{

  state={
    roles:[
      {
        _id:1,
        status:1,
        name:'test',
        code:123,
        time:133342234324,
        staff:'llr'
      }
    ], //当前页的角色数组
    role:{},//选中的role
    total:0,//角色总条数
    loading:false, //是否正在加载中
    searchCode:'', //搜索角色编码
    serachName:'', //搜索角色名称
    searchType:'roleOn', //根据哪个字段搜索
    isShowAddUpdate:false,
    isShowBindUser:false,
    isShowBindMenu:false,
    isShowAuth:false,
  }

  initColumns = () => {
    this.columns = [
      {
        title:'序号',
        dataIndex:'_id',
      },
      {
        width:100,
        title:'状态',
        dataIndex:'status'
      },
      {
        title:'角色名称',
        dataIndex:'name'
      },
      {
        title:'角色编码',
        dataIndex:'code'
      },
      {
        title:'修改时间',
        dataIndex:'time',
        render: formatDate
      },
      {
        title:'操作人',
        dataIndex:'staff',
       
      },
      {
        title:'操作',
        render: (role) => {
          const {_id,status} = role
          return (
            <span>
              <LinkButton onClick={() => {this.updateStatus(_id,status===1?2:1)}}>{status===1?'启用':'禁用'}</LinkButton>|
              <LinkButton onClick={() => {this.setState({isShowBindUser:true})}}>绑定用户</LinkButton>|
              <LinkButton onClick={() => {this.setState({isShowBindMenu:true})}}>分配菜单</LinkButton>|
              <LinkButton onClick={() => {this.setState({isShowAuth:true})}}>分配权限</LinkButton>|
              <LinkButton onClick={() => this.setState({isShowAddUpdate:true})}>修改</LinkButton>|
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
  
    const {roles,role,total,loading,searchType,searchCode,searchName,isShowAddUpdate,isShowBindUser,isShowBindMenu,isShowAuth} = this.state
  
    const title = (
      <span>
        <Select value={searchType} style={{width:120,}} onChange={value => this.setState({searchType:value})}>
          <Option value="roleOn" key="roleOn">启用</Option>
          <Option value="roleOff" key="roleOff">禁用</Option>
        </Select>
        <Input placeholder="角色编码" style={{width:150,margin:'0 15px'}} value={searchCode} onChange={event => this.setState({searchCode:event.target.value})}/>
        <Input placeholder="角色名称" style={{width:150,marginRight:'15px'}} value={searchName} onChange={event => this.setState({searchName:event.target.value})}/>
        <Button type="primary" onClick={() => {this.getProducts(1)}} style={{marginRight:'15px'}}>筛选</Button>
        <Button type="default" onClick={() => {this.getProducts(1)}}>重置</Button>
      </span>
    )

    const extra = (
      <span>
        <Button type="primary" style={{marginRight:'15px'}} onClick={() => this.setState({isShowAddUpdate:true})}><Icon type="plus"/>添加角色</Button>
        <Button type="primary" ><Icon type="delete"/>批量删除</Button>
      </span>
      
    )
  
    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          loading={loading}
          rowKey="_id"
          dataSource={roles}
          columns={this.columns}
          rowSelection={{
            type:'checkbox',
            selectedRowKeys:[role._id],
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
          title="绑定用户"
          visible={isShowBindUser}
          onOk={this.updateRole}
          onCancel={() => {this.setState({isShowBindUser:false});}}
          okText="确认"
          cancelText="取消"
        >
          <BindUser role={role}/>
        </Modal>
        <Modal
          title="绑定菜单"
          visible={isShowBindMenu}
          onOk={this.updateRole}
          onCancel={() => {this.setState({isShowBindMenu:false});}}
          okText="确认"
          cancelText="取消"
        >
          <BindMenu role={role}/>
        </Modal>
        <Modal
          title="分配权限"
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={() => {this.setState({isShowAuth:false});}}
          okText="确认"
          cancelText="取消"
        >
          <AuthForm role={role}/>
        </Modal>
      </Card>
    )
  }
}