import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useMemo, useState } from "react";

import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { Space, Tag, message } from "antd";
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

interface DataType extends BookingTour.BookingTourDataPayload {
  id: string;
  key: string;
}

const useManageBookingTour = () => {
  const [tableData, setTableData] = useState<DataType[]>([]);
  const router = useRouter();
  const { userProfile } = useUserProfile();

  const isCustomer = useMemo(() => {
    return router.pathname === "/my-blog";
  }, [router]);

  console.log(isCustomer);

  const handleDeleteBlog = useCallback(async (id: string) => {
    try {
      await deleteBlogApi(id);
      getData();
      message.success("Xóa bài viết thành công");
    } catch (error) {
      message.error("Xóa bài viết thất bại");
    }
  }, []);

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
