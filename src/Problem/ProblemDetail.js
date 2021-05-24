import React, { useState, useEffect } from "react";
import { Tabs, Icon } from "antd";
import Commit from "./Commit";
import Commment from "../Component/comment/showComments";
import server from "../server";
import Detail from "./Detail";
import Submit from "./Submit";

export default ({ match }) => {
  const { problemId } = match.params;
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

  const commentExample = {
    comment: "含烟是谁",
    children: [
      {
        comment: "我觉得是龚荣云",
        key: 0,
      },
      {
        comment: "我也觉得",
        key: 1,
      },
    ],
  };

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
            Discuss
          </span>
        }
        key="4"
      >
        <Commment comment={commentExample.comment}>
          {commentExample.children.map((item, index) => (
            <Commment key={item.key} comment={commentExample.children[index].comment} />
          ))}
        </Commment>
      </TabPane>
    </Tabs>
  );
};
