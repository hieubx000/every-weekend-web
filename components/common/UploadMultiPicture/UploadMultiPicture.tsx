import React, { useState } from "react";

import { UploadOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import axios from "axios";
import ModalPopup from "../ModalPopup/ModalPopup";

import styles from "./UploadMultiPicture.module.scss";

interface IProps {
  setPicture(data: string): void;
}

const beforeUpload = (file: any) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const UploadMultiPicture = ({ setPicture }: IProps): JSX.Element => {
  const [previewModal, setPreviewModal] = useState(false);

  const props = {
    name: "file",
    multiple: true,
    customRequest: async (options: any) => {
      const fmData = new FormData();

      fmData.append("file", options.file);

      try {
        const result = await axios.post(options.action, fmData);
        options.file.linkUrl = result.data.url;
        options.onSuccess(null, options.file);
        message.success("Ảnh đã được upload thành công");
      } catch (error) {
        options.onError();
        message.error("Có lỗi xảy ra trong quá trình upload ảnh");
      }
    },
  };
  const onChange = (info: any) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      setTimeout(() => {
        setPicture(info.file.linkUrl);
      }, 900);
    }
    setPreviewModal(false);
  };

  const onPreview = async (file: any) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    if (imgWindow) {
      imgWindow.document.write(image.outerHTML);
    }
  };

  return (
    <div className={styles.picture}>
      <div onClick={() => setPreviewModal(true)} className={styles.image}>
        <UploadOutlined />
        &nbsp;Tải lên
      </div>

      <ModalPopup
        title="Ảnh"
        visible={previewModal}
        handleCancelModal={() => setPreviewModal(false)}
        isConfirmBtn={false}
        isCancelBtn={false}
        closeBtn
        transition="move-up">
        <div className={styles.modal_avatar}>
          <img src="/assets/images/common/white.jpg" alt="" />
          <ImgCrop aspect={3 / 2} showReset showGrid rotationSlider>
            <Upload
              {...props}
              name="picture"
              listType="text"
              showUploadList={false}
              action="http://127.0.0.1:5000/upload"
              beforeUpload={beforeUpload}
              onChange={onChange}
              onPreview={onPreview}
              multiple={false}
              className={styles.upload}>
              <button type="button" className="cursor-pointer">
                + Tải ảnh lên
              </button>
            </Upload>
          </ImgCrop>
        </div>
      </ModalPopup>
    </div>
  );
};

export default UploadMultiPicture;
