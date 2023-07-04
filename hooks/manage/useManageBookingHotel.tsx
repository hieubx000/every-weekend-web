import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useMemo, useState } from "react";

import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { Button, Select, Space, Tag, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { IBreadcrumb } from "@/components/common/CustomBreadcrumb";
import { deleteUserApi, getListAccountApi } from "@/api/services/auth";
import {
  convertEnumStatusToColorTag,
  convertEnumToCategory,
  convertEnumToProvince,
  convertEnumToStatus,
  convertIso8061ToDate,
  convertIso8061ToDateTime,
  convertTimestampToDate,
} from "@/utils/converts";
import ActionConfirm from "@/components/common/ActionConfirm";
import { handleError } from "@/utils/helper";
import { deleteBlogApi, getAllBlogApi } from "@/api/services/blog";
import useUserProfile from "../useUserProfile";
import { getAllBookingTourApi } from "@/api/services/booking-tour";
import { BookingTour } from "@/types/api/booking-tour";
import { ITour } from "@/types/services/tour";
import { changeStatusBookHotelApi, getAllBookingHotelApi } from "@/api/services/booking-hotel";
import { IHotel } from "@/types/services/hotels";
import { BookingHotel } from "@/types/api/booking-hotel";
import { Role } from "@/types/commonTypes";
import { statusList } from "@/utils/initData";

interface DataType extends BookingHotel.BookingHotelDataPayload {
  id: string;
  _id: string;
  key: string;
}

const useManageBookingHotel = () => {
  const [tableData, setTableData] = useState<DataType[]>([]);
  const router = useRouter();
  const { userProfile, userRole } = useUserProfile();

  const handleChangeStatus = useCallback(
    async (id: string, status: number, data: DataType) => {
      try {
        await changeStatusBookHotelApi(id, { ...data, status: status });
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
      title: "Tên hotel",
      dataIndex: "hotel",
      key: "hotel",
      render: (text: IHotel) => (
        <a href={`/services/hotels/${text?.slug}`}>{text.title}</a>
      ),
      ellipsis: true,
    },
    {
      title: "Banner",
      dataIndex: "hotel",
      key: "hotel",
      render: (text: IHotel) => (
        <img width={100} src={text.imageUrl[0] || ""} alt="" />
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
      title: "Ngày đến",
      dataIndex: "checkIn",
      key: "checkIn",
      render: (text) => <p>{convertTimestampToDate(text)}</p>,
      ellipsis: true,
    },
    {
      title: "Ngày đi",
      dataIndex: "checkOut",
      key: "checkOut",
      render: (text) => <p>{convertTimestampToDate(text)}</p>,
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
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <MdOutlineModeEdit
    //         size={20}
    //         className="hover"
    //         onClick={() => router.push(`${router.pathname}/${record.id}`)}
    //       />
    //       <ActionConfirm
    //         title="Xóa bài viết"
    //         description="Bạn chắc chắn muốn xóa bài viết này?"
    //         handleConfirm={handleDeleteBlog.bind(this, record.id)}>
    //         <MdDeleteOutline size={20} className="hover" />
    //       </ActionConfirm>
    //     </Space>
    //   ),
    // },
  ];

  const getData = useCallback(async () => {
    try {
      const response = await getAllBookingHotelApi();
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
      name: "Booking Hotel",
      url: "/manage/booking-hotel",
    },
  ];

  return { breadcrumbItems, tableColumns, tableData };
};

export { useManageBookingHotel };
