import React, { useState } from "react";
import { Form, Icon, Input, Button, Checkbox, message } from "antd";
import CryptoJS from "crypto-js";
import store from "store";
import httpService from "../server";

function Login({ form }) {
  const [submiting, setSubmiting] = useState(false);
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        setSubmiting(true);
        httpService
          .post("auth/login", {
            username: values.username,
            password: CryptoJS.SHA1(values.password).toString(),
            remember: values.remember,
          })
          .then(r => {
            message.success("登录成功");
            setSubmiting(false);
            store.set("Api_Token", r.data.token);
            window.location.href = "/problem";
          })
          .catch(e => {
            message.error("登录失败");
            console.log(e);
            setSubmiting(false);
          });
      } else {
        message.error("请正确填写表单");
      }
    });
  };
  const { getFieldDecorator } = form;
  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <Form.Item>
        {getFieldDecorator("username", {
          rules: [{ required: true, message: "Please input your username!" }],
        })(<Input prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="Username" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("password", {
          rules: [{ required: true, message: "Please input your Password!" }],
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("remember", {
          valuePropName: "checked",
          initialValue: true,
        })(<Checkbox>Remember me</Checkbox>)}
        <a className="login-form-forgot" href="/" style={{ marginLeft: "40%" }}>
          Forgot password
        </a>
        <br />
        <div>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={handleSubmit}
            loading={submiting}
            style={{ width: "100%" }}
          >
            登录
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}
const WrappedNormalLoginForm = Form.create()(Login);
export default WrappedNormalLoginForm;
