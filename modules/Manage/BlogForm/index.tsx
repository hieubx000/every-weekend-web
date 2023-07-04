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

import styles from "./style.module.scss";
import { Blog } from "@/types/common";
import { useRouter } from "next/router";
import useUserProfile from "@/hooks/useUserProfile";
import { Role } from "@/types/commonTypes";
import { patchUpdateBlogApi, postCreateBlogApi } from "@/pages/api/services/blog";

type Props = {
  blogDetail?: Blog;
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

const BlogForm: FC<Props> = ({ blogDetail }) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [form] = Form.useForm();
  const router = useRouter();
  const { userRole } = useUserProfile();

  useEffect(() => {
    if (blogDetail) {
      form.setFieldsValue({
        name: blogDetail.title,
        category: blogDetail.category,
        status: blogDetail.status,
        summary: blogDetail.summary,
        content: blogDetail.content,
      });
      setImageUrl(blogDetail.imageUrl);
    }
  }, [blogDetail, form]);

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
        blogDetail
          ? await patchUpdateBlogApi(blogDetail.id, {
              title: values.name,
              summary: values.summary,
              category: values.category,
              status: values.status,
              imageUrl: imageUrl,
              content: values.content,
            })
          : await postCreateBlogApi({
              title: values.name,
              summary: values.summary,
              category: values.category,
              status: values.status,
              imageUrl: imageUrl,
              content: values.content,
            });
        router.back();
        message.success("Đăng bài thành công");
      } catch (error) {
        message.error("Đăng bài thất bại");
      }
    },
    [imageUrl, blogDetail],
  );

  return (
    <div className={styles.container}>
      <Form
        form={form}
        initialValues={{ category: 1, status: 1 }}
        onFinish={onFinish}
        layout="vertical"
        scrollToFirstError>
        <Row gutter={28}>
          <Col span={16}>
            <Form.Item
              name="name"
              label="Tên bài viết"
              rules={[
                {
                  required: true,
                  message: "Tên bài viết không được để trống!",
                },
              ]}>
              <Input placeholder="Nhập tên bài viết" maxLength={200} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="category" label="Danh mục bài viết">
              <Select>
                {blogCategory.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={28}>
          <Col span={8}>
            <Form.Item name="status" label="Trạng thái">
              <Select disabled={userRole != Role.admin}>
                {statusList.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="summary" label="Tóm tắt">
          <Input.TextArea
            autoSize
            style={{ padding: "12px" }}
            maxLength={500}
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

        <Form.Item name="content" label="Nội dung">
          <Input.TextArea
            autoSize
            style={{ padding: "12px" }}
            maxLength={500}
          />
        </Form.Item>

        <div className={styles.btnSubmit}>
          <Button onClick={() => router.back()}>Trở lại</Button>
          <Button type="primary" htmlType="submit">
            {blogDetail ? "Cập nhật" : "Tạo mới"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default memo(BlogForm);
