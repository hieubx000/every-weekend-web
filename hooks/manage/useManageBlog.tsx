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
  convertTimestampToDate,
} from "@/utils/converts";
import ActionConfirm from "@/components/common/ActionConfirm";
import { handleError } from "@/utils/helper";
import { deleteBlogApi, getAllBlogApi } from "@/api/services/blog";
import useUserProfile from "../useUserProfile";

interface DataType {
  key: string;
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  summary: string;
  content: number;
  status: number;
}

const useManageBlog = () => {
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
      title: "Tên bài viết",
      dataIndex: "title",
      key: "title",
      render: (text) => <b>{text}</b>,
      ellipsis: true,
    },
    {
      title: "Banner",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (urls) => <img width={50} src={urls} alt="" />,
      ellipsis: true,
    },
    {
      title: "Danh mục bài viết",
      dataIndex: "category",
      key: "category",
      render: (text) => <p>{convertEnumToCategory(text)}</p>,
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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <MdOutlineModeEdit
            size={20}
            className="hover"
            onClick={() => router.push(`${router.pathname}/${record.id}`)}
          />
          <ActionConfirm
            title="Xóa bài viết"
            description="Bạn chắc chắn muốn xóa bài viết này?"
            handleConfirm={handleDeleteBlog.bind(this, record.id)}>
            <MdDeleteOutline size={20} className="hover" />
          </ActionConfirm>
        </Space>
      ),
    },
  ];

  const getData = useCallback(async () => {
    try {
      const response = await getAllBlogApi({ createdBy: userProfile?.id });

      const data: DataType[] = [];
      response.data.data.map((item: any) => {
        data.push({
          key: item._id,
          id: item._id,
          title: item.title,
          category: item.category,
          imageUrl: item.imageUrl,
          content: item.content,
          status: item.status,
          summary: item.summary,
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

  const pushToCreateBlog = useCallback(() => {
    router.push("/manage/blogs/new");
  }, []);

  const breadcrumbItems: IBreadcrumb[] = [
    {
      id: "1",
      name: "Manage",
      url: "/manage/tours",
    },
    {
      id: "2",
      name: "Hotels",
      url: "/manage/hotels",
    },
  ];

  return { breadcrumbItems, tableColumns, tableData, pushToCreateBlog };
};

export { useManageBlog };
