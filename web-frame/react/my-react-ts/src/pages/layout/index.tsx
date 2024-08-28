import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "../home";
import About from "../about";
import {Layout} from "antd";
import MenuItems from "./menu-items";

const { Header, Sider, Content } = Layout;

const LayoutWrapper: React.FC = (props) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider>
                <MenuItems />
            </Sider>
            <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
                <Routes>
                    <Route path={'/'} element={<Home />} />
                    <Route path={'/about'} element={<About />} />
                </Routes>
            </Content>
        </Layout>
    );
}

export default LayoutWrapper;

