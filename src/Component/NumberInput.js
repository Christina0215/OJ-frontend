import React from "react";
import { Input, Tooltip } from "antd";

export default props => {
  const formatNumber = value => {
    value += "";
    const list = value.split(".");
    const prefix = list[0].charAt(0) === "-" ? "-" : "";
    let num = prefix ? list[0].slice(1) : list[0];
    let result = "";
    while (num.length > 3) {
      result = `,${num.slice(-3)}${result}`;
      num = num.slice(0, num.length - 3);
    }
    if (num) {
      result = num + result;
    }
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ""}`;
  };

  const Change = e => {
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === "" || value === "-") {
      props.onChange(value);
    }
  };

  const Blur = () => {
    const { value, onBlur, onChange } = props;
    if (value.charAt(value.length - 1) === "." || value === "-") {
      onChange(value.slice(0, -1));
    }
    if (onBlur) {
      onBlur();
    }
  };
  const { value } = props;
  const title = value ? (
    <span className="numeric-input-title">{value !== "-" ? formatNumber(value) : "-"}</span>
  ) : (
    "Input a number"
  );
  return (
    <Tooltip trigger={["focus"]} title={title} placement="topLeft" overlayClassName="numeric-input">
      <Input {...props} onChange={Change} onBlur={Blur} maxLength={25} />
    </Tooltip>
  );
};
