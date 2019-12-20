import React, { Component, } from 'react';
import {Descriptions, Badge,Button,Modal,Upload,Icon} from 'antd';
import moment from 'moment';
import './index.styl'
import { Link } from 'react-router-dom'
import axios from 'axios'
const token=window.localStorage.getItem('token')
class ManagementDetail extends Component{
    constructor(props){
        super(props)
            this.state={
              contractDetail:{

              },
              visible:false,
            }
            this.getDetail = this.getDetail.bind(this);
    }
  componentDidMount(){
    const { 
      match : { params : { id } }
    } = this.props
    console.log(id)
    this.getDetail(id);   
  }
  getDetail=(id)=>{
    axios({
      method: 'POST',
      url: '/pmc/contract/getContractById/'+id,
      headers: {
        'deviceId': this.deviceId,
        'Authorization':'Bearer '+token,
      },
    })
    .then((res) => {
        if(res && res.status === 200){     
        this.setState({
            contractDetail:res.data.result
        }) ;
        }
    })
    .catch(function (error) {
        console.log(error);
    });
  }
  visible=()=>{
    this.setState({visible:true})
  }
  onOk=()=>{
    this.setState({visible:false})
  }
  handleCancel=()=>{
    this.setState({visible:false})
  }
  handleChange=(info)=>{

  }
    render(){
      const {contractDetail,visible}=this.state
      const props = {
        onChange: this.handleChange,
        multiple: true,
      };
        return(
            <div className="bg">
            <Descriptions bordered className="descriptions">
              <Descriptions.Item label="合同ID" span={1.5}>{contractDetail.id}</Descriptions.Item>
              <Descriptions.Item label="合同编号" span={1.5}>{contractDetail.contractCode}</Descriptions.Item>
              <Descriptions.Item label="合同名称" span={1.5}>{contractDetail.contractName}</Descriptions.Item>
              <Descriptions.Item label="合同类型" span={1.5}>{contractDetail.contractType}</Descriptions.Item>
              <Descriptions.Item label="甲方名称" span={1.5}>{contractDetail.partyAName}</Descriptions.Item> 
              <Descriptions.Item label="甲方ID" span={1.5}>{contractDetail.partyAId}</Descriptions.Item> 
              <Descriptions.Item label="乙方名称" span={1.5}>{contractDetail.partyBName}</Descriptions.Item> 
              <Descriptions.Item label="乙方ID" span={1.5}>{contractDetail.partyBId}</Descriptions.Item> 
              <Descriptions.Item label="甲方负责人" span={1.5}>{contractDetail.alegalName}</Descriptions.Item> 
              <Descriptions.Item label="乙方负责人" span={1.5}>{contractDetail.blegalName}</Descriptions.Item> 
              <Descriptions.Item label="乙方代理内容" span={3}>{contractDetail.agentContent}</Descriptions.Item> 
              <Descriptions.Item label="乙方开户银行" span={1.5}>{contractDetail.agentContent}</Descriptions.Item> 
              <Descriptions.Item label="乙方银行账号" span={1.5}>{contractDetail.agentContent}</Descriptions.Item> 
              <Descriptions.Item label="乙方供辅助金额" span={3}>{contractDetail.agentContent}</Descriptions.Item> 
              <Descriptions.Item label="合同开始时间" span={1.5}>{contractDetail.startTime}</Descriptions.Item>
              <Descriptions.Item label="合同结束时间" span={1.5}>{contractDetail.endTime}</Descriptions.Item>
              <Descriptions.Item label="合同签订时间" span={1.5}>{contractDetail.signTime}</Descriptions.Item>   
              <Descriptions.Item label="合同存放路径" span={1.5}>{contractDetail.filePath}</Descriptions.Item>    
              <Descriptions.Item label="付款时间" span={1.5}>{contractDetail.paymentTime}</Descriptions.Item>
              <Descriptions.Item label="支付方式" span={1.5}>{contractDetail.paymentType}</Descriptions.Item>
              <Descriptions.Item label="项目金额" span={1.5}>{contractDetail.projectMoney}</Descriptions.Item>
              <Descriptions.Item label="乙方是否包备品备件" span={1.5}>{contractDetail.isSparePart===0?"是":"否"}</Descriptions.Item>
              <Descriptions.Item label="乙方是否提供备品备件替换服务" span={1.5}>{contractDetail.isSpareService===0?"是":"否"}</Descriptions.Item>
              <Descriptions.Item label="维修维护最迟响应时间（小时）" span={1.5}>{contractDetail.lastResponseTime}</Descriptions.Item>
              <Descriptions.Item label="月度记录表提交周期（天）" span={1.5}>{contractDetail.recordTime}</Descriptions.Item>
              <Descriptions.Item label="维修工身份验证流程" span={3}>{contractDetail.verification}</Descriptions.Item>
              <Descriptions.Item label="合同是否变更">{contractDetail.isChange===0?"是":"否"}</Descriptions.Item>
              <Descriptions.Item label="合同是否作废">{contractDetail.isDestory===0?"是":"否"}</Descriptions.Item>
              <Descriptions.Item label="是否自动顺延" >{contractDetail.isPostpone===0?"是":"否"}</Descriptions.Item>
              <Descriptions.Item label="描述" span={3}>{contractDetail.description}</Descriptions.Item>
              <Descriptions.Item label="操作">
                <Link to={`/contract/management`} style={{marginRight:'12px'}}>返回上级</Link>
                <Upload {...props}>
                  <Button>
                    <Icon type="upload" /> 上传
                  </Button>
                </Upload>  
              </Descriptions.Item>
            </Descriptions>    
            
           
          </div>
        )
    }
}
export default ManagementDetail