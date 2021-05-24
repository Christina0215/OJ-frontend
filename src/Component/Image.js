import { Upload, Icon, Modal, message } from "antd";
import React, { useState } from "react";
import server from "../server";
import utils from "../utils";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default () => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [uid, setUid] = useState(0);

  const handleUpload = ({ file }) => {
    const formData = new FormData();
    formData.append("file", file);
    server.post("/upload", formData).then(
      response => {
        const url = "http://localhost:8000/static/image/" + response.data.filename;
        setFileList([
          ...fileList,
          {
            uid,
            url,
            name: "image.png",
            status: "done",
          },
        ]);
        setUid(uid + 1);
        utils.copyToClipboard(url);
      },
      error => {
        message.error("上传失败");
      }
    );
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file);
    }
    setPreviewVisible(true);
    setPreviewImage(file.url || file.preview);

    utils.copyToClipboard(file.url);
  };

  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="antd-upload-text">Upload</div>
    </div>
  );

  return (
    <div className="clearfix">
      <Upload listType="picture-card" fileList={fileList} onPreview={handlePreview} customRequest={handleUpload}>
        {fileList.length > 5 ? null : uploadButton}
      </Upload>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="images" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
};
