import React from "react";
import { Switch, Route } from "react-router-dom";
import ProblemBoard from "./ProblemBoard";
import ProblemDetail from "./ProblemDetail";
import ProblemCreate from "./ProblemCreate";
import ProblemModify from "./ProblemModify";
import SolutionDetail from "./SolutionDetail";
import SolutionCreate from "./SolutionCreate";
import SolutionModify from "./SolutionModify";

export default () => {
  return (
    <Switch>
      <Route exact path="/problem" component={ProblemBoard} />
      <Route exact path="/problem/:problemId" component={ProblemDetail} />
      <Route exact path="/problem/create/new" component={ProblemCreate} />
      <Route exact path="/problem/modify/:problemId" component={ProblemModify} />
      <Route exact path="/problem/:problemId/solution/:solutionId" component={SolutionDetail}/>
      <Route exact path="/problem/:problemId/solution/create/new" component={SolutionCreate}/>
      <Route exact path="/problem/:problemId/solution/modify/:solutionId" component={SolutionModify}/>
    </Switch>
  );
};
