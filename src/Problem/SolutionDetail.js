import React, { useState, useEffect } from "react";
import server from "../server";
import md from "../Component/MarkdownIt";
import {Card} from "antd";

export default ({ match }) => {
  const problemId = match.params.problemId;
  const solutionId = match.params.solutionId;
  const [solution, setSolution] = useState({});

  const mdRender = (value = "") => {
    return md.render(value);
  };
  
  useEffect(() => {
    server
      .get(`/problem/${problemId}/solution/${solutionId}`)
      .then(response => {
        setSolution(response.data);
      })
      .catch(() => {
        console.log("not found page");
      });
  }, []);

  return (
    <div style={{ padding: "20px 40px" }}>
      <Card title={solution.title}>
        <div style={{ marginBottom: "20px" }}>
          <p dangerouslySetInnerHTML={{ __html: mdRender(solution.content) }}></p>
        </div>
      </Card>
    </div>
  );
};
