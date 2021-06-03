import React, { useEffect, useState } from "react";
import SolutionCreate from "./SolutionCreate";
import server from "../server";

export default ({ match }) => {
  const problemId = match.params.problemId;
  const solutionId = match.params.solutionId;
  const [solution, setSolution] = useState({});
  useEffect(() => {
    server.get(`/problem/${problemId}/solution/${solutionId}`).then(response => {
      setSolution(response.data);
    });
  }, []);

  function modifySolution(params) {
    server.put(`/problem/${problemId}/solution/${solutionId}`, params).catch(e => {
      throw new Error(e);
    });
  }

  return <SolutionCreate problemId={problemId} solutionData={solution} modifySolution={modifySolution} />;
};
