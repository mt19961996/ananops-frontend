import React , { Component } from 'react';
import { Form,Input,DatePicker,Col,Button,Cascader,Row,InputNumber,Select} from 'antd';
import {Title} from '../../../../components/PageTitle/title/title';
import './index.styl'

export default class IndexBasicInfo extends Component{
    constructor(props){
        super(props);
        this.state={
            data:{
                data:[
                    {
                        "company": "安安运维（北京）科技有限公司",
                        "identityNumber": "string",
                        "location": "string",
                        "name": "string",
                        "phone": "string",
                        "photo": "string",
                        "position": "string",
                        "sex": "string",
                        "title": "string"                     
                    }
                ],
            }
        }
    }
    
    render(){
        const {
            data:{
              data,
            },
          } = this.state;
          
        return (
            <div className="store-box">
                <Title title="基础信息：" />
                <Button
                    icon="edit"
                    className="hover-Button"
                    size='large'
                    loading={this.state.iconLoading}
                    href='/serviceProvider/basicInfo/edit'
                    >
                    编辑
                </Button>
                <table border="3" width="100%" height="300"  bordercolor="cornflowerblue">
                    <tbody>
                        <tr>
                            <td className="font-jiacu">主体名称：</td>
                            <td className="text-left" colSpan="3">安安运维（北京）科技有限公司</td>
                        </tr>
                        <tr>
                            <th width="20%" className="font-jiacu">法定代表人姓名：</th>
                            <th width="30%" className="text-left"> </th>
                            <th width="20%" className="font-jiacu">法定代表人联系电话：</th>
                            <th width="30%" className="text-left"></th>
                        </tr>
                        <tr>
                            <th width="20%" className="font-jiacu">法定代表人身份证号：</th>
                            <th width="30%" className="text-left"> </th>
                            <th width="20%" className="font-jiacu">附件：</th>
                            <th width="30%" className="text-left"></th>
                        </tr>
                        <tr>
                            <th width="20%" className="font-jiacu">主体机构类别：</th>
                            <th width="30%" className="text-left"> </th>
                            <th width="20%" className="font-jiacu">主体行业：</th>
                            <th width="30%" className="text-left"></th>
                        </tr>
                        <tr>
                            <th width="20%" className="font-jiacu">国别/地区：</th>
                            <th width="30%" className="text-left"> </th>
                            <th width="20%" className="font-jiacu">注册地：</th>
                            <th width="30%" className="text-left"></th>
                        </tr>
                        <tr>
                            <th width="20%" className="font-jiacu">详细地址：</th>
                            <th width="30%" className="text-left"> </th>
                            <th width="20%" className="font-jiacu">邮政编码：</th>
                            <th width="30%" className="text-left"></th>
                        </tr>
                        <tr>
                            <th width="20%" className="font-jiacu">联系人：</th>
                            <th width="30%" className="text-left"> </th>
                            <th width="20%" className="font-jiacu">联系人电话：</th>
                            <th width="30%" className="text-left"></th>
                        </tr>
                    </tbody>
                </table>
                <br/>
                <Title title="基本账户开户许可证：" />
                <table border="3" width="100%" height="45"  bordercolor="cornflowerblue">
                    <tbody>
                        <tr>
                            <th width="20%" className="font-jiacu">基本户账户名称：</th>
                            <th width="30%" className="text-left">安安运维（北京）科技有限公司 </th>
                            <th width="20%" className="font-jiacu">基本户账号：	</th>
                            <th width="30%" className="text-left"> </th>
                        </tr>
                    </tbody>
                </table>
                <br/>
                <Title title="营业执照：" />
                <table border="3" width="100%" height="180"  bordercolor="cornflowerblue">
                    <tbody>
                        <tr>
                            <th width="20%" className="font-jiacu">类型：</th>
                            <th width="30%" className="text-left">  </th>
                            <th width="20%" className="font-jiacu">注册资本(人民币）：</th>
                            <th width="30%" className="text-left"> </th>
                        </tr>
                        <tr>
                            <th width="20%" className="font-jiacu">统一社会信用代码：</th>
                            <th width="30%" className="text-left">91110102MA01N95C83</th>
                            <th width="20%" className="font-jiacu">有效期：</th>
                            <th width="30%" className="text-left"> </th>
                        </tr>
                        <tr>
                            <td className="font-jiacu">经营范围：</td>
                            <td className="text-left" colSpan="3">  </td>
                        </tr>
                        <tr>
                            <td className="font-jiacu">供应产品类别：</td>
                            <td className="text-left" colSpan="3"> </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

IndexBasicInfo = Form.create({})(IndexBasicInfo);