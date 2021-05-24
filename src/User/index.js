import React from "react";
import { Switch, Route } from "react-router-dom";
import User from "./User";
import Setting from "./Setting";

export default () => {
  return (
    <Switch>
      <Route exact path="/user" component={User} />
      <Route exact path="/user/setting" component={Setting} />
    </Switch>
  );
};
