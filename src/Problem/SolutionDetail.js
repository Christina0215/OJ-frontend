import React, { useState, useEffect } from "react";
import { Tabs, Icon } from "antd";
import Commit from "./Commit";
import server from "../server";
import Detail from "./Detail";
import Submit from "./Submit";
import SolutionBoard from "./SolutionBoard";

export default ({ match }) => {
  const { problemId } = match.params.problemId;
  const { solutionId } = match.params.solutionId;
  const [problem, setProblem] = useState({});
  const [tabKey, setTabKey] = useState("1");

  useEffect(() => {
    server
      .get(`/problem/${problemId}/solution/${solutionId}`)
      .then(response => {
        setProblem(response.data);
      })
      .catch(() => {
        console.log("not found page");
      });
  }, []);

  const { TabPane } = Tabs;

  return (
    <div style={{ padding: "20px 40px" }}>
      <Card title={problem.title} extra={<div>{getExtra(problem)}</div>}>
        <div style={{ marginBottom: "20px" }}>
          <p dangerouslySetInnerHTML={{ __html: mdRender(problem.content) }}></p>
        </div>
      </Card>
    </div>
  );
};
