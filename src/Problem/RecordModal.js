import React, { useEffect, useState } from "react";
import { Modal, Input, Spin } from "antd";
import server from "../server";
import CodeMirror from "../Component/CodeMirror";

export default props => {
  const { params, ...prop } = props;
  const defaultRecord = {
    code: "",
    compileInfo: "",
    timeCost: 0,
    memoryCost: 0,
    language: {
      extension: "",
      displayname: "",
    },
    judgeResult: {
      alias: "",
      en: "",
      zh: "",
      color: "#000000",
    },
    testdataNum: 0,
    score: 0,
    memoryProportion: 0,
    timeProportion: 0,
    testcase: {
      timeCost: 0,
      memoryCost: 0,
      diff: "",
    },
  };
  const [loading, setLoading] = useState(true);
  // const [status, setStatus] = useState("Loading");
  const [record, setRecord] = useState(defaultRecord);

  const closeModal = () => {
    prop.cancel();
    setLoading(true);
  };

  useEffect(() => {
    const repeat = setInterval(() => {
      if (prop.visible === false) {
        clearInterval(repeat);
      }
      if (params.problemId) {
        server
          .get(`/problem/${params.problemId}/record/${params.recordId}`)
          .then(response => {
            if (response.data.judgeResult.alias !== "Pending" && response.data.judgeResult.alias !== "Judging") {
              setRecord(response.data);
              setLoading(false);
              clearInterval(repeat);
            }
            // setStatus(response.data.judgeResult.alias);
          })
          .catch(e => {
            clearInterval(repeat);
            // setStatus("Error");
            console.error(e);
          });
      }
    }, 1000);
  }, [params]);

  return (
    <Modal {...prop} onCancel={closeModal} footer={null} width="60%" style={{ minHeight: "500px" }}>
      {loading && prop.visible ? (
        <Spin size="large" style={{ width: "100%" }}>
          {/* <div style={{ width: "100%", textAlign: "center" }}>{status}</div> */}
        </Spin>
      ) : (
        <div style={{ padding: "30px" }}>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <h1 style={{ color: record.judgeResult.color }}>{record.judgeResult.zh}</h1>
            <h3 style={{ marginLeft: "20px" }}>分数：{record.score}</h3>
          </div>
          {record.judgeResult.alias === "AC" ? (
            <div>
              <p>
                you use less than
                <em>
                  <b> {record.timeProportion}% </b>
                </em>
                people of time
              </p>
              <p>
                you use less than
                <em>
                  <b> {record.memoryProportion}% </b>
                </em>
                people of memory
              </p>
              <p>
                Congratulations, you have solved this problem, you can go on or change language to solve this problem
                again
              </p>
            </div>
          ) : (
            <div>
              <h3>{record.compileInfo ? "Complie error info" : "different with standard output"}</h3>
              <Input.TextArea
                style={{ minHeight: "100px" }}
                defaultValue={record.compileInfo || record.testcase.diff}
                disabled
              />
            </div>
          )}
          <div style={{ marginTop: "20px" }}>
            <h3>Submit Code</h3>
            <span>language: {record.language.displayName}</span>
            <CodeMirror language={params.displayname} value={record.code} autoSave={null} />
          </div>
        </div>
      )}
    </Modal>
  );
};
