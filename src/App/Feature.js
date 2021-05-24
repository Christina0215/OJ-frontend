import React from "react";
import { Avatar, Dropdown, Menu } from "antd";
import store from "store";
import defaultAvatar from "../resources/avatar-default.jpg";

function Feature() {
  const user = store.get("auth");
  const logged = !!user;

  const unLoginMenu = (
    <Menu>
      <Menu.Item
        key="login"
        onClick={() => {
          window.location.href = "account/login";
        }}
      >
        Login
      </Menu.Item>
      <Menu.Item
        key="register"
        onClick={() => {
          window.location.href = "account/register";
        }}
      >
        Register
      </Menu.Item>
    </Menu>
  );

  const loginMenu = (
    <Menu>
      <Menu.Item key="profile">profile</Menu.Item>
      <Menu.Item
        key="logout"
        onClick={() => {
          store.remove("Api_Token");
          store.remove("auth");
          window.location.href = "/account/login";
        }}
      >
        log out
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="featureOuter">
      <Dropdown overlay={logged ? loginMenu : unLoginMenu} trigger={["click"]} placement="bottomRight">
        <div className="featureInner">
          <Avatar src={logged && (user.avatar || defaultAvatar)}>{!logged && "U"}</Avatar>
          <div className="triangle"></div>
        </div>
      </Dropdown>
    </div>
  );
}

export default Feature;
