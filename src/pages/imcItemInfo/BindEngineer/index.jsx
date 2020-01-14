import React, { Component, } from 'react';
import {Descriptions, Badge,Button,Row,Col,Table,Icon,Select,Form } from 'antd';
import moment from 'moment';
import './index.styl'
import axios from 'axios'
import { Link } from 'react-router-dom'
const { Option } = Select;
// const token=window.localStorage.getItem('token')
class BindEngineer extends Component{
    constructor(props){
        super(props)
        this.state={
          imcTaskDetail:{

          },
          
          engineerList:{

          },
          token:window.localStorage.getItem('token')
        }
        this.getDetail = this.getDetail.bind(this);
    }
    componentDidMount(){
      const { 
        match : { params : { taskId,itemId } }
      } = this.props
      console.log(itemId)

    }
    //获取当前巡检任务子项对应的巡检任务的信息
    getImcTaskDetail=(id)=>{

    }
    getDetail=(id)=>{
      axios({
        method: 'GET',
        url: '/imc/inspectionTask/getTaskByTaskId/'+id,
        headers: {
          'deviceId': this.deviceId,
          'Authorization':'Bearer '+this.state.token,
        },
      })
    .then((res) => {
        if(res && res.status === 200){   
            console.log(res.data.result)  
        this.setState({
           imcTaskDetail:res.data.result
        }) ;
        }
    })
    .catch(function (error) {
        console.log(error);
    });
    

    }
    render(){
      const {
        match : { params : { taskId,itemId } }
      } = this.props   
      const children = [];
      for (let i = 10; i < 36; i++) {
        children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
      }

        return(
          <div className="bg">
            <div className="searchPart">
              <Row>
                  <Col span={5}>
                  <Link to={`/cbd/item/${taskId}`}>
                      <Icon type="arrow-left" ></Icon>返回
                  </Link>
                  </Col>
              </Row> 
              <Select mode="tags" style={{ width: '100%' }} placeholder="请选择和该项目绑定的工程师" >
                {children}
              </Select>
              
            </div>
          </div>  
        )
    }

}
export default BindEngineer