import React, { useState } from "react";

import { message, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import axios from "axios";
import ModalPopup from "../ModalPopup/ModalPopup";
import defaultConstant from "@/constants/defaultConstant";

import styles from "./UploadAvatar.module.scss";

interface IProps {
  imageUrl: string;
  setImageUrl(data: string): void;
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

const UploadAvatar = ({ imageUrl, setImageUrl }: IProps): JSX.Element => {
  const [previewModal, setPreviewModal] = useState(false);

  const props = {
    name: "file",
    multiple: true,
    customRequest: async (options: any) => {
      const fmData = new FormData();

      fmData.append("file", options.file);

      try {
        const result = await axios.post(options.action, fmData);
        options.onSuccess(null, options.file);
        setImageUrl(result.data.url);
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
    <div className={styles.avatar}>
      <div onClick={() => setPreviewModal(true)} className={styles.image}>
        <img
          src={imageUrl || defaultConstant.defaultAvatarUser}
          alt=""
          style={{ width: "100%" }}
        />
      </div>

      <ModalPopup
        title="Ảnh đại diện"
        visible={previewModal}
        handleCancelModal={() => setPreviewModal(false)}
        isConfirmBtn={false}
        isCancelBtn={false}
        closeBtn>
        <div className={styles.modal_avatar}>
          <img src={imageUrl} alt="" />
          <ImgCrop>
            <Upload
              {...props}
              name="avatar"
              listType="text"
              showUploadList={false}
              action="http://127.0.0.1:5000/upload"
              beforeUpload={beforeUpload}
              onChange={onChange}
              onPreview={onPreview}
              multiple={false}
              className={styles.upload}>
              <button type="button">+ Tải ảnh lên</button>
            </Upload>
          </ImgCrop>
        </div>
      </ModalPopup>
    </div>
  );
};

export default UploadAvatar;
