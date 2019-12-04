import React, { Component,} from 'react'
import { Empty } from 'antd'
export default class Admin extends Component {
  render(){
    return(
      <div>
        <Empty description="暂无数据" />
      </div>
    )
  }
}