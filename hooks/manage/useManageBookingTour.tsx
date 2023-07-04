import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useMemo, useState } from "react";

import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { Button, Select, Space, Tag, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { IBreadcrumb } from "@/components/common/CustomBreadcrumb";
import { deleteUserApi, getListAccountApi } from "@/api/services/auth";
import {
  convertEnumStatusToColorTag,
  convertEnumToStatus,
  convertIso8061ToDateTime,
  convertTimestampToDate,
} from "@/utils/converts";
import ActionConfirm from "@/components/common/ActionConfirm";
import { handleError } from "@/utils/helper";
import { deleteBlogApi, getAllBlogApi } from "@/api/services/blog";
import useUserProfile from "../useUserProfile";
import {
  changeStatusBookTourApi,
  getAllBookingTourApi,
} from "@/api/services/booking-tour";
import { BookingTour } from "@/types/api/booking-tour";
import { ITour } from "@/types/services/tour";
import { Role } from "@/types/commonTypes";
import { statusList } from "@/utils/initData";

interface DataType extends BookingTour.BookingTourDataPayload {
  _id: string;
  id: string;
  key: string;
}

const useManageBookingTour = () => {
  const [tableData, setTableData] = useState<DataType[]>([]);
  const router = useRouter();
  const { userProfile, userRole } = useUserProfile();

  const isCustomer = useMemo(() => {
    return router.pathname === "/my-blog";
  }, [router]);

  console.log(userRole);

  const handleChangeStatus = useCallback(
    async (id: string, status: number, data: DataType) => {
      try {
        await changeStatusBookTourApi(id, { ...data, status: status });
        message.success("Hủy đăng ký thành công");
        getData();
      } catch (error) {
        message.error("Hủy đăng ký thất bại");
      }
    },
    [],
  );

  const tableColumns: ColumnsType<DataType> = [
    {
      title: "Tên tour",
      dataIndex: "tour",
      key: "tour",
      render: (text: ITour) => (
        <a href={`/services/tours/${text.slug}`}>{text.title}</a>
      ),
      ellipsis: true,
    },
    {
      title: "Banner",
      dataIndex: "tour",
      key: "tour",
      render: (urls: ITour) => (
        <img width={100} src={urls.imageUrl[0]} alt="" />
      ),
      ellipsis: true,
    },
    {
      title: "Số người",
      dataIndex: "totalCustomer",
      key: "totalCustomer",
      render: (text) => <p>{text}</p>,
      ellipsis: true,
    },
    {
      title: "Ngày đi",
      dataIndex: "tour",
      key: "tour",
      render: (text: ITour) => <p>{convertTimestampToDate(text.fromDate)}</p>,
      ellipsis: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={convertEnumStatusToColorTag(status)}>
          {convertEnumToStatus(status)}
        </Tag>
      ),
      ellipsis: true,
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (time) => <p>{convertIso8061ToDateTime(time)}</p>,
      ellipsis: true,
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {userRole === Role.customer && record.status !== 4 ? (
            <Button
              style={{ margin: 0 }}
              onClick={async () => {
                handleChangeStatus(record._id, 4, record);
              }}>
              Hủy đăng ký
            </Button>
          ) : undefined}
          {userRole === Role.supplier ? (
            <Select
              onChange={(e) => handleChangeStatus(record._id, e, record)}
              value={record.status}
              style={{ width: 150 }}
              options={statusList.map((item) => {
                return { label: item.name, value: item.id };
              })}
            />
          ) : undefined}
        </Space>
      ),
    },
  ];

  const getData = useCallback(async () => {
    try {
      const response = await getAllBookingTourApi();
      setTableData(response.data.data);
    } catch (error) {
      handleError(error);
    }
  }, [userProfile]);

  useEffect(() => {
    getData();
  }, [userProfile]);

  const breadcrumbItems: IBreadcrumb[] = [
    {
      id: "1",
      name: "Manage",
      url: "/manage/tours",
    },
    {
      id: "2",
      name: "Booking Tour",
      url: "/manage/booking-tour",
    },
  ];

  return { breadcrumbItems, tableColumns, tableData };
};

export { useManageBookingTour };
