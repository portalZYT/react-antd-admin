import React from 'react';
import { Row, Col, Button, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import './index.scss'
export default class Header extends React.Component {
    componentWillMount() {
        this.setState({
            userName: '姓名'
        })
    }
    render() {
        return (
            <div className="header">
                <Row className="header-top">
                    <Col span={6} className="logo">
                        {/* type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} */}
                        <Button type="primary" style={{ marginBottom: 16 }}>
                            <Icon type='menu-unfold' />
                        </Button>
                        <span>登陆</span>
                    </Col>
                    <Col style={{ color: 'white' }}>
                        <span>欢迎，{this.state.userName}</span>
                        <NavLink to={'/login'}>退出</NavLink>
                    </Col>
                </Row>
            </div>
        )
    }
}