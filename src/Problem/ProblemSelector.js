import React from "react";
import { Dropdown, Menu, Icon } from "antd";

export default ({ selectTpye, items, click, selected }) => {
  const menu = (
    <Menu style={{ overflow: "scroll", maxHeight: "150px" }}>
      {items.map(item => (
        <Menu.Item key={item} onClick={click}>
          <span style={{ visibility: selected === item ? "" : "hidden" }}>
            <Icon type="check" style={{ color: "#8A2BE2" }} />
          </span>
          {item}
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <Dropdown overlay={menu} placement="bottomLeft">
      <a style={{ marginLeft: "20px" }}>
        {selectTpye} <Icon type="down" />
      </a>
    </Dropdown>
  );
};
