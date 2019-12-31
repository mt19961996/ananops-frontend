import React,{Component} from 'react'
import {Tree,Button,Form,Card} from 'antd'
import menuConfig from '../../config'
import AddUpdateForm from './add-update-menu'

const TreeNode = Tree.TreeNode
export default class Menu extends Component{

  getTreeNodes = (menuList) => {
    return menuList.reduce((pre,item) => {
      pre.push(
        <TreeNode title={item.title} key={item.key}>
          {item.children?this.getTreeNodes(item.children):null}
        </TreeNode>)
      return pre
    },[])
  }

  componentWillMount(){
    this.treeNodes = this.getTreeNodes(menuConfig)
    console.log(menuConfig)
  }

  render(){
    
    
    return (
      <div>
        <span style={{marginLeft:30}}>
          <Button type="danger">禁用</Button>
          <Button type="primary" style={{marginLeft:30}}>添加子节点</Button>
          <Button type="default" style={{marginLeft:30}}>修改</Button>
          <Button type="danger" style={{marginLeft:30}}>删除</Button>
        </span>
        <div style={{display:"flex",marginTop:50}}>
          <div style={{width:300,marginLeft:30}}>
            <Tree>
              <TreeNode title="运营工作台" key="all">
                {this.treeNodes}
              </TreeNode>
            </Tree>
          </div>
          <div style={{width:500,marginLeft:50}}>
            <Card title="编辑菜单">
              <AddUpdateForm
                setForm={(form)=>{this.form = form}} menu={menuConfig}
              />
            </Card>
          </div>
        </div>
      </div>
    )
  }
}