import React,{Component,} from 'react'
import {Row,Col,Table,Icon } from 'antd';
import { Link } from 'react-router-dom'
import moment from 'moment';
import axios from 'axios'
import items from '../../../../config/status'
class Process extends Component{

    constructor(props){
        super(props)
        this.state={
            data:[],
            token:window.localStorage.getItem('token'),
        }
        this.getGroupList = this.getGroupList.bind(this);
    }
    componentDidMount(){
        const { 
            match : { params : { id } }
          } = this.props
          console.log(id)
        this.getGroupList(id);   
    }
     //获取列表信息
     getGroupList = (id) => {
        axios({
            method: 'GET',
            url: '/mdmc/mdmcTask/getTaskLogs/'+id,
            headers: {
               'deviceId': this.deviceId,
              'Authorization':'Bearer '+this.state.token,
            },
          })
        .then((res) => {
            if(res && res.status === 200){
            console.log(res)
            this.setState({
                data: res.data.result,
            }) ;
            // console.log(this.state.data)
            }
        })
        .catch(function (error) {
            console.log(error);
        });
        
    }
    //获取状态数值
    setStatus=(status)=>{
        var msg=this.getStatusInfo(status)
        let statusMsg=msg.name
        return statusMsg
    }

    getStatusInfo=(status)=>{
        var a=items.find(item => {    
        return item.status === status;
        })
    return a
    }
    render(){
        const { 
            match : { params : { id } }
          } = this.props
        const {data}=this.state
        return(
            <div>
            <div className="searchPart">
            <Row>
                <Col span={5}>
                <Link to={`/cbd/maintain/data`}>
                    <Icon type="arrow-left" ></Icon>返回工单
                </Link>
                </Col>
            </Row> 
            </div>
            <Table
            className="group-list-module"
            bordered
            showHeader={true}
            // pagination={{
            //     current,
            //     total,
            //     pageSize: size,
            //     onChange: this.handlePageChange,
               
            // }}
            rowClassName={this.setRowClassName}
            dataSource={data}
            columns={[
            //     {
            //     title: 'ID',
            //     key: 'id',
            //     render: (text, record) => {
            //     return ((record.id && record.id) || '--')
            //     }   
            // }, {
            //     title: '工单ID',
            //     key: 'taskId',
            //     render: (text, record) => {
            //     return (record.taskId && record.taskId) || '--'
            //     }
            // }, 
            {
                title: '工单状态',
                key: 'status',
                render: (text, record) => {
                return (record.status && this.setStatus(record.status)) || '--'
                }
            },
            // {
            //     title: '状态时间戳', 
            //     key: 'statusTimestamp',
            //     render: (text, record) => {
            //     return (record.statusTimestamp && record.statusTimestamp) || '--'
            //     }
            // }, {
            //     title: '创建时间',
            //     key: 'createdTime',
            //     render: (text, record) => {
            //     return (record.createdTime && record.createdTime) || '--'
            //     }
            // },
            {
                title: '操作执行者',
                key: 'creator',
                render: (text, record) => {
                return (record.creator && record.creator) || '--'
                }
            },{
                title: '执行操作',
                key: 'movement',
                render: (text, record) => {
                return (record.movement && record.movement) || '--'
                }
            },
            {
                title: '操作时间',
                key: 'updateTime',
                render: (text, record) => {
                return (record.updateTime && record.updateTime) || '--'
                }
            },
            {
                title: '备注',
                key: 'updateTime',
                render: (text, record) => {
                return (record.updateTime && record.updateTime) || '--'
                }
            }
        ]}
            />
     </div>
        )
    }
}
export default Process