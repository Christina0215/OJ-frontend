import React from "react";
import axios from "axios";
import store from "store";
import { message, notification, Icon } from "antd";
import moment from "moment";

const server = axios.create({
  baseURL: "/api",
});

server.createNotification = (error, errorMessage, validations = []) => {
  notification.open({
    message: error.response.config.method === "get" ? "请求失败" : "操作失败",
    description: (
      <div>
        <div>{moment(error.response.headers.date).format("YYYY-MM-DD HH:mm:ss")}</div>
        <div>
          <strong>错误代码：</strong>
          <span>{error.response.status}</span>
        </div>
        <div>
          <strong>错误信息：</strong>
          <span>{errorMessage}</span>
        </div>
        {validations.map((o, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={`validation-${idx}`}>{o}</div>
        ))}
      </div>
    ),
    icon: <Icon type="frown" style={{ color: "#e90240" }} />,
    placement: "bottomRight",
  });
};

server.interceptors.request.use(
  config => {
    config.headers.Api_Token = store.get("Api_Token", "");
    return config;
  },
  error => Promise.reject(error)
);

server.interceptors.response.use(
  response => {
    if (response.config.method === "get") {
      // do nothing
    } else if (response.config.url.match(/^\/upload.*$/)) {
      message.success("上传成功");
    } else {
      notification.open({
        message: response.data.message || "操作成功",
        description: moment(response.headers.date).format("YYYY-MM-DD HH:mm:ss"),
        icon: <Icon type="smile" style={{ color: "#108ee9" }} />,
        placement: "bottomRight",
      });
    }
    return response;
  },
  error => {
    const code = error.response && error.response.status;
    let errorMessage;
    const validations = [];
    if (code === 401) {
      // errorMessage = error.response.data.message || "登录信息过期，请重新登录";
    } else if (code === 403) {
      errorMessage = error.response.data.message || "权限不够，无法进行此操作";
    } else if (code === 413) {
      errorMessage = "上传文件过大";
    } else if (code === 422) {
      errorMessage = "请检查表单填写";
      Object.keys(error.response.data).forEach(name => {
        const msg = error.response.data[name][0];
        validations.push(`[${name}] ${msg}`);
      });
    } else {
      errorMessage = error.response.data.message || "未知错误";
    }
    if (!errorMessage) {
      return Promise.reject(error);
    }
    server.createNotification(error, errorMessage, validations);
    return Promise.reject(error);
  }
);

export default server;
