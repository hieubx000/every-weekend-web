import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useState } from "react";

import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { Space, Tag, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { IBreadcrumb } from "@/components/common/CustomBreadcrumb";
import { Destination, User } from "@/types/common";
import { deleteTourApi, getAllTourApi } from "@/api/services/tour";
import { handleError } from "@/utils/helper";
import {
  convertEnumToProvince,
  convertTimestampToDate,
} from "@/utils/converts";
import useUserProfile from "../useUserProfile";
import ActionConfirm from "@/components/common/ActionConfirm";

interface DataType {
  key: string;
  id: string;
  title: string;
  fromDestination: number;
  toDestination: Destination;
  maxSlot: number;
  numOfDays: number;
  fromDate: number;
  createdBy: User;
}

const useManageTour = () => {
  const router = useRouter();
  const [tableData, setTableData] = useState<DataType[]>([]);
  const { userProfile } = useUserProfile();

  const handleDeleteTour = useCallback(async (id: string) => {
    try {
      await deleteTourApi(id);
      getData();
      message.success("Xóa tour thành công");
    } catch (error) {
      message.error("Xóa tour thất bại");
    }
  }, []);

  const tableColumns: ColumnsType<DataType> = [
    {
      title: "Tên Tour",
      dataIndex: "title",
      key: "title",
      render: (text) => <p>{text}</p>,
      ellipsis: true,
    },
    {
      title: "Điểm khởi hành",
      dataIndex: "fromDestination",
      key: "fromDestination",
      render: (text) => <p>{convertEnumToProvince(text)}</p>,
      ellipsis: true,
    },
    {
      title: "Điểm đến",
      dataIndex: "toDestination",
      key: "toDestination",
      render: (text: Destination) => <p>{text.title}</p>,
      ellipsis: true,
    },
    {
      title: "Số du khách",
      dataIndex: "maxSlot",
      key: "maxSlot",
      render: (text) => <p>{text}</p>,
      ellipsis: true,
    },
    {
      title: "Số ngày",
      dataIndex: "numOfDays",
      key: "numOfDays",
      render: (text) => <p>{text}</p>,
      ellipsis: true,
    },
    {
      title: "Ngày xuất phát",
      dataIndex: "fromDate",
      key: "fromDate",
      render: (text) => <p>{convertTimestampToDate(text)}</p>,
      ellipsis: true,
    },
    {
      title: "Tạo bởi",
      dataIndex: "createdBy",
      key: "createdBy",
      render: (text: User) => <p>{text.name}</p>,
      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <MdOutlineModeEdit
            className="hover"
            onClick={() => {
              router.push(`/manage/tours/${record.id}`);
            }}
            size={20}
          />
          <ActionConfirm
            title="Xóa tour"
            description="Bạn chắc chắn muốn xóa tour này?"
            handleConfirm={handleDeleteTour.bind(this, record.id)}>
            <MdDeleteOutline size={20} className="hover" />
          </ActionConfirm>
        </Space>
      ),
    },
  ];

  const getData = useCallback(async () => {
    try {
      const response = await getAllTourApi({ createdBy: userProfile?.id });
      const data: DataType[] = [];
      response.data.data.map((item: any) => {
        data.push({
          key: item._id,
          id: item._id,
          title: item.title,
          fromDestination: item.fromDestination,
          toDestination: item.toDestination,
          maxSlot: item.maxSlot,
          numOfDays: item.numOfDays,
          fromDate: item.fromDate,
          createdBy: item.createdBy,
        });
      });
      setTableData(data);
    } catch (error) {
      handleError(error);
    }
  }, [userProfile]);

  useEffect(() => {
    getData();
  }, [userProfile]);

  const pushToCreateTour = useCallback(() => {
    router.push("/manage/tours/new");
  }, []);

  const breadcrumbItems: IBreadcrumb[] = [
    {
      id: "1",
      name: "Manage",
      url: "/manage/tours",
    },
    {
      id: "2",
      name: "Tour",
      url: "/manage/tours",
    },
  ];

  return { breadcrumbItems, tableColumns, tableData, pushToCreateTour };
};

export { useManageTour };
