import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useState } from "react";

import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { IBreadcrumb } from "@/components/common/CustomBreadcrumb";
import { handleError } from "@/utils/helper";
import { getListAccountApi } from "@/api/services/auth";
import {
  convertEnumToProvince,
  convertTimestampToDate,
} from "@/utils/converts";

interface DataType {
  key: string;
  id: string;
  avatar: string;
  name: number;
  userName: string;
  birthday: number;
  phoneNumber: number;
  email: string;
  address: number;
}

const useAdminAccounts = () => {
  const [tableData, setTableData] = useState<DataType[]>([]);
  const router = useRouter();

  const tableColumns: ColumnsType<DataType> = [
    {
      title: "Ảnh đại diện",
      dataIndex: "avatar",
      key: "avatar",
      render: (urls) => <img width={50} src={urls} alt="" />,
      ellipsis: true,
    },
    {
      title: "Họ Tên",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
      ellipsis: true,
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "userName",
      key: "userName",
      render: (text) => <b>{text}</b>,
      ellipsis: true,
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      key: "birthday",
      render: (value) => <p>{convertTimestampToDate(value)}</p>,
      ellipsis: true,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (text) => <a>{text}</a>,
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <a>{text}</a>,
      ellipsis: true,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      render: (text) => <p>{convertEnumToProvince(text)}</p>,
      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <MdOutlineModeEdit
            onClick={() => {
              //   router.push(`/manage/tours/${record.key}`);
            }}
            size={20}
          />
          <MdDeleteOutline size={20} />
        </Space>
      ),
    },
  ];

  const getData = useCallback(async () => {
    try {
      const response = await getListAccountApi();
      const data: DataType[] = [];
      response.data.data.map((item: any) => {
        data.push({
          key: item.id,
          id: item.id,
          avatar: item.avatar,
          name: item.name,
          userName: item.userName,
          birthday: item.birthday,
          phoneNumber: item.phoneNumber,
          email: item.email,
          address: item.address,
        });
      });
      setTableData(data);
    } catch (error) {
      handleError(error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const breadcrumbItems: IBreadcrumb[] = [
    {
      id: "1",
      name: "Admin",
      url: "/admin/accounts",
    },
    {
      id: "2",
      name: "Tour",
      url: "/admin/accounts",
    },
  ];

  return { breadcrumbItems, tableColumns, tableData };
};

export { useAdminAccounts };
