import React, { useState } from "react";
import {Route, Routes} from "react-router-dom";
import Emitter from "../emitter";
import Request from "../request";
import { Button, Layout, Menu, theme } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import MenuItems from "./menu-items";
import './index.css';
import {EventEmitterRC} from "../../components/context/event-emitter-rc";
import {useEventEmitter} from "../../components/context/event";
import { hooksRouter, interviewRouter } from './constants';

const { Header, Sider, Content } = Layout;

const LayoutWrapper: React.FC = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const { emitter } = useEventEmitter();

    return (
        <EventEmitterRC value={emitter}>
            <Layout className='layout-wrapper'>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                theme="light"
            >
                <div className="logo-vertical" />
                <MenuItems />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Routes>
                        {/* react hooks demo router */}
                        {hooksRouter.map(router => (
                            <React.Fragment key={router.key}>
                                <Route path={router.key} element={router.element} />
                            </React.Fragment>
                        ))}
                        {/* interview router [面试题目] */}
                        {interviewRouter.map(router => (
                            <React.Fragment key={router.key}>
                                <Route path={router.key} element={router.element} />
                            </React.Fragment>
                        ))}
                    </Routes>
                </Content>
            </Layout>
        </Layout>
        </EventEmitterRC>
    );
}

export default LayoutWrapper;

