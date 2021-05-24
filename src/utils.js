import { message } from "antd";

const copyToClipboard = (text = "") => {
  if (typeof text !== "string") {
    throw new TypeError(`param should be a string, but receive a ${typeof text}`);
  }
  function handler(e) {
    e.clipboardData.setData("text/plain", text);
    e.preventDefault();
    message.success("已复制到剪贴板");
    window.document.removeEventListener("copy", handler, true);
  }

  window.document.addEventListener("copy", handler, true);
  window.document.execCommand("copy");
};

export default { copyToClipboard };
