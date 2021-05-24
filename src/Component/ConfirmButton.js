import React from "react";
import { Button, Modal } from "antd";

export default ({ clickHandler, children, ...prop }) => {
  const confirm = () => {
    Modal.confirm({
      title: "Confirm",
      content: "Are you sure about this",
      onOk: clickHandler,
      okText: "Sure",
      cancelText: "Afraid not",
    });
  };
  return (
    <Button {...prop} onClick={confirm}>
      {children}
    </Button>
  );
};
