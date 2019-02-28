import React from 'react';
import { Table, Card, Button } from 'antd';
import Utils from './../../utils/utils';
import ETable from './../../components/ETable';
import axios from './../../axios'
export default class Permission extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {}
    componentWillMount() {
        this.requestList();
    }
    requestList = () => {
        axios.ajax({
            url: '/role/list',
            data: {
                params: {}
            }
        }).then((res) => {
            console.log(res);
            if (res.code == 0) {
                let list = res.result.item_list.map((item, i) => {
                    item.key = i;
                    return item;
                })
                this.setState({
                    list
                })
            }
        })
    }
    render() {
        const columns = [{
            title: '角色ID',
            dataIndex: 'id'
        }, {
            title: '角色名称',
            dataIndex: 'role_name'
        }, {
            title: '创建时间',
            dataIndex: 'create_time',
            render: Utils.formateDate
        }, {
            title: '使用状态',
            dataIndex: 'status',
            render(status) {
                return status == 1 ? '启用' : '停用'
            }
        }, {
            title: '授权时间',
            dataIndex: 'authorize_time',
            render: Utils.formateDate
        }, {
            title: '授权人',
            dataIndex: 'authorize_user_name'
        }]
        return (
            <div>
                <Card>
                    <Button type="primary"
                        style={{ margin: '0 10px' }}
                        onClick={this.handleRole}>创建角色</Button>
                    <Button type="primary"
                        style={{ margin: '0 10px' }}
                        onClick={this.handlePermission}>设置权限</Button>
                    <Button type="primary"
                        style={{ margin: '0 10px' }}
                        onClick={this.handleUserAuth}>用户授权</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}
                        dataSource={this.state.list}
                        columns={columns}
                    ></ETable>
                </div>
            </div>
        )
    }
}
