import React,{Component} from 'react'
import {Table,Button,Card,Select,Input,Icon,Modal} from 'antd'
import LinkButton from '../../components/link-button'
import {formatDate} from '../../utils/dateUtils'
import AddUpdateForm from './add-update-form'



const Option = Select.Option
export default class Authority extends Component{

  state={
    auths:[
      {
        _id:1,
        status:1,
        name:'test',
        authCode:1211112351,
        url:'/action/save',
        menuName:'权限管理',
        staff:'user2',
        changeTime:15662222542,
       
      }
    ], //当前页的权限数组
    auth:{},//选中的auth
    total:0,//角色总条数
    loading:false, //是否正在加载中
    searchAuthURL:'', //搜索权限URL
    searchAuthCode:'', //搜索权限编码
    searchAuthName:'', //搜索权限名称
    searchAuth:'save', //根据哪个字段搜索
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
        width:100,
        title:'状态',
        dataIndex:'status'
      },
     
      {
        title:'权限名称',
        dataIndex:'name'
      },
      {
        title:'权限编码',
        dataIndex:'authCode'
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
        dataIndex:'changeTime',
        render: formatDate
      },
      {
        title:'操作人',
        dataIndex:'staff'
      },
      {
        title:'操作',
        render: (role) => {
          const {_id,status} = role
          return (
            <span>
              <LinkButton onClick={() => {this.updateStatus(_id,status===1?2:1)}}>{status===1?'启用':'禁用'}</LinkButton>|
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
  
    const {auths,auth,total,loading,searchAuth,searchAuthName,searchAuthCode,searchAuthURL,isShowAddUpdate,isShowBindRole} = this.state
  
    const title = (
      <span>
        <Select value={searchAuth} style={{width:120,}} onChange={value => this.setState({searchAuth:value})}>
          <Option value="save" key="save">保存权限</Option>
          <Option value="edit" key="edit">修改权限</Option>
          <Option value="delete" key="delete">删除权限</Option>
        </Select>
        <Input placeholder="权限编码" style={{width:150,margin:'0 15px'}} value={searchAuthCode} onChange={event => this.setState({searchAuthCode:event.target.value})}/>
        <Input placeholder="权限名称" style={{width:150,marginRight:'15px'}} value={searchAuthName} onChange={event => this.setState({searchAuthName:event.target.value})}/>
        <Input placeholder="权限URL" style={{width:150,marginRight:'15px'}} value={searchAuthURL} onChange={event => this.setState({searchAuthURL:event.target.value})}/>
        <Button type="primary" onClick={() => {this.getProducts(1)}} style={{marginRight:'15px'}}>筛选</Button>
        <Button type="default" onClick={() => {this.getProducts(1)}}>重置</Button>
      </span>
    )

    const extra = (
      <span>
        <Button type="primary" style={{marginRight:'15px'}} onClick={() => this.setState({isShowAddUpdate:true})}><Icon type="plus"/>添加权限</Button>
        <Button type="primary" ><Icon type="delete"/>批量删除</Button>
      </span>
      
    )
  
    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          loading={loading}
          rowKey="_id"
          dataSource={auths}
          columns={this.columns}
          rowSelection={{
            type:'checkbox',
            selectedRowKeys:[auths._id],
            onSelect: (auth) => {
              this.setState({
                auth
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
          title="添加权限"
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
        
        
      </Card>
    )
  }
}