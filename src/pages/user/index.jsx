import React,{Component} from 'react'
import {Table,Button,Card,Select,Input,Icon,Modal,message} from 'antd'
import LinkButton from '../../components/link-button'
import {formatDate} from '../../utils/dateUtils'
import AddUpdateForm from './add-update-form'
import BindRole from './bind-role'
import BindGroup from './bind-group'
import {reqUserList,reqSwitchUserStatus,reqAddOrUpdateUser,reqResetPwd,reqDeleteUser,reqGroupList,reqBindRole,reqUserBindRole,reqBindGroup} from '../../axios/index'

const Option = Select.Option
export default class User extends Component{

  state={
    users:[], //当前页的用户数组
    user:{},//选中的user
    selectedRowKeys:[], //当前选中的用户组
    total:0,//角色总条数
    groupList:[],
    loading:false, //是否正在加载中
    searchLoginName:'', //搜索登录名
    searchUserName:'', //搜索用户名
    searchPhone:'', //搜索手机号
    searchType:'', //根据哪个字段搜索
    isShowAddUpdate:false,
    isShowBindRole:false,
    isShowBindGroup:false,
    allRoleSet:[],
    alreadyBindRoleIdSet:[]
  }

  initColumns = () => {
    this.columns = [
      {
        title:'序号',
        dataIndex:'id',
        width:170,
        fixed:'left'
      }, 
      {
        title:'登陆名',
        dataIndex:'loginName',
        width:150
      },
      {
        title:'状态',
        dataIndex:'status',
        width:70,
        render:(status)=>{return <span>{status==='ENABLE'?'启用':'禁用'}</span>}
      },
     
      {
        title:'联系电话',
        dataIndex:'mobileNo',
        width:150
      },
      {
        title:'邮箱',
        dataIndex:'email',
        width:200
      },
      {
        title:'工号',
        dataIndex:'userCode',
        width:100
      },
      {
        title:'用户名',
        dataIndex:'userName',
        width:150
      },
      {
        title:'组织名称',
        dataIndex:'groupName',
        width:150
      },
      {
        title:'注册时间',
        dataIndex:'createdTime',
        width:170,
        render: formatDate
      },
      {
        title:'创建人',
        dataIndex:'creator',
        width:150
      },
      {
        title:'修改时间',
        dataIndex:'updateTime',
        width:170,
        render: formatDate
      },
      {
        title:'修改人',
        dataIndex:'lastOperator',
        width:150
      },
      {
        title:'上次登陆时间',
        dataIndex:'lastLoginTime',
        width:170,
        render:formatDate
      },
      {
        title:'上次登陆IP',
        dataIndex:'lastLoginIp',
        width:170
      },
      {
        title:'上次登陆地址',
        dataIndex:'lastLoginLocation',
        width:150
      },
      {
        title:'备注',
        dataIndex:'remark',
        width:200
      },
      {
        title:'操作',
        width:420,
        fixed:'right',
        render: (user) => {
          const {id,status} = user
          return (
            <span>
              <LinkButton onClick={() => this.updateStatus(id,status==='ENABLE'?'DISABLE':'ENABLE')}>{status==='DISABLE'?'启用':'禁用'}</LinkButton>|
              <LinkButton onClick={() => this.showUpdate(user)}>修改</LinkButton>|
              <LinkButton onClick={() => {this.props.history.push({pathname:'/uas/user/list/detail',state:user});console.log(user)}}>详情</LinkButton>|
              <LinkButton onClick={() => this.bindRole(user)}>角色绑定</LinkButton>|
              <LinkButton onClick={() => this.bindGroup(user)}>组织绑定</LinkButton>|
              <LinkButton onClick={() => this.resetPwd(id)}>重置密码</LinkButton>|
              <LinkButton onClick={() => this.deleteUser(user)}>删除</LinkButton>
            </span>
            
          )
        }
      }
    ]
  }

  bindGroup = (user) => {
    this.setState({user:user,isShowBindGroup:true})
  }
 
  bindGroupConfirm = async () => {
    const groupId = this.form.getFieldsValue()
    this.form.resetFields()
    console.log('模态框采集的groupId：',groupId)
   
    const dataPost = {
      groupId:groupId.groupId,
      userIdList:[this.state.user.id]
    }
    const result = await reqBindGroup(dataPost)
    if(result.code===200){
      this.setState({isShowBindGroup:false,user:{}},()=>{
        this.getUsers(1)
      })
    }
  }

