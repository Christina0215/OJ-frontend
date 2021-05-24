import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import "./App.less";

export default ({ collapsed }) => {
  const menuItems = [
    { title: "Problem", key: "/problem", iconType: "project" },
    { title: "Rank", key: "/rank", iconType: "fund" },
    { title: "user", key: "/user", iconType: "user" },
  ];
  function getDefaultKey() {
    const pathname = window.location.pathname.split("/");
    const currentTab = menuItems.filter(item => pathname.includes(String.prototype.toLocaleLowerCase.call(item.title)));
    if (currentTab.length === 0) {
      window.location.href = "/problem";
    }
    return currentTab[0].key;
  }

  return (
    <Layout.Sider collapsible collapsed={collapsed} trigger={null} className="sider">
      <div className="logo">{collapsed ? "QK" : "QKCODE"}</div>
      <Menu
        mode="inline"
        theme="dark"
        style={{ lineHeight: "64px", height: "100%" }}
        defaultSelectedKeys={getDefaultKey()}
      >
        {menuItems.map(element => (
          <Menu.Item key={element.key}>
            <Link to={element.key}>
              <Icon type={element.iconType} />
              <span>{element.title}</span>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </Layout.Sider>
  );
};
