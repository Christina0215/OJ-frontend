import React, { useState } from "react";
import { Layout, Icon } from "antd";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LeftMenu from "./LeftMenu";
import Footer from "./Footer";
import Problem from "../Problem";
import Rank from "../Rank";
import User from "../User";
import Feature from "./Feature";
import "./App.less";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const trigger = () => {
    setCollapsed(!collapsed);
  };
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <LeftMenu collapsed={collapsed} />
        <Layout className="layout" style={{ marginLeft: collapsed ? 64 : 200 }}>
          <Layout.Header className="header">
            <Icon className="trigger" type={collapsed ? "menu-unfold" : "menu-fold"} onClick={trigger} />
            <Feature />
          </Layout.Header>
          <Layout.Content className="content">
            <Switch>
              <Route path="/problem" component={Problem} />
              <Route path="/rank" component={Rank} />
              <Route path="/user" component={User} />
            </Switch>
          </Layout.Content>
          <Layout.Footer style={{ textAlign: "center" }}>
            <Footer />
          </Layout.Footer>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
