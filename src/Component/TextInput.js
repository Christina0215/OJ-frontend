import React, { useState, useEffect } from "react";
import { Tabs, Input } from "antd";
import md from "./MarkdownIt";
import "highlight.js/styles/googlecode.css";
import "katex/dist/katex.css";

export default ({ placehoder, onChange, initValue }) => {
  const [value, setValue] = useState(initValue);
  const [renderValue, setRenderValue] = useState("");

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  const switchTab = key => {
    if (key === "preview") {
      console.log(value);
      setRenderValue(md.render(value));
    }
  };

  const changeHandle = e => {
    onChange(e.target.value);
    setValue(e.target.value);
  };

  return (
    <Tabs defaultActiveKey="text" onChange={switchTab}>
      <Tabs.TabPane tab="write" key="write">
        <Input.TextArea autoSize={{ minRows: 8 }} placeholder={placehoder} onChange={changeHandle} value={initValue} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="preview" key="preview">
        <div dangerouslySetInnerHTML={{ __html: renderValue }}></div>
      </Tabs.TabPane>
    </Tabs>
  );
};
