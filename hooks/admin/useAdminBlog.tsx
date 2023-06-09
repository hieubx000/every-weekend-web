import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useState } from "react";

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
import { User } from "@/types/common";

interface DataType {
  key: string;
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  summary: string;
  content: number;
  status: number;
  createdBy: string;
}

const useAdminBlog = () => {
  const [tableData, setTableData] = useState<DataType[]>([]);
  const router = useRouter();

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
      render: (urls) => <img width={100} src={urls} alt="" />,
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
      title: "Người tạo",
      dataIndex: "createdBy",
      key: "createdBy",
      render: (text) => <p>{text}</p>,
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
            onClick={() => router.push(`/admin/blogs/${record.id}`)}
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
      const response = await getAllBlogApi();

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
          createdBy: item.createdBy.name,
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

  const pushToCreateBlog = useCallback(() => {
    router.push("/admin/blogs/new");
  }, []);

  const breadcrumbItems: IBreadcrumb[] = [
    {
      id: "1",
      name: "Admin",
      url: "/admin/accounts",
    },
    {
      id: "2",
      name: "blogs",
      url: "/admin/blogs",
    },
  ];

  return { breadcrumbItems, tableColumns, tableData, pushToCreateBlog };
};

export { useAdminBlog };