  bindRole = async (user) => {
    const result = await reqBindRole(user.id)
    if(result.code===200){
      console.log('接口请求得到所有角色allRoleSet',result.result.allRoleSet)
      console.log('接口请求得到已绑定角色alreadyBindRoleIdSet',result.result.alreadyBindRoleSet)
      this.setState({user:user,allRoleSet:result.result.allRoleSet,alreadyBindRoleIdSet:result.result.alreadyBindRoleSet},()=>this.setState({isShowBindRole:true}))

    }
  }

  bindRoleConfirm = async () => {

    console.log(this.roleIdList)
    const dataPost = {
      roleIdList:this.roleIdList,
      userId:this.state.user.id
    }
    const result = await reqUserBindRole(dataPost)
    if(result.code===200){
      this.setState({user:{}},()=>{this.setState({isShowBindRole:false})})
      
    }
  }
  

  resetPwd = (userId) => {
    Modal.confirm({
      title:`确认重置id为${userId}的用户的密码吗？`,
      onOk: async () => {
        const result = await reqResetPwd(userId)
        if(result.code===200){
          message.success('重置密码成功')
          this.getUsers(1)
        }
      }
    })
  }

  //删除某行用户
  deleteUser = (user) => {
    Modal.confirm({
      title:`确认删除${user.userName}吗？`,
      onOk: async () => {
        const result = await reqDeleteUser(user.id)
        if(result.code===200){
          message.success('删除用户成功')
          this.getUsers(1)
        }
      }
    })
  }

  //启用/禁用
  updateStatus = async (userId,status) => {
    const dataPost = {
      "userId":userId,
      "status":status
    }
    this.setState({loading:true})
    const result = await reqSwitchUserStatus(dataPost)
    if(result.code === 200){
      this.getUsers(1)
    }
  }

  //添加或更新user
  addOrUpdateUser = async () => {
    this.setState({isShowAddUpdate:false})
    const user = this.form.getFieldsValue()
    this.form.resetFields()
    console.log('修改,模态框采集的user：',user)

    if(this.state.user){//更新
      const newUser = {}
      Object.assign(newUser,this.state.user,user)
      console.log('修改，发送的role：',newUser)

      const result = await reqAddOrUpdateUser(newUser)
      if(result.code === 200){
        this.setState({user:{},groupList:[]},()=>{
          this.getUsers(1)
        })
        
      }

    }else{//添加
      const newUser = {}
      Object.assign(newUser,user)
      const result = await reqAddOrUpdateUser(newUser)
      if(result.code===200){
        this.setState({groupList:[]},()=>{
          this.getUsers(1)
        })
        this.getUsers(1)
      }
    }
  }


  //显示添加页面
  showAdd = () => {
    this.setState({user:{},isShowAddUpdate:true})
  }

  //点击修改显示修改界面
  showUpdate = (user) => {
    console.log(this.state.groupList)
    this.setState({user,isShowAddUpdate:true})
  }

  //获取组织列表
  getGroupList = async () => {
    const group = await reqGroupList()
    if(group.code===200){
      const groupList = group.result.map((item) => [item.id,item.groupName])
      console.log(groupList)
      this.setState({groupList})
    }
    
  }

  getUsers = async (pageNum) => {
    
   
    this.pageNum = pageNum
    this.setState({loading:true})
    const {searchLoginName,searchPhone,searchUserName,searchType} = this.state
    const loginAfter = JSON.parse(window.localStorage.getItem('loginAfter'))
    const groupId = loginAfter.loginAuthDto.groupId
    const dataPost = {
      "pageNum": `${pageNum}`,
      "pageSize": 10,
      "userName": `${searchUserName}`,
      "loginName": `${searchLoginName}`,
      "mobileNo": `${searchPhone}`,
      "status": `${searchType===''?'':(searchType==='roleOn'?'ENABLE':'DISABLE')}`,
      groupId:groupId
    }
    const result = await reqUserList(dataPost)
    if(result.code===200){
      this.setState({loading:false})
       
      const users = result.result.list
      const total = result.result.total*1
      this.setState({users,total})
    }
  }

  resetSearch = () => {
    const searchLoginName = ''
    const searchUserName = ''
    const searchType = ''
    const searchPhone = ''
    this.setState({searchUserName,searchType,searchLoginName,searchPhone},()=> {
      this.getUsers(1)
    })
    
  }

  selectRow = (record) => {
    const selectedRowKeys = [...this.state.selectedRowKeys];
    if (selectedRowKeys.indexOf(record.id) >= 0) {
      selectedRowKeys.splice(selectedRowKeys.indexOf(record.id), 1);
    } else {
      selectedRowKeys.push(record.id);
    }
    this.setState({ selectedRowKeys });
  }

  onSelectedRowKeysChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getGroupList()
    this.getUsers(1)
  }

  render(){
  
    const {users,user,groupList,selectedRowKeys,total,loading,searchType,searchUserName,searchLoginName,searchPhone,isShowAddUpdate,isShowBindRole,isShowBindGroup,allRoleSet,alreadyBindRoleIdSet} = this.state
    console.log('index中state拿到的allroleSet',allRoleSet)
    console.log('index中state拿到的alreadyBindRoleIdSet',alreadyBindRoleIdSet)
    const title = (
      <span>
        <Select placeholder="状态" value={searchType?searchType:undefined} style={{width:120,}} onChange={value => this.setState({searchType:value})}>
          <Option value="roleOn" key="roleOn">启用</Option>
          <Option value="roleOff" key="roleOff">禁用</Option>
        </Select>
        <Input placeholder="登录名" style={{width:150,margin:'0 15px'}} value={searchLoginName} onChange={event => this.setState({searchLoginName:event.target.value})}/>
        <Input placeholder="用户名" style={{width:150,marginRight:'15px'}} value={searchUserName} onChange={event => this.setState({searchUserName:event.target.value})}/>
        <Input placeholder="手机号" style={{width:150,marginRight:'15px'}} value={searchPhone} onChange={event => this.setState({searchPhone:event.target.value})}/>
        <Button type="primary" onClick={() => {this.getUsers(1)}} style={{marginRight:'15px'}}>筛选</Button>
        <Button type="default" onClick={() => {this.resetSearch()}}>重置</Button>
      </span>
    )

    const extra = (
      <span>
        <Button type="primary" style={{marginRight:'15px'}} onClick={() => this.showAdd()}><Icon type="plus"/>添加用户</Button>
        <Button type="primary" onClick={() => this.props.history.push('/uas/user/list/online')}><Icon type="delete"/>在线用户</Button>
      </span>
      
    )
  
    const rowSelection = {
      selectedRowKeys,
      onChange:this.onSelectedRowKeysChange,
    }
  
    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          loading={loading}
          rowKey="id"
          dataSource={users}
          columns={this.columns}
          scroll={{ x: 1500 }}
          rowSelection={rowSelection}
          onRow={(record)=>({
            onClick:()=>{
              this.selectRow(record)
            }
          })}
          pagination={{
            current:this.pageNum,
            defaultPageSize:10,
            showQuickJumper:true,
            total:total,
            onChange:this.getUsers,
          }}
        />
        <Modal
          title={user.id?'编辑用户':'添加用户'}
          visible={isShowAddUpdate}
          onOk={this.addOrUpdateUser}
          onCancel={() => {this.setState({isShowAddUpdate:false,role:{}});this.form.resetFields();}}
          okText="确认"
          cancelText="取消"
        >
          <AddUpdateForm
            setForm={(form)=>{this.form = form}} 
            user={user} 
            groupList={groupList}
          />
        </Modal>
      
        <Modal
          title="绑定角色"
          visible={isShowBindRole}
          onOk={this.bindRoleConfirm}
          onCancel={() => {this.setState({user:{}},()=>{this.setState({isShowBindRole:false})});}}
          okText="确认"
          cancelText="取消"
          width="800px"
        >
          <BindRole
            setRoleIdList={(roleIdList)=>{this.roleIdList = roleIdList}} 
            allRoleSet={allRoleSet} 
            alreadyBindRoleIdSet={alreadyBindRoleIdSet}
          />
        </Modal>
        <Modal
          title="绑定组织"
          visible={isShowBindGroup}
          onOk={this.bindGroupConfirm}
          onCancel={() => {this.setState({user:{}},()=>{this.setState({isShowBindGroup:false})});this.form.resetFields()}}
          okText="确认"
          cancelText="取消"
        >
          <BindGroup
            setForm={(form)=>{this.form = form}}
            user={user} 
            groupList={groupList}
          />
        </Modal>
      </Card>
    )
  }
}