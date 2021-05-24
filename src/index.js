import React from "react";
import ReactDOM from "react-dom";
import { Spin } from "antd";
import store from "store";
import App from "./App";
import Home from "./Home/Home";
import Auth from "./Auth/Layout";
import server from "./server";

ReactDOM.render(
  <Spin size="large">
    <div style={{ width: "100%", height: "100vh" }} />
  </Spin>,
  document.getElementById("root")
);

const appPages = ["user", "problem", "contest", "news", "rank"];

const SwitchPage = () => {
  const pathname = window.location.pathname.split("/");
  if (pathname.includes("account")) {
    return <Auth />;
  } else if (appPages.some(page => pathname.includes(page))) {
    return <App />;
  } else {
    return <Home />;
  }
};

const process = () =>
  new Promise((resolve, reject) => {
    server
      .get("/auth")
      .then(response => {
        store.set("auth", response.data);
        resolve();
      })
      .catch(error => {
        store.remove("auth");
        reject(error);
      });
  });

process()
  .then(() => {
    ReactDOM.render(<App />, document.getElementById("root"));
  })
  .catch(() => {
    ReactDOM.render(SwitchPage(), document.getElementById("root"));
  });
