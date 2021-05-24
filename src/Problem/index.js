import React from "react";
import { Switch, Route } from "react-router-dom";
import ProblemBoard from "./ProblemBoard";
import ProblemDetail from "./ProblemDetail";
import ProblemCreate from "./ProblemCreate";
import ProblemModify from "./ProblemModify";

export default () => {
  return (
    <Switch>
      <Route exact path="/problem" component={ProblemBoard} />
      <Route exact path="/problem/:problemId" component={ProblemDetail} />
      <Route exact path="/problem/create/new" component={ProblemCreate} />
      <Route exact path="/problem/modify/:problemId" component={ProblemModify} />
    </Switch>
  );
};
