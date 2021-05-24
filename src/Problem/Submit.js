import React, { useState } from "react";
import { Card, Select, Button } from "antd";
import CodeMirror from "../Component/CodeMirror";
import server from "../server";
import RecordModal from "./RecordModal";

export default ({ problemId }) => {
  const [language, setLanguage] = useState("C");
  const [code, setCode] = useState("");
  const [visible, setVisible] = useState(false);
  const [params, setParams] = useState({});

  const languageArr = [
    { value: "C", key: "c" },
    { value: "C++", key: "c++" },
    { value: "C#", key: "c#" },
    { value: "Go", key: "go" },
    { value: "Javascript", key: "js" },
  ];

  const autoSave = value => {
    setCode(value);
  };

  const submit = () => {
    const data = {
      code,
      language,
    };
    server
      .post(`/problem/${problemId}/record`, data)
      .then(response => {
        server.get(`/problem/${problemId}/record/${response.data.recordId}`).then(() => {
          console.log(response);
          setParams({ problemId, recordId: response.data.recordId });
          setVisible(true);
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <div style={{ padding: "20px 40px" }}>
      <Card
        title={
          <Select defaultValue="C" onChange={setLanguage} style={{ minWidth: "100px" }}>
            {languageArr.map(item => (
              <Select.Option key={item.key} value={item.value}>
                {item.value}
              </Select.Option>
            ))}
          </Select>
        }
        extra={
          <Button type="primary" onClick={submit}>
            Submit
          </Button>
        }
      >
        <CodeMirror value={code} language={language} autoSave={autoSave} style={{ height: "500px" }} />
      </Card>
      <RecordModal visible={visible} cancel={closeModal} params={params} />
    </div>
  );
};
