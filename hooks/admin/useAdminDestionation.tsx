import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useState } from "react";

import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { Space, Tag, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { IBreadcrumb } from "@/components/common/CustomBreadcrumb";
import ActionConfirm from "@/components/common/ActionConfirm";
import { handleError } from "@/utils/helper";
import { deleteBlogApi } from "@/pages/api/services/blog";
import { getAllDestinationApi } from "@/pages/api/services/destination";

interface DataType {
  key: string;
  id: string;
  title: string;
  slug?: string;
  description: string;
  imageUrl: string;
}

const useAdminDestination = () => {
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
      title: "Tên điểm đến",
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
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
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
            onClick={() => router.push(`/admin/destinations/${record.id}`)}
          />
          <ActionConfirm
            title="Xóa địa điểm"
            description="Bạn chắc chắn muốn xóa địa điểm này?"
            handleConfirm={handleDeleteBlog.bind(this, record.id)}>
            <MdDeleteOutline size={20} className="hover" />
          </ActionConfirm>
        </Space>
      ),
    },
  ];

  const getData = useCallback(async () => {
    try {
      const response = await getAllDestinationApi();

      const data: DataType[] = [];
      response.data.data.map((item: any) => {
        data.push({
          key: item._id,
          id: item._id,
          title: item.title,
          description: item.description,
          imageUrl: item.imageUrl,
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

  const pushToCreateDestination = useCallback(() => {
    router.push("/admin/destinations/new");
  }, []);

  const breadcrumbItems: IBreadcrumb[] = [
    {
      id: "1",
      name: "Admin",
      url: "/admin/accounts",
    },
    {
      id: "2",
      name: "điểm đến",
      url: "/admin/destinations",
    },
  ];

  return { breadcrumbItems, tableColumns, tableData, pushToCreateDestination };
};

export { useAdminDestination };
