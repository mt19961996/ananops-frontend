import React, {Component,} from 'react';
import {Descriptions} from 'antd';
import {Link} from 'react-router-dom'
import axios from 'axios'

const token = window.localStorage.getItem('token')

class AlarmDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            alarmDetail: {},
        }
        this.getAlarmDetailById = this.getAlarmDetailById.bind(this);
    }

    componentDidMount() {
        const {
            match: {params: {id}}
        } = this.props
        this.getAlarmDetailById(id);
    }

    getAlarmDetailById = (id) => {
        axios({
            method: 'POST',
            url: '/amc/alarm/getAlarmById/' + id,
            headers: {
                'deviceId': this.deviceId,
                'Authorization': 'Bearer ' + token,
            },
        })
            .then((res) => {
                if (res && res.status === 200) {
                    this.setState({
                        alarmDetail: res.data.result
                    });
                }
                console.log(res.data.result);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const {
            alarmDetail,
        } = this.state
        return (
            <div>
                <Descriptions bordered>
                    <Descriptions.Item label="告警ID" span={1.5}>{alarmDetail.id}</Descriptions.Item>
                    <Descriptions.Item label="告警名称" span={1.5}>{alarmDetail.alarmName}</Descriptions.Item>
                    <Descriptions.Item label="告警类型" span={1.5}>{alarmDetail.alarmType}</Descriptions.Item>
                    <Descriptions.Item label="告警等级"
                                       span={1.5}>{alarmDetail.alarmLevel === 1 ? '紧急' : (alarmDetail.alarmLevel === 2 ? '可疑' : '提醒')}</Descriptions.Item>
                    <Descriptions.Item label="受影响资产" span={1.5}>{alarmDetail.alarmAsset}</Descriptions.Item>
                    <Descriptions.Item label="资产类型" span={1.5}>{alarmDetail.assetType}</Descriptions.Item>
                    <Descriptions.Item label="告警状态"
                                       span={1.5}>{alarmDetail.assetStatus === 1 ? '未处理' : '已处理'}</Descriptions.Item>
                    <Descriptions.Item label="最近发生时间" span={1.5}>{alarmDetail.lastOccurTime}</Descriptions.Item>
                    <Descriptions.Item label="告警位置" span={1.5}>{alarmDetail.alarmLocation}</Descriptions.Item>
                    <Descriptions.Item label="描述信息" span={1.5}>{alarmDetail.description}</Descriptions.Item>
                    <Descriptions.Item label="操作">
                        <Link to={`/cbd/amc/process`} style={{marginRight: '12px'}}>返回上级</Link>
                    </Descriptions.Item>
                </Descriptions>
            </div>
        )
    }
}

export default AlarmDetail