import { FC, memo, useState, useEffect } from "react";

import styles from "./style.module.scss";
import MainHeader from "@/components/common/MainHeader";
import SupplierSidebar from "@/components/common/SupplierSidebar";
import Loading from "@/components/common/Loading";
import { Layout } from "antd";
import CustomBreadcrumb, {
  IBreadcrumb,
} from "@/components/common/CustomBreadcrumb";
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem";
import useUserProfile from "@/hooks/useUserProfile";
import AuthHeader from "@/components/common/AuthHeader";

type Props = {
  children: React.ReactNode;
  breadcrumbItems?: IBreadcrumb[];
};

const SupplierLayout: FC<Props> = ({ children, breadcrumbItems }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { userToken } = useUserProfile();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className={styles.container}>
      {userToken ? <MainHeader /> : <AuthHeader />}
      <div className={styles.content}>
        <SupplierSidebar />
        <div className={styles.content_children}>
          {isLoading ? (
            <Loading />
          ) : (
            <Layout className={styles.layout}>
              {breadcrumbItems && <CustomBreadcrumb items={breadcrumbItems} />}
              <div className={styles.layout_content}>{children}</div>
            </Layout>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(SupplierLayout);
