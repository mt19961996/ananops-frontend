import React, {Component,} from 'react';
import {Button, Row, Col, Table, Input, Popconfirm, message, Card, Statistic, Progress, Icon} from 'antd';
import {Link} from 'react-router-dom'
import moment from 'moment';
import axios from 'axios'

const FIRST_PAGE = 0;
const PAGE_SIZE = 10;
const Search = Input.Search;

class Process extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: window.localStorage.getItem('token'),
            loginAfter: window.localStorage.getItem('loginAfter'),
            role: window.localStorage.getItem('role'),
            current: FIRST_PAGE,
            roleCode: window.localStorage.getItem('roleCode'),
            data:[],
        }
        this.getAlarmListByGroupId = this.getAlarmListByGroupId.bind(this);
    }

    componentDidMount() {
        //保存当前页面的路由路径
        this.getAlarmListByGroupId();
    }

    //分页
    handlePageChange = (page) => {
        this.getAlarmListByGroupId(page - 1)
    }
    getAlarmListByGroupId = () => {
        // const baseQuery={orderBy:'updateTime',pageSize:PAGE_SIZE,pageNum:page}
        axios({
            method: 'POST',
            url: '/amc/alarm/getAlarmListByGroupId',
            headers: {
                'Content-Type': 'application/json',
                'deviceId': this.deviceId,
                'Authorization': 'Bearer ' + this.state.token,
            },
            data:JSON.stringify({
                'baseQuery':null
            })
        })
            .then((res) => {
                if (res && res.status === 200) {
                    this.setState({
                        data: res.data.result.list,
                    });
                    console.log(this.state.data)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const {
            data,
        } = this.state;
        const columns = [
            {
                title: '等级',
                key: 'alarmLevel',
                render: (text, record) => {
                    return (record.alarmLevel && record.alarmLevel) || '--'
                }
            },
            {
                title: '告警名称',
                key: 'alarmName',
                render: (text, record) => {
                    return (record.alarmName && record.alarmName) || '--'
                }
            },
            {
                title: '受影响设备',
                key: 'alarmAsset',
                render: (text, record) => {
                    return (record.alarmAsset && record.alarmAsset) || '--'
                }

            },
            {
                title: '最新发生时间',
                key: 'lastOccurTime',
                render: (text, record) => {
                    return (record.lastOccurTime && record.lastOccurTime) || '--'
                }
            },
            {
                title: '描述',
                key: 'description',
                render: (text, record) => {
                    return (record.description && record.description) || '--'
                }
            },
            {
                title: '操作',
                key: 'operation',
            },
        ];
        return (
            <div>
                <div>
                    <h1>安全告警处理</h1>
                    <Row gutter={16}>
                        <Col span={4}>
                            <Card title="告警总数" bordered={false}>
                                <Statistic value={14}/>
                            </Card>
                        </Col>
                        <Col span={4}>
                            <Card title="急需处理告警数" bordered={false}>
                                <Statistic value={14}/>
                            </Card>
                        </Col>
                        <Col span={4}>
                            <Card title="已处理告警数" bordered={false}>
                                <Statistic value={14}/>
                            </Card>
                        </Col>
                        <Col span={4}>
                            <Card title="处理量" bordered={false}>
                                <Progress type="circle" percent={75}/>
                            </Card>
                        </Col>
                        <Col span={4}>
                            <Card title="故障率" bordered={false}>
                                <Progress type="circle" strokeColor="red" percent={5}/>
                            </Card>
                        </Col>
                        <Col span={4}>
                            <Card title="操作率" bordered={false}>
                                <Statistic
                                    value={9.3}
                                    precision={2}
                                    valueStyle={{color: '#cf1322'}}
                                    prefix={<Icon type="arrow-down"/>}
                                    suffix="%"
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Table dataSource={data} columns={columns}/>
                </div>
            </div>
        )
    }
}

export default Process;