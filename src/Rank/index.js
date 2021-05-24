import React from "react";
import { Switch, Route } from "react-router-dom";
import Rank from "./Rank";
// import UserDetail from "./UserDatail";

export default () => {
  return (
    <Switch>
      <Route exact path="/rank" component={Rank} />
      {/* <Route exact path="/rank/:userId" component={UserDetail} /> */}
    </Switch>
  );
};
