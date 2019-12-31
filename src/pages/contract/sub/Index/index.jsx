import React, { Component, } from 'react';
import { Button,Row,Col,Table,Input,Popconfirm,message,Icon } from 'antd';
import { Link } from 'react-router-dom'
import moment from 'moment';
import axios from 'axios'

const FIRST_PAGE = 0;
const PAGE_SIZE = 10;
const Search = Input.Search;

class Sub extends Component{
    constructor(props){
        super(props)
        this.state={
            current: FIRST_PAGE,
            token:window.localStorage.getItem('token'),
            data:[],
        }
        this.getGroupList = this.getGroupList.bind(this);
    }
    componentDidMount(){
        const { 
            match : { params : { id } }
          } = this.props
        this.getGroupList(id);   
    }
    //获取列表信息
    getGroupList = (id) => {
        axios({
            method: 'POST',
            url: '/pmc/inspectDetail/getInspectDetailList/'+id,
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
    deleteGroup=(record)=>{
        const { 
            match : { params : { id } }
          } = this.props
          console.log(record.id)
        axios({
            method:'POST',
            url:'/pmc/inspectDetail/deleteDetailById/'+record.id,
            headers:{
                'deviceId': this.deviceId,
                'Authorization':'Bearer '+this.state.token,
            }           
        }) 
        .then((res) => {
            if(res && res.status === 200){
            console.log(res.data.result)
            this.getGroupList(id)
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    deleteGroup=(record)=>{
        const { 
            match : { params : { id } }
          } = this.props
        axios({
            method:'POST',
            url:'/pmc/inspectDetail/deleteDetailByTaskId/'+record.id,
            headers:{
                'deviceId': this.deviceId,
                'Authorization':'Bearer '+this.state.token,
            }           
        }) 
        .then((res) => {
            if(res && res.status === 200){
            console.log(res.data.result)
            this.getGroupList(id)
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    render(){
        const { 
            match : { params : { id,projectId } }
          } = this.props
        const {data}=this.state
        return(
            <div>
            <div className="searchPart">
            <Row>
                {/* <Col span={2}>巡检人姓名：</Col> */}
                <Col span={5}>
                {/* <Search
                    placeholder="搜索从这里开始"
                    enterButton
                    onSearch={value => this.selectActivity(value)}
                /> */}
                <Link to={`/cbd/pro/inspection/${projectId}`}>
                    <Icon type="arrow-left" ></Icon>返回巡检任务
                </Link>
                </Col>
                <Col push={16}>
                <Link to={`/cbd/pro/sub/new/${projectId}/${id}`}>
                    <Button type="primary">
                                +新建巡检详情
                    </Button>
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
            columns={[{
                title: '巡检详情ID',
                key: 'id',
                render: (text, record) => {
                return ((record.id && record.id) || '--')
                }   
            }, {
                title: '巡检任务ID',
                key: 'inspectionTaskId',
                render: (text, record) => {
                return (record.inspectionTaskId && record.inspectionTaskId) || '--'
                }
            }, {
                title: '巡检任务名称',
                key: 'inspectionTaskName',
                render: (text, record) => {
                return (record.inspectionTaskName && record.inspectionTaskName) || '--'
                }
            },
            {
                title: '巡检详情名称', 
                key: 'name',
                render: (text, record) => {
                return (record.name && record.name) || '--'
                }
            },{
                title: '巡检内容描述',
                key: 'description',
                render: (text, record) => {
                return (record.description && record.description) || '--'
                }
            },{
                title: '巡检结果',
                key: 'result',
                render: (text, record) => {
                return (record.result && record.result) || '--'
                }
            },
            {
                title: '操作',
                render: (text, record, index) => (
                <div className="operate-btns"
                    style={{ display: 'block' }}
                >
                    <Link
                    to={`/cbd/pro/sub/detail/${projectId}/${id}/${record.id}`}
                    style={{marginRight:'12px'}}
                    >详情</Link>               
                    <Link
                    to={`/cbd/pro/sub/edit/${projectId}/${id}/${record.id}`}
                    style={{marginRight:'12px'}}
                    >修改</Link>
                    <Popconfirm
                            title="确定要删除吗？"
                            onConfirm={()=> {this.deleteGroup(record)}}
                        >
                            <Button 
                            type="simple"
                            style={{border:'none',padding:0,color:"#357aff",background:'transparent'}}
                            >删除</Button>
                        </Popconfirm>
                </div>
                ),
            }]}
            />
     </div>
        )
    }
}
export default Sub;