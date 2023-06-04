import { FC, memo } from "react";
import { Button, Form, Input, InputNumber, Modal } from "antd";

import styles from "./style.module.scss";

type Props = {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
};

const layout = {
    // labelCol: { span: 8 },
    // wrapperCol: { span: 16 },
  };
  
  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  /* eslint-enable no-template-curly-in-string */
  
  const onFinish = (values: any) => {
    console.log(values);
  };

const TourModal: FC<Props> = ({ isModalOpen, handleOk, handleCancel }) => {
  return (
    <Modal
      width={800}
      title="Tour du lịch"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}>
      <Form
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        {/* <Form.Item
          name={["user", "email"]}
          label="Email"
          rules={[{ type: "email" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "age"]}
          label="Age"
          rules={[{ type: "number", min: 0, max: 99 }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name={["user", "website"]} label="Website">
          <Input />
        </Form.Item>
        <Form.Item name={["user", "introduction"]} label="Introduction">
          <Input.TextArea />
        </Form.Item> */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default memo(TourModal);
