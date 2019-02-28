import React from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import MenuConfig from '../../menuConfig';

import './index.css'
const SubMenu = Menu.SubMenu;
function handleClick(e) {
    console.log('click', e);
}
export default class NavLeft extends React.Component {
    state = {

    }
    componentWillMount() {
        const menuTreeNode = this.renderMenu(MenuConfig);
        this.setState({
            menuTreeNode
        })
    }
    // 菜单渲染
    renderMenu = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item title={item.title} key={item.key}>
                <NavLink to={item.key}>{item.title}</NavLink>
            </Menu.Item>
        })
    }
    render() {
        return (
            <div>
                <div className='left-top'>
                    <img src='/assets/logo.svg' />
                    <h2>welcome</h2>
                </div>
                <Menu theme="dark">
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        )
    }
}