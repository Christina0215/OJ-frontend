import React, { useState, useEffect } from "react";
import { Tabs, Icon } from "antd";
import Commit from "./Commit";
import server from "../server";
import Detail from "./Detail";
import Submit from "./Submit";
import SolutionBoard from "./SolutionBoard";

export default ({ match }) => {
  const { problemId } = match.params;
  console.log(match)
  const [problem, setProblem] = useState({});
  const [tabKey, setTabKey] = useState("1");

  useEffect(() => {
    server
      .get(`/problem/${problemId}`)
      .then(response => {
        setProblem(response.data);
      })
      .catch(() => {
        console.log("not found page");
      });
  }, []);

  const { TabPane } = Tabs;

  return (
    <Tabs
      defaultActiveKey="1"
      onChange={key => {
        if ((tabKey === "3" && key !== "3") || (tabKey !== "3" && key === "3")) {
          setTabKey(key);
        }
      }}
    >
      <TabPane
        tab={
          <span>
            <Icon type="read" />
            Detail
          </span>
        }
        key="1"
      >
        <Detail problem={problem} />
      </TabPane>
      <TabPane
        tab={
          <span>
            <Icon type="edit" />
            submit
          </span>
        }
        key="2"
      >
        <Submit problemId={problemId} />
      </TabPane>
      <TabPane
        tab={
          <span>
            <Icon type="code" />
            Commit
          </span>
        }
        key="3"
      >
        <Commit problemId={problemId} tabKey={tabKey} />
      </TabPane>
      <TabPane
        tab={
          <span>
            <Icon type="audio" />
            Solutions
          </span>
        }
        key="4"
      >
        <SolutionBoard problemId={problemId} tabKey={tabKey}/>
      </TabPane>
    </Tabs>
  );
};
