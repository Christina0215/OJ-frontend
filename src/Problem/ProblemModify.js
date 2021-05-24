import React, { useEffect, useState } from "react";
import ProblemCreate from "./ProblemCreate";
import server from "../server";

export default ({ match }) => {
  const { problemId } = match.params;
  const [problem, setProblem] = useState({});
  useEffect(() => {
    server.get(`/problem/${problemId}`).then(response => {
      setProblem(response.data);
    });
  }, []);

  function modifyProblem(params) {
    server.put(`/problem/${problemId}`, params).catch(e => {
      throw new Error(e);
    });
  }

  return <ProblemCreate problemData={problem} modifyProblem={modifyProblem} />;
};
