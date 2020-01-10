import React,{Component} from 'react'
import {Form,Input,Select,Icon,Radio} from 'antd'
import PropTypes from 'prop-types'
import axios from 'axios'
const Item = Form.Item
let newArr = []
class Plan extends Component{
    constructor(props){
        super(props)
        this.state={
          detail:{},
          DeviceOrderItemInfoDto: [
            {
            status:null,//是否在维保期内
            deviceID: '',// 异常设备
            manufacuture: '',// 对异常设备的描述
            deleteDisplay: false,//删除异常设备按钮是否出现
            addDisplay: true,//添加异常项按钮是否出现
            }
        ],
        devices:{},
        token:window.localStorage.getItem('token')
        }
      //  this.getDevice=this.getDevice.bind(this)
    }
    componentDidMount(){
     //   this.getDevice();
    }
    getDevice=()=>{
        // axios({
        //     method: 'GET',
        //     url: '/rdc/deviceOrder/devices',
        //     headers: {
        //       'deviceId': this.deviceId,
        //       'Authorization':'Bearer '+this.state.token,
        //     },
        //   })
        //   .then((res) => {
        //     console.log(res)
        //     if(res && res.status === 200){     
        //     this.setState({
        //       devices:res.data.result
        //     })
        //    var device=res.data.result
    
        //   .catch(function (error) {
        //       console.log(error);
        //   });
          
    }
    selectStatus=(value, index)=>{
       
        newArr = this.state.DeviceOrderItemInfoDto
        newArr[index].status = value
        this.setState({ DeviceOrderItemInfoDto: newArr })
    }
    selectdeviceID=(value,index)=>{
        console.log(value)
    }
  render(){ 
    const formItemLayout = {
      labelCol:{span:5},
      wrapperCol:{span:15}
    }
    const { 
        form: { getFieldDecorator }, 
        match : { params : { id } }
      } = this.props
    const { DeviceOrderItemInfoDto } = this.state

    return (
      <Form {...formItemLayout}>

        <Item label="工单编码：">
          {
            getFieldDecorator('objectId',{
              initialValue:id,
              rules:[{
                required:true,
                message:'请输入工单编码',
              }]
            })(
              <Input placeholder="请输入工单编码"  disabled='true'></Input>
            )
          }
         
        </Item>
        <Item label="备品备件订单申请人 ：">
          {
            getFieldDecorator('applicant',{
              initialValue:window.localStorage.getItem('roleName'),
              rules:[{
                required:true,
                message:'请输入备品备件订单申请人 ',
              }]
            })(
              <Input placeholder="请输入备品备件订单申请人 "  disabled='true'></Input>
            )
          }
         
        </Item>
        <Item label="备品备件订单申请人编号：">
          {
            getFieldDecorator('applicantId',{
              initialValue:window.localStorage.getItem('id'),
              rules:[{
                required:true,
                message:'请输入备品备件订单申请人编号',
              }]
            })(
              <Input placeholder="请输入备品备件订单申请人编号"  disabled='true'></Input>
            )
          }
         
        </Item>
        <Item label="备品备件订单审批人：">
          {
            getFieldDecorator('currentApprover',{
              rules:[{
                required:true,
                message:'请输入备品备件订单审批人',
              }]
            })(
              <Input placeholder="请输入备品备件订单审批人"></Input>
            )
          }
         
        </Item>
        <Item label="备品备件订单审批人编号：">
          {
            getFieldDecorator('currentApprover',{
              rules:[{
                required:true,
                message:'请输入备品备件订单审批人编号',
              }]
            })(
              <Input placeholder="请输入备品备件订单审批人编号"></Input>
            )
          }
         
        </Item>
        <Item label="备件添加：">
            {getFieldDecorator('DeviceOrderItemInfoDto')(
              <div>
              {DeviceOrderItemInfoDto &&
                DeviceOrderItemInfoDto.map((item, index) => (
                  <div className="inspection-log-abnormal" key={index}>
                    <div className="inspection-log-abnormal-flex">
                    <Radio.Group 
                        onChange={(e) => {this.selectStatus(e.target.value, index) }} 
                        value={item.status}>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                    {item.status===1?
                    <div>
                      <Select
                        placeholder="请选择设备编号"
                        className="inspection-log-abnormal-select"
                        value={item.deviceID}
                        onChange={(value) => { this.selectdeviceID(value, index) }}
                        allowClear
                      >
                          {/* <Select.Option key='1'
                            value='1'
                            >1
                            </Select.Option>
                            <Select.Option key='2'
                            value='2'
                            >2
                            </Select.Option> */}
                            {this.getDevice}
                      </Select>
                      <Input
                        value={item.manufacture}
                        onChange={(value) => { this.manufactureChange(value, index) }}
                        onBlur={this.descriptionTextJudge}
                        placeholder="请输入设备服务商"
                      /></div>
                      :<div>
                    <Input
                      value={item.manufacture}
                      onChange={(value) => { this.manufactureChange(value, index) }}
                      onBlur={this.descriptionTextJudge}
                      placeholder="请输入设备服务商"
                    />
                    </div>
                    }
                      
                    </div>
                    <Icon type="minus-circle" className="inspection-log-abnormal-delete"
                      style={{ display: (item.deleteDisplay === true) ? '' : 'none' }}
                      onClick={() => { this.deleteAbnormalItem(index) }}
                    />
                    <Icon type="plus-circle" className="inspection-log-abnormal-plus"
                      style={{ display: (item.addDisplay === true) ? '' : 'none' }}
                      onClick={this.addAbnormalItem}
                    />
                  </div>
                ))
              }
            </div>
          )}
        </Item>
        {/* <Item label="负责人ID：">
          {
            getFieldDecorator('principalId',{
              initialValue:detail.principalId,
              disabled:true,
              rules:[{
                required:true,
                message:'请输入负责人ID'
              }]
            })(
              <Input  disabled='true' placeholder="请输入负责人ID"></Input>
            )
          }       
        </Item>
        <Item label="维修工ID：">
          {
            getFieldDecorator('maintainerId',{
              initialValue:detail.maintainerId,
              rules:[{
                required:false,
                message:'请输入维修工ID'
              }]
            })(
              <Input placeholder="请输入维修工ID"></Input>
            )
          }
         
        </Item>
      
        <Item label="设备ID：">
          {
            getFieldDecorator('deviceId',{
              initialValue:detail.deviceId,
              rules:[{
                required:true,
                message:'请输入设备ID'
              }]
            })(
              <Input placeholder="请输入设备ID"></Input>
            )
          }
         
        </Item>
        <Item label="设备类型：">
          {
            getFieldDecorator('deviceType',{
              initialValue:detail.deviceType,
              rules:[{
                required:true,
                message:'请输入设备类型'
              }]
            })(
              <Input placeholder="请输入设备类型"></Input>
            )
          }
         
        </Item>
        <Item label="总花费：">
          {
            getFieldDecorator('cost',{
              initialValue:detail.cost,
              rules:[{
                required:false,
                message:'请输入总花费'
              }]
            })(
              <Input  placeholder="请输入总花费（¥）"></Input>
            )
          }
         
        </Item>
        <Item label="总计：">
          {
            getFieldDecorator('count',{
              initialValue:detail.count,
              rules:[{
                required:false,
                message:'请输入总计'
              }]
            })(
              <Input  placeholder="请输入总计"></Input>
            )
          }
         
        </Item> */}
      </Form>
    )
  }
}
export default Form.create()(Plan)