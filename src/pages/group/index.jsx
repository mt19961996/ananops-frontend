import React,{Component} from 'react'
import {Tree,Button,Table,Card,message} from 'antd'
import menuConfig from '../../config'
import AddUpdateForm from './add-update-group'
import {reqGroupList,reqAddOrUpdateGroup} from '../../axios/index'
import {formatDate} from '../../utils/dateUtils'

const TreeNode = Tree.TreeNode
export default class Group extends Component{

  state = {
    groups:[],
    groupList:[] //上级组织列表
  }


  initColumns = () => {
    this.columns = [
      {
        title:'ID',
        dataIndex:'id',
        width:120,
      }, 
      {
        title:'父组织ID',
        dataIndex:'pId',
        width:100
      },
      {
        title:'组织名称',
        dataIndex:'groupName',
        width:150
      },
      {
        title:'组织地址',
        dataIndex:'groupAddress',
        width:150
      },
      {
        title:'联系人',
        dataIndex:'contact',
        width:50
      },
      {
        title:'联系电话',
        dataIndex:'contactPhone',
        width:100
      },
      {
        title:'创建人',
        dataIndex:'creator',
        width:50
      },
      {
        title:'创建时间',
        dataIndex:'createdTime',
        width:100,
        render: formatDate
      },
      {
        title:'状态',
        dataIndex:'status',
        width:50,
        render:(status)=>{return <span>{status===0?'启用':'禁用'}</span>}
      }
    ]
  }
 
  getGroups = async () => {
    const result = await reqGroupList()
    if(result.code===200){
      this.setState({groups:result.result})
    }
  }

  
  getTreeNodes = (menuList) => {
    return menuList.reduce((pre,item) => {
      pre.push(
        <TreeNode title={item.title} key={item.key}>
          {item.children?this.getTreeNodes(item.children):null}
        </TreeNode>)
      return pre
    },[])
  }

  //获取上级组织列表
  getGroupList = async () => {
    const group = await reqGroupList()
    if(group.code===200){
      const groupList = group.result.map((item) => [item.id,item.groupName])
      console.log(groupList)
      this.setState({groupList})
    }
    
  }


  saveGroup = async () => {
    const newGroup = this.form.getFieldsValue()
    //this.form.resetFields()
    console.log(newGroup)

    const result = await reqAddOrUpdateGroup(newGroup)
    if(result.code===200){
      this.form.resetFields()
      this.getGroups()
      message.success("组织添加成功")
    }
  }

  componentWillMount(){
    this.treeNodes = this.getTreeNodes(menuConfig)
    console.log(menuConfig)
    this.initColumns()
  }

  componentDidMount() {
    this.getGroups()
    this.getGroupList()
  }

  render(){
    const {groups,groupList} = this.state
    
    return (
      <div>
        <span style={{marginLeft:30}}>
          <Button type="danger">禁用</Button>
          <Button type="primary" style={{marginLeft:30}}>添加子节点</Button>
          <Button type="default" style={{marginLeft:30}}>修改</Button>
          <Button type="danger" style={{marginLeft:30}}>删除</Button>
          <Button type="primary" style={{marginLeft:30}}>绑定用户</Button>
        </span>
        <div style={{display:"flex",marginTop:50}}>
          <div style={{width:150,marginLeft:30}}>
            <Tree>
              <TreeNode title="运营工作台" key="all">
                {this.treeNodes}
              </TreeNode>
            </Tree>
          </div>
          <div style={{width:550,marginLeft:20}}>
            <Card title="编辑组织">
              <AddUpdateForm
                setForm={(form)=>{this.form = form}}
                groupList={groupList}
              />
              <Button type="primary" onClick={this.saveGroup}>保存</Button>
            </Card>
          </div>
          <Table
            style={{width:1000,marginLeft:20}}
            bordered
            rowKey="id"
            dataSource={groups}
            columns={this.columns}
            scroll={{ x: 1500 }}
          />
        </div>
      </div>
    )
  }
}