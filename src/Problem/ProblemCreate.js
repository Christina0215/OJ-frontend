import React, { useState, useEffect } from "react";
import { Input, Select, PageHeader, Button, Tooltip, Upload, Icon, message } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import store from "store";
import ConfirmButton from "../Component/ConfirmButton";
import NumberInput from "../Component/NumberInput";
import PropblemTags from "../Mock/GetProblemTags";
import TextInput from "../Component/TextInput";
import ImageWall from "../Component/Image";
import server from "../server";

export default ({ problemData, modifyProblem }) => {
  const [problem, setProblem] = useState({
    title: "",
    difficulty: "",
    type: "",
    standardInput: "",
    standardOutput: "",
    content: "",
    tip: "",
    samples: {
      sampleInput: "",
      sampleOutput: "",
    },
    memoryLimit: "",
    timeLimit: "",
    file: "",
  });
  const [status, setStatus] = useState("create");
  useEffect(() => {
    if (problemData && JSON.stringify(problemData) !== "{}") {
      problemData.samples = JSON.parse(problemData.samples);
      setProblem(problemData);
      setStatus("modify");
    }
  }, [problemData]);

  const [uploadFile, setUploadFile] = useState(false);
  const problemTags = PropblemTags.map(tag => <Select.Option key={tag}>{tag}</Select.Option>);
  const problemDifficulty = ["difficult", "middle", "easy"];
  if (store.get("auth") && store.get("auth").role.alias === "admin")
    return (
      <div className="create-problem-container">
        <PageHeader
          title={status === "create" ? "You are creating a new Problem" : `You are modifying problem:${problem.title}`}
          subTitle="Please fill in the following as required"
          style={{
            border: "1px solid rgb(235, 237, 240)",
            width: "100%",
          }}
          extra={[
            // <Tooltip placement="top" title="save and edit next time" key="save">
            //   <Button
            //     onClick={() => {
            //       server.post(`/problem/${problem.id}`, { ...problem }).catch(e => console.error(e));
            //     }}
            //   >
            //     Save
            //   </Button>
            // </Tooltip>,
            <Tooltip placement="top" title="create it now" key="submit">
              <span>
                <ConfirmButton
                  type="primary"
                  clickHandler={() => {
                    if (status === "create") {
                      server.post("/problem", { ...problem, samples: JSON.stringify(problem.samples) }).catch(error => {
                        console.error(error);
                      });
                    } else {
                      modifyProblem({ ...problem, samples: JSON.stringify(problem.samples) });
                    }
                  }}
                >
                  Submit
                </ConfirmButton>
              </span>
            </Tooltip>,
          ]}
        />
        <div className="title">
          <Input
            size="large"
            placeholder="Title"
            value={problem.title}
            onChange={e => {
              setProblem({ ...problem, title: e.target.value });
            }}
          />
        </div>
        <div className="type">
          <Select
            size="large"
            style={{ width: "100%" }}
            mode="multiple"
            placeholder="Type"
            value={problem.type === "" ? [] : problem.type.split("/")}
            onChange={value => {
              setProblem({ ...problem, type: value.join("/") });
            }}
          >
            {problemTags}
          </Select>
        </div>
        <div className="limit">
          <NumberInput
            placeholder="time limit"
            addonAfter="ms"
            className="child"
            size="large"
            value={problem.timeLimit}
            onChange={value => {
              setProblem(problem => ({ ...problem, timeLimit: value }));
            }}
          />
          <NumberInput
            placeholder="memory limit"
            addonAfter="mb"
            className="child"
            size="large"
            value={problem.memoryLimit}
            onChange={value => {
              setProblem({ ...problem, memoryLimit: value });
            }}
          />
          <Select
            size="large"
            className="child"
            placeholder="Difficulty"
            defaultValue={problem.difficulty}
            onChange={difficulty => {
              setProblem({ ...problem, difficulty });
            }}
          >
            {problemDifficulty.map(item => (
              <Select.Option key={item}>{item}</Select.Option>
            ))}
          </Select>
        </div>
        <div className="content">
          <TextInput
            placehoder="Content"
            onChange={content => setProblem({ ...problem, content })}
            initValue={problem.content}
          />
        </div>
        <div className="standardinput">
          <TextInput
            placehoder="StandardInput"
            onChange={standardInput => setProblem({ ...problem, standardInput })}
            initValue={problem.standardInput}
          />
        </div>
        <div className="standardoutput">
          <TextInput
            placehoder="StandardOutput"
            onChange={standardOutput => setProblem({ ...problem, standardOutput })}
            initValue={problem.standardOutput}
          />
        </div>
        <div className="tip">
          <TextInput placehoder="Tip" onChange={tip => setProblem({ ...problem, tip })} initValue={problem.tip} />
        </div>
        <div className="samples">
          <Input.TextArea
            value={problem.samples.sampleInput}
            placeholder="Input sample"
            autoSize={{ minRows: 5 }}
            className="sample"
            onChange={e => {
              setProblem({ ...problem, samples: { ...problem.samples, sampleInput: e.target.value } });
            }}
          />
          <Input.TextArea
            value={problem.samples.sampleOutput}
            placeholder="Output sample"
            autoSize={{ minRows: 5 }}
            className="sample"
            onChange={e => {
              setProblem({ ...problem, samples: { ...problem.samples, sampleOutput: e.target.value } });
            }}
          />
        </div>
        <div className="image">
          <ImageWall />
        </div>
        <div className="file">
          <Upload
            customRequest={({ file }) => {
              if (
                file.type !== "application/zip" &&
                file.type !== "application/x-zip" &&
                file.type !== "application/x-zip-compressed"
              ) {
                message.error("the file must be zip format");
                return;
              }
              const formData = new FormData();
              formData.append("file", file);
              server.post("/upload", formData).then(
                response => {
                  setProblem({ ...problem, file: response.data.filename });
                  setUploadFile(true);
                },
                error => {
                  message.error("文件上传错误:", error);
                }
              );
            }}
            onRemove={() => {
              setProblem({ ...problem, file: "" });
              setUploadFile(false);
            }}
            showUploadList={false}
          >
            <Button>
              {uploadFile ? <CheckCircleFilled /> : <Icon type="upload" />}
              Click to upload testCase(zip)
            </Button>
          </Upload>
        </div>
      </div>
    );
  else return <div></div>;
};
