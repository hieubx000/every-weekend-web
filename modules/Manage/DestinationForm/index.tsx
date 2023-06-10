import React, { FC, memo, useState, useEffect, useCallback } from "react";

import {
  Col,
  Form,
  Input,
  Row,
  Select,
  Button,
  Image,
  Upload,
  message,
} from "antd";

import axios from "axios";
import { CloudUploadOutlined } from "@ant-design/icons";
import { blogCategory, statusList } from "@/utils/initData";
import { patchUpdateBlogApi, postCreateBlogApi } from "@/api/services/blog";

import styles from "./style.module.scss";
import { Blog, Destination } from "@/types/common";
import { useRouter } from "next/router";
import useUserProfile from "@/hooks/useUserProfile";
import { Role } from "@/types/commonTypes";
import {
  patchUpdateDestinationApi,
  postCreateDestinationApi,
} from "@/api/services/destination";

type Props = {
  destinationDetail?: Destination;
};

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

const DestinationForm: FC<Props> = ({ destinationDetail }) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [form] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    if (destinationDetail) {
      form.setFieldsValue({
        title: destinationDetail.title,
        description: destinationDetail.description,
      });
      setImageUrl(destinationDetail.imageUrl);
    }
  }, [destinationDetail, form]);

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

  const onFinish = useCallback(
    async (values: any) => {
      try {
        destinationDetail
          ? await patchUpdateDestinationApi(destinationDetail.id, {
              title: values.title,
              description: values.description,
              imageUrl: imageUrl,
            })
          : await postCreateDestinationApi({
              title: values.title,
              description: values.description,
              imageUrl: imageUrl,
            });
        router.back();
        message.success("Đăng bài thành công");
      } catch (error) {
        message.error("Đăng bài thất bại");
      }
    },
    [imageUrl, destinationDetail],
  );

  return (
    <div className={styles.container}>
      <Form
        form={form}
        initialValues={{ category: 1, status: 1 }}
        onFinish={onFinish}
        layout="vertical"
        scrollToFirstError>
        <Form.Item
          name="title"
          label="Tên điểm đến"
          rules={[
            {
              required: true,
              message: "Tên điểm đến không được để trống!",
            },
          ]}>
          <Input size="large" placeholder="Nhập tên điểm đến" maxLength={200} />
        </Form.Item>

        <Form.Item name="description" label="Tóm tắt">
          <Input.TextArea
            autoSize
            style={{ padding: "12px" }}
            maxLength={2000}
          />
        </Form.Item>

        <div className={styles.title}>Hình ảnh giới thiệu</div>

        <Form.Item>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}>
            {imageUrl && <Image src={imageUrl} width={400} />}
            <Upload
              {...props}
              name="avatar"
              listType="text"
              showUploadList={false}
              action="http://127.0.0.1:5000/upload"
              beforeUpload={beforeUpload}
              multiple={false}>
              <Button
                size="large"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "24px",
                }}
                icon={<CloudUploadOutlined style={{ marginRight: "10px" }} />}>
                {" "}
                Upload
              </Button>
            </Upload>
          </div>
        </Form.Item>

        <div className={styles.btnSubmit}>
          <Button onClick={() => router.back()}>Trở lại</Button>
          <Button type="primary" htmlType="submit">
            {destinationDetail ? "Cập nhật" : "Tạo mới"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default memo(DestinationForm);
