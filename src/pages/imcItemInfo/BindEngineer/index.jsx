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
          engineerList:[],
          token:window.localStorage.getItem('token')
        }
        // this.getDetail = this.getDetail.bind(this);
    }
    componentDidMount(){
      const { 
        match : { params : { taskId,itemId } }
      } = this.props
      console.log("任务id：" + taskId)
      this.getDetail(taskId)

    }
    //获取当前巡检任务子项对应的巡检任务的信息
    getDetail= async(id)=>{
      console.log("+++"+id)
      const res1 = await axios({
        method: 'GET',
        url: '/imc/inspectionTask/getTaskByTaskId/'+id,
        headers: {
          'deviceId': this.deviceId,
          'Authorization':'Bearer '+this.state.token,
        },
      })
      if(res1 && res1.status === 200){
        this.setState({
          imcTaskDetail:res1.data.result
       }) ;
      }
      const res2 = await axios({
        method: 'POST',
        url: '/spc/engineer/getEngineerIdListByProjectId/'+this.state.imcTaskDetail.projectId,
        headers: {
          'deviceId': this.deviceId,
          'Authorization':'Bearer '+this.state.token,
        },
      })
      if(res2 && res2.status === 200){
        this.setState({
          engineerList:res2.data.result
        })
        console.log("列表：" + this.state.engineerList)
      }

    }
    render(){
      const {
        match : { params : { taskId,itemId } }
      } = this.props   
      const List = [];
      const engineerIdList = this.state.engineerList;
      let length=0;
      for(let engineer in engineerIdList){
        length++;
      }
      for(let i=0;i<length;i++){
        List.push(<Option key={engineerIdList[i]}>{engineerIdList[i]}</Option>);
      }
      // for (let i = 10; i < 36; i++) {
      //   children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
      // }

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
                {List}
              </Select>
              
            </div>
          </div>  
        )
    }

}
export default BindEngineer