import React,{Component} from 'react'
import {Card,Row,Col,Form,Input,Radio,Select,Tree} from 'antd'
import LinkButton from '../../components/link-button'

const Item = Form.Item
const TreeNode = Tree.TreeNode
const Search = Item.Search


export default class Group extends Component{

 

  render(){
  
    
  

    const title = (
      <span>
        <LinkButton>禁用</LinkButton>|
        <LinkButton>添加子节点</LinkButton>|
        <LinkButton>修改</LinkButton>|
        <LinkButton>删除</LinkButton>|
        <LinkButton>绑定用户</LinkButton>|
      </span>
    )
  
    const formItemLayout = {
      labelCol:{span:4},
      wrapperCol:{span:15}
    }
  
    return (
      <Card title={title}>
        <Row gutter={4}>
          <Col span={6}>
            
          </Col>
          <Col span={12}>
            <Form {...formItemLayout}>
              <Item title="test">
                test
              </Item>
            </Form>
          </Col>
        </Row>
      </Card>
    )
  }
}