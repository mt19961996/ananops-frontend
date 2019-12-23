import React,{Component} from 'react'
import {Table,Button,Card,Select,Input,Icon,Modal,message} from 'antd'
import LinkButton from '../../components/link-button'
import {formatDate} from '../../utils/dateUtils'
import AddUpdateForm from './add-update-form'
import {reqAuthList,reqDeleteBatchAuth,reqSwitchAuthStatus,reqDeleteAuth,reqAddOrUpdateAuth} from '../../axios/index'



const Option = Select.Option
export default class Authority extends Component{

  state={
    auths:[], //当前页的权限数组
    auth:{},//选中的auth
    selectedRowKeys:[], //当前选中的权限组
    total:0,//角色总条数
    loading:false, //是否正在加载中
    searchAuthURL:'', //搜索权限URL
    searchAuthCode:'', //搜索权限编码
    searchAuthName:'', //搜索权限名称
    searchMenuName:'', //根据哪个菜单名称搜索
    isShowAddUpdate:false,  
  }

  initColumns = () => {
    this.columns = [
      {
        title:'序号',
        dataIndex:'id',
      }, 
      {
        width:100,
        title:'状态',
        dataIndex:'status',
        render:(status) => status==='ENABLE'?'启用':'禁用'
      },
     
      {
        title:'权限名称',
        dataIndex:'actionName'
      },
      {
        title:'权限编码',
        dataIndex:'actionCode'
      },
      {
        title:'URL地址',
        dataIndex:'url'
      },
      {
        title:'菜单名称',
        dataIndex:'menuName'
      },
      {
        title:'修改时间',
        dataIndex:'updateTime',
        render: formatDate
      },
      {
        title:'操作人',
        dataIndex:'lastOperator'
      },
      {
        title:'操作',
        render: (auth) => {
          const {id,status} = auth
          return (
            <span>
              <LinkButton onClick={() => this.updateStatus(id,status==='ENABLE'?'DISABLE':'ENABLE')}>{status==='DISABLE'?'启用':'禁用'}</LinkButton>|
              <LinkButton onClick={() => this.showUpdate(auth)}>修改</LinkButton>|
              <LinkButton onClick={() => this.deleteAuth(auth)}>删除</LinkButton>
            </span>
            
          )
        }
      }
    ]
  }

  //显示添加模态框
  showAdd = () => {
    
    this.setState({auth:{},isShowAddUpdate:true})
  }

  //显示修改模态框
  showUpdate = (auth) => {
    this.setState({auth,isShowAddUpdate:true})
  }

  //启用/禁用
  updateStatus = async (roleId,status) => {
    const dataPost = {
      "id":roleId,
      "status":status
    }
    this.setState({loading:true})
    const result = await reqSwitchAuthStatus(dataPost)
    if(result.code === 200){
      this.getAuths(1)
    }
  }


  //根据id删除权限
  deleteAuth = (auth) => {
    Modal.confirm({
      title:`确认删除${auth.actionName}吗？`,
      onOk: async () => {
        const result = await reqDeleteAuth(auth.id)
        if(result.code===200){
          message.success('删除角色成功')
          this.getRoles(1)
        }
      }
    })
  }

  //批量删除
  deleteBatch = async () => {
    Modal.confirm({
      title:`确认删除这${this.state.selectedRowKeys.length}项吗？`,
      onOk: async () => {
        console.log('deleteArray:',this.state.selectedRowKeys)
        const result = await reqDeleteBatchAuth(this.state.selectedRowKeys)
        if(result.code===200){
          message.success('批量删除权限成功')
          this.getAuths(1)
        }
      }
    })
  }

  getAuths = async (pageNum) => {
    this.pageNum = pageNum
    this.setState({loading:true})
    const {searchMenuName,searchAuthCode,searchAuthName,searchAuthURL} = this.state
    
    const dataPost = {
      "actionCode": `${searchAuthCode}`,
      "actionName": `${searchAuthName}`,
      "menuIdList": [
        searchMenuName
      ],
      "orderBy": "",
      "pageNum": pageNum,
      "pageSize": 10,
      "status": "",
      "url": `${searchAuthURL}`
    }
    const result = await reqAuthList(dataPost)
    if(result.code===200){
      this.setState({loading:false})
       
      const auths = result.result.list
      const total = result.result.total
      this.setState({auths,total})
    }
  }

  //添加或更新auth
  addOrUpdateAuth = async () => {
    this.setState({isShowAddUpdate:false})
    const auth = this.form.getFieldsValue()
    const menuIdList = {menuIdList:[auth.menuId]}
    this.form.resetFields()
    console.log('修改,模态框采集的auth：',auth)

    if(this.state.auth){//更新
      const newAuth = {}
      Object.assign(newAuth,this.state.auth,auth,menuIdList)
      console.log('修改，发送的auth：',newAuth)

      const result = await reqAddOrUpdateAuth(newAuth)
      if(result.code === 200){
        this.setState({auth:{}},()=>{
          this.getAuths(1)
        })
        
      }

    }else{//添加
      const newAuth = {}
      Object.assign(newAuth,auth)
      const result = await reqAddOrUpdateAuth(newAuth)
      if(result.code===200){
        this.getAuths(1)
      }
    }
  }

  resetSearch = () => {
    const searchMenuName = ''
    const searchAuthName = ''
    const searchAuthCode = ''
    const searchAuthURL = ''
    this.setState({searchMenuName,searchAuthName,searchAuthCode,searchAuthURL},()=> {
      this.getAuths(1)
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
    this.getAuths(1)
  }

  render(){
  
    const {auths,auth,selectedRowKeys,total,loading,searchMenuName,searchAuthName,searchAuthCode,searchAuthURL,isShowAddUpdate,isShowBindRole} = this.state
  
    const hasSelected = selectedRowKeys.length>0
  
    const title = (
      <span>
        <Select value={searchMenuName===''?'菜单名称':searchMenuName} style={{width:120,}} onChange={value => this.setState({searchMenuName:value})}>
          <Option value="1111" key="1111">角色管理</Option>
          <Option value="1112" key="1112">用户管理</Option>
          <Option value="1113" key="1113">菜单管理</Option>
          <Option value="1114" key="1114">权限管理</Option>
          <Option value="1115" key="1115">组织管理</Option>
          <Option value="399623736623501312" key="399623736623501312">数据字典</Option>
        </Select>
        <Input placeholder="权限编码" style={{width:150,margin:'0 15px'}} value={searchAuthCode} onChange={event => this.setState({searchAuthCode:event.target.value})}/>
        <Input placeholder="权限名称" style={{width:150,marginRight:'15px'}} value={searchAuthName} onChange={event => this.setState({searchAuthName:event.target.value})}/>
        <Input placeholder="权限URL" style={{width:150,marginRight:'15px'}} value={searchAuthURL} onChange={event => this.setState({searchAuthURL:event.target.value})}/>
        <Button type="primary" onClick={() => {this.getAuths(1)}} style={{marginRight:'15px'}}>筛选</Button>
        <Button type="default" onClick={() => {this.resetSearch()}}>重置</Button>
      </span>
    )

    const extra = (
      <span>
        <Button type="primary" style={{marginRight:'15px'}} onClick={() => this.showAdd()}><Icon type="plus"/>添加权限</Button>
        <Button type="primary" disabled={!hasSelected} onClick={() => this.deleteBatch()}><Icon type="delete"/>批量删除</Button>
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
          dataSource={auths}
          columns={this.columns}
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
            onChange:this.getAuths,
          }}
        />
        <Modal
          title={auth.id?'编辑权限':'添加权限'}
          visible={isShowAddUpdate}
          onOk={this.addOrUpdateAuth}
          onCancel={() => {this.setState({isShowAddUpdate:false,auth:{}});this.form.resetFields()}}
          okText="确认"
          cancelText="取消"
        >
          <AddUpdateForm
            setForm={(form)=>{this.form = form}}
            auth={auth}
          />
        </Modal>
        
        
      </Card>
    )
  }
}