import React from "react";
import { Card, Tag } from "antd";
import md from "../Component/MarkdownIt";
import "highlight.js/styles/googlecode.css";
import "katex/dist/katex.css";

export default ({ problem }) => {
  const mdRender = (value = "") => {
    return md.render(value);
  };

  const getExtra = problem => {
    const { difficulty, type = "" } = problem;
    let difficultyDOM = null;
    if (difficulty === "difficult") difficultyDOM = <Tag color="red">{difficulty}</Tag>;
    else if (difficulty === "middle") difficultyDOM = <Tag color="orange">{difficulty}</Tag>;
    else difficultyDOM = <Tag color="green">{difficulty}</Tag>;
    return (
      <div>
        {type.split("/").map(item => (
          <Tag key={item} color="#8A2BE2">
            {item}
          </Tag>
        ))}
        {difficultyDOM}
      </div>
    );
  };
  return (
    <div style={{ padding: "20px 40px" }}>
      <Card title={problem.title} extra={<div>{getExtra(problem)}</div>}>
        <div style={{ marginBottom: "20px" }}>
          <p dangerouslySetInnerHTML={{ __html: mdRender(problem.content) }}></p>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <h3>
            <b>StandardInput</b>
          </h3>
          <p dangerouslySetInnerHTML={{ __html: mdRender(problem.standardInput) }}></p>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <h3>
            <b>StandardOutput</b>
          </h3>
          <p dangerouslySetInnerHTML={{ __html: mdRender(problem.standardOutput) }}></p>
        </div>
        {problem.tip ? (
          <div style={{ marginBottom: "20px" }}>
            <h3>
              <b>Tips</b>
            </h3>
            <p dangerouslySetInnerHTML={{ __html: mdRender(problem.tip) }}></p>
          </div>
        ) : (
          ""
        )}
        <div style={{ marginBottom: "20px" }}>
          <h3>
            <b>Example</b>
          </h3>
          <div className="example">
            <div className="input">
              <b>Input</b>
              <p style={{ textAlign: "left", padding: "10px 30px", borderRight: "1px dashed gray", whiteSpace: "pre" }}>
                {problem.samples && JSON.parse(problem.samples).sampleInput}
              </p>
            </div>
            <div className="output">
              <b>Output</b>
              <p style={{ textAlign: "left", padding: "10px 30px", borderLeft: "1px dashed gray", whiteSpace: "pre" }}>
                {problem.samples && JSON.parse(problem.samples).sampleOutput}
              </p>
            </div>
          </div>
        </div>
        <div>
          <p>
            <b>TimeLimit:</b> {problem.timeLimit} ms
          </p>
          <p>
            <b>MemoryLimit:</b> {problem.memoryLimit} Mib
          </p>
        </div>
      </Card>
    </div>
  );
};
