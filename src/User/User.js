import React, { useState, useEffect } from "react";
import { Button, Card, Icon, Form, Input } from "antd";
import server from "../server";

export default () => {
  const [profile, setProfile] = useState({ username: "", email: "", gender: "", introduction: "" });
  useEffect(() => {
    server.get("/auth").then(r => {
      console.log(r.data);
      const { username, email, gender, introduction } = r.data;
      setProfile({
        username,
        email,
        gender,
        introduction,
      });
    });
  }, [profile.username, profile.email, profile.gender, profile.introduction]);
  return (
    <Form>
      <Form.Item>
        <strong>姓名</strong>
        <Input disabled value={profile.username} />
      </Form.Item>
      <Form.Item>
        <strong>性别({profile.gender === 1 ? <Icon type="woman" /> : <Icon type="man" />})</strong>
        <Input value={profile.gender === 1 ? "女" : "男"} disabled />
      </Form.Item>
      <Form.Item>
        <strong>邮箱</strong>
        <Input value={profile.email} disabled />
      </Form.Item>
      <Form.Item>
        <strong>自我简介</strong>
        <Input
          type="Textarea"
          value={profile.introduction === "" ? "你太懒了，竟然不想写下一点简介" : profile.introduction}
          disabled
        />
      </Form.Item>
    </Form>
  );
};
