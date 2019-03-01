import React from 'react';
import { Card, Button, Modal, Form, Select, Input, Tree, Transfer } from 'antd';
import Utils from './../../utils/utils';
import ETable from './../../components/ETable';
import axios from './../../axios';
import menuConfig from '../../menuConfig'
const Option = Select.Option;
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;
export default class Permission extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {}
    componentWillMount() {
        this.requestList();
    }
    //请求列表数据
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
    /****
     * 创建角色
     */
    handleRole = () => {
        this.setState({
            isRoleVisible: true
        })
    }
    handleRoleSubmit = () => {
        let data = this.roleForm.props.form.getFieldsValue();
        this.roleForm.props.form.validateFields((err) => {
            if (!err) {
                console.log(1111, data)
            }
        });
    }
    /***
     * 设置权限
     */
    handlePermission = () => {
        if (!this.state.selectedItem) {
            Modal.info({
                title: '信息',
                content: '请选择一个角色'
            })
            return;
        }
        let menuList = this.state.selectedItem.menus;
        this.setState({
            isPermVisible: true,
            detailInfo: this.state.selectedItem,
            menuInfo: menuList
        });
    }
    handlePermEditSubmit = () => {
        let data = this.roleForm.props.form.getFieldsValue();
        data.role_id = this.state.selectedItem.id;
        data.menus = this.state.menuInfo;
        console.log('设置权限提交的model', data);
        // axios.ajax({
        //     url: '/permission/edit',
        //     data: {
        //         params: {
        //             ...data
        //         }
        //     }
        // }).then((res) => {
        //     if (res) {
        //         this.setState({
        //             isPermVisible: false
        //         })
        //         this.requestList();
        //     }
        // })
    }
    /*********
     * 用户授权
     */
    handleUserAuth = () => {
        if (!this.state.selectedItem) {
            Modal.info({
                title: '信息',
                content: '未选中任何项目'
            })
            return;
        }
        this.getRoleUserList(this.state.selectedItem.id);
        this.setState({
            isUserVisible: true,
            isAuthClosed: false,
            detailInfo: this.state.selectedItem
        });
    }
    getRoleUserList = (id) => {
        axios.ajax({
            url: '/role/user_list',
            data: {
                params: {
                    id: id
                }
            }
        }).then((res) => {
            if (res) {
                this.getAuthUserList(res.result);
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
        }];
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
                <Modal
                    title="创建角色"
                    visible={this.state.isRoleVisible}
                    onOk={this.handleRoleSubmit}
                    onCancel={() => {
                        this.roleForm.props.form.resetFields();
                        this.setState({
                            isRoleVisible: false
                        })
                    }}
                >
                    <RoleForm wrappedComponentRef={(inst) => this.roleForm = inst} />
                </Modal>
                <Modal
                    title="权限设置"
                    visible={this.state.isPermVisible}
                    width={600}
                    onOk={this.handlePermEditSubmit}
                    onCancel={() => {
                        this.setState({
                            isPermVisible: false
                        })
                    }}>
                    <PermEditForm
                        wrappedComponentRef={(inst) => this.roleForm = inst}
                        detailInfo={this.state.detailInfo}
                        menuInfo={this.state.menuInfo || []}
                        patchMenuInfo={(checkedKeys) => {
                            this.setState({
                                menuInfo: checkedKeys
                            });
                        }}
                    />
                </Modal>
                <Modal
                    title="用户授权"
                    visible={this.state.isUserVisible}
                    width={800}
                    onOk={this.handleUserSubmit}
                    onCancel={() => {
                        this.setState({
                            isUserVisible: false
                        })
                    }}>
                    <RoleAuthForm
                        wrappedComponentRef={(inst) => this.userAuthForm = inst}
                        isClosed={this.state.isAuthClosed}
                        detailInfo={this.state.detailInfo}
                        targetKeys={this.state.targetKeys}
                        mockData={this.state.mockData}
                        patchUserInfo={this.patchUserInfo}
                    />
                </Modal>
            </div>
        )
    }
}
// 创建角色弹窗
class RoleForm extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 }
        };
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    {
                        getFieldDecorator('role_name', {
                            initialValue: '',
                            rules: [{ required: true, message: '请输入角色名称!' }]
                        })(
                            <Input type="text" placeholder="请输入角色名称" />
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator('state', {
                            initialValue: 1
                        })(
                            <Select>
                                <Option value={1}>开启</Option>
                                <Option value={0}>关闭</Option>
                            </Select>
                        )}
                </FormItem>
            </Form>
        );
    }
}
RoleForm = Form.create({})(RoleForm);

// 设置权限
class PermEditForm extends React.Component {
    state = {};
    // 设置选中的节点，通过父组件方法再传递回来
    onCheck = (checkedKeys) => {
        this.props.patchMenuInfo(checkedKeys);
    };
    renderTreeNodes = (data, key = '') => {
        return data.map((item) => {
            let parentKey = key + item.key;
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={parentKey} dataRef={item} className="op-role-tree">
                        {this.renderTreeNodes(item.children, parentKey)}
                    </TreeNode>
                );
            } else if (item.btnList) {
                return (
                    <TreeNode title={item.title} key={parentKey} dataRef={item} className="op-role-tree">
                        {this.renderBtnTreedNode(item, parentKey)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
        });
    };

    renderBtnTreedNode = (menu, parentKey = '') => {
        const btnTreeNode = []
        menu.btnList.forEach((item) => {
            console.log(parentKey + '-btn-' + item.key);
            btnTreeNode.push(<TreeNode title={item.title} key={parentKey + '-btn-' + item.key} className="op-role-tree" />);
        })
        return btnTreeNode;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 18 }
        };
        const detail_info = this.props.detailInfo;
        const menuInfo = this.props.menuInfo;
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称：" {...formItemLayout}>
                    <Input disabled placeholder={detail_info.role_name} />
                </FormItem>
                <FormItem label="状态：" {...formItemLayout}>
                    {getFieldDecorator('status', {
                        initialValue: '1'
                    })(
                        <Select style={{ width: 80 }}
                            placeholder="启用"
                        >
                            <Option value="1">启用</Option>
                            <Option value="0">停用</Option>
                        </Select>
                    )}
                </FormItem>
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={(checkedKeys) => this.onCheck(checkedKeys)}
                    checkedKeys={menuInfo || []}
                >
                    <TreeNode title="平台权限" key="platform_all">
                        {this.renderTreeNodes(menuConfig)}
                    </TreeNode>
                </Tree>
            </Form>
        )
    }
}
PermEditForm = Form.create({})(PermEditForm);

// 用户授权
class RoleAuthForm extends React.Component {

    filterOption = (inputValue, option) => {
        return option.title.indexOf(inputValue) > -1;
    };
    handleChange = (targetKeys) => {
        this.props.patchUserInfo(targetKeys);
    };

    render() {
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 18 }
        };
        const detail_info = this.props.detailInfo;
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称：" {...formItemLayout}>
                    <Input disabled maxLength={8} placeholder={detail_info.role_name} />
                </FormItem>
                <FormItem label="选择用户：" {...formItemLayout}>
                    <Transfer
                        listStyle={{ width: 200, height: 400 }}
                        dataSource={this.props.mockData}
                        showSearch
                        titles={['待选用户', '已选用户']}
                        searchPlaceholder='输入用户名'
                        filterOption={this.filterOption}
                        targetKeys={this.props.targetKeys}
                        onChange={this.handleChange}
                        render={item => item.title}
                    />
                </FormItem>
            </Form>
        )
    }
}
RoleAuthForm = Form.create({})(RoleAuthForm);