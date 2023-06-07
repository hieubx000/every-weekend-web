import { FC, memo, useCallback } from "react";

// import styles from "./style.module.scss";
import ModalPopup from "../../ModalPopup/ModalPopup";
import { Button, Result } from "antd";
import { useRouter } from "next/router";

type Props = {
  visible: boolean;
  title: string;
  subTitle?: string;
  goToDetailUrl?: string;
  onCancel: () => void;
};

const SuccessModal: FC<Props> = ({
  visible,
  title,
  subTitle,
  goToDetailUrl,
  onCancel,
}) => {
  const router = useRouter();
  const postToHomePage = useCallback(() => {
    router.replace("/");
    onCancel();
  }, []);

  const pushToDetail = useCallback(() => {
    goToDetailUrl && router.push(goToDetailUrl);
    onCancel();
  }, [goToDetailUrl]);

  return (
    <div>
      <ModalPopup
        width={700}
        visible={visible}
        isConfirmBtn={false}
        isCancelBtn={false}>
        <Result
          icon={<img width={200} src="/assets/icons/success.svg" alt="" />}
          status="success"
          title={title}
          subTitle={subTitle}
          extra={[
            goToDetailUrl && (
              <Button type="primary" onClick={pushToDetail}>
                Đi tới chi tiết
              </Button>
            ),
            <Button onClick={postToHomePage}>Trở về trang chủ</Button>,
          ]}
        />
      </ModalPopup>
    </div>
  );
};

export default memo(SuccessModal);
