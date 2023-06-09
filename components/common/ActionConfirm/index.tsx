import { Popconfirm } from "antd";
import { FC, memo, useState, useEffect, useCallback, useRef } from "react";
import { MdDeleteOutline } from "react-icons/md";

type Props = {
  children: React.ReactNode;
  handleConfirm: () => void;
  title: string;
  description: string;
};

const ActionConfirm: FC<Props> = ({
  children,
  handleConfirm,
  title,
  description,
}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);

    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      handleConfirm();
    }, 500);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Popconfirm
      title={title}
      description={description}
      open={open}
      onConfirm={handleOk}
      okButtonProps={{ loading: confirmLoading }}
      onCancel={handleCancel}>
      <div onClick={showPopconfirm}>{children}</div>
    </Popconfirm>
  );
};

export default memo(ActionConfirm);
