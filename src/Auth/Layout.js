import React, { useState } from "react";
import { Menu } from "antd";
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

function Index() {
  const value = window.location.pathname.split("/")[2];
  const [selectedValue, setSelectedValue] = useState(value);
  const handleClick = e => {
    setSelectedValue(e.key);
  };
  return (
    <BrowserRouter>
      <div style={{ marginTop: "10%", marginLeft: "35%", width: "400px" }}>
        <Menu selectedKeys={selectedValue} mode="horizontal" theme="light">
          <Menu.Item key="register" style={{ textAlign: "center", width: "50%" }} onClick={handleClick}>
            <Link to="/account/register" /> 注册
          </Menu.Item>
          <Menu.Item key="login" style={{ textAlign: "center", width: "50%" }} onClick={handleClick}>
            <Link to="/account/login" /> 登陆
          </Menu.Item>
        </Menu>
        <div className="form-container" style={{ marginTop: "20px" }}>
          <Switch>
            <Route exact path="/account/" component={() => <Redirect to={Login} />} />
            <Route exact path="/account/login" component={Login} />
            <Route path="/account/register" component={Register} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default Index;
