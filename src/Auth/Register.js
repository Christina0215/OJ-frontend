import React, { useState } from "react";
import { Form, Input, Button, Row, Col, message } from "antd";
import store from "store";
import CryptoJS from "crypto-js";
import httpService from "../server";

const FormItem = Form.Item;
function Register({ form, history }) {
  const [submiting, setSubmiting] = useState(false);
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [usernameValidate, setUsernameValidate] = useState("");
  const [emailValidate, setEmailValidate] = useState("");
  const [pendingTime, setPendingTime] = useState(0);
  const [email, setEmail] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((errors, values) => {
      if (!errors) {
        setSubmiting(true);
        httpService
          .post("auth/register", {
            username: values.username,
            password: CryptoJS.SHA1(values.password).toString(),
            email: values.email,
            code: values.code,
          })
          .then(r => {
            message.success("注册成功，请登录", 1).then(() => {
              setSubmiting(false);
              store.set("Api_Token", r.data.token);
              window.location.href = "/problem";
            });
          })
          .catch(e => {
            setSubmiting(false);
          });
      } else {
        message.error("表单填写有误");
      }
    });
  };
  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue("password")) {
      callback("两次密码不一致");
    } else {
      callback();
    }
  };
  const validateToNextPassword = (rule, value, callback) => {
    if (value && { confirmDirty }) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };
  const handleConfirmBlur = e => {
    const { value } = e.target;
    setConfirmDirty({ confirmDirty } || !!value);
  };

  const usernameValidating = (rule, value, callback) => {
    setUsernameValidate("validating");
    const { username } = form.getFieldsValue(["username"]);
    if (!username) {
      setUsernameValidate("error");
      callback("请输入用户名");
      return;
    }
    const Reg = /^([a-zA-Z][a-zA-Z0-9_]{0,9})$|^([\u4e00-\u9fa5]{1,10})$/;
    if (!Reg.test(username)) {
      setUsernameValidate("error");
      callback("请检查用户名(以英文字母或中文字符开头，不超过10个字符)");
      return;
    }
    setUsernameValidate("success");
    callback();
  };
  const emailValidating = (rule, value, callback) => {
    setEmailValidate("validating");
    const { email } = form.getFieldsValue(["email"]);
    setEmail(email);
    if (!email) {
      setEmailValidate("error");
      callback("请输入邮箱");
      return;
    }
    const Reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    if (!Reg.test(email)) {
      setEmailValidate("error");
      callback("请检查邮箱格式");
      return;
    }
    setEmailValidate("success");
    callback();
  };

  const countDown = pending => {
    if (pending < 0) {
      return;
    }
    setPendingTime(pending);
    if (pending > 0) {
      setTimeout(() => {
        countDown(pending - 1);
      }, 1000);
    }
  };

  const getCode = () => {
    httpService
      .post("auth/code", { email })
      .then(r => {
        message.success("邮件发送成功，请及时填写你的验证码");
        setPendingTime(60);
        countDown(60);
      })
      .catch(e => {
        setPendingTime(60);
        countDown(60);
      });
  };
  const { getFieldDecorator } = form;
  return (
    <Form onSubmit={handleSubmit} layout="vertical">
      <FormItem label="用户名" validateStatus={usernameValidate} hasFeedback>
        {getFieldDecorator("username", {
          rules: [
            {
              required: true,
              message: " ",
            },
            {
              validator: usernameValidating,
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem label="邮箱" validateStatus={emailValidate} hasFeedback>
        {getFieldDecorator("email", {
          rules: [
            {
              required: true,
              message: " ",
            },
            {
              validator: emailValidating,
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem>
        <Row gutter={8}>
          <Col span={12}>
            {getFieldDecorator("code", {
              rules: [{ required: true, message: "请输入你的验证码" }],
            })(<Input />)}
          </Col>
          <Col span={12}>
            <Button onClick={getCode} disabled={!(emailValidate === "success") && !pendingTime}>
              {pendingTime > 0 ? `${pendingTime}后获取重新获取` : "获取验证码"}
            </Button>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="密码">
        {getFieldDecorator("password", {
          rules: [
            {
              required: true,
              message: "请输入密码",
            },
            {
              validator: validateToNextPassword,
            },
          ],
        })(<Input type="password" />)}
      </FormItem>
      <FormItem label="确认密码">
        {getFieldDecorator("confirm", {
          rules: [
            {
              required: true,
              message: "请再次确认密码",
            },
            {
              validator: compareToFirstPassword,
            },
          ],
        })(<Input type="password" onBlur={handleConfirmBlur} />)}
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }} loading={submiting}>
          注册
        </Button>
      </FormItem>
    </Form>
  );
}
const WrappedRegistrationForm = Form.create()(Register);
export default WrappedRegistrationForm;
