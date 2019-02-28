import React from 'react';
import { Row, Col } from 'antd';
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
                        <img src="/assets/logo-ant.svg" alt="" />
                        {/* <span>通用管理系统</span> */}
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