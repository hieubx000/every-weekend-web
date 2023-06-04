import { Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useRouter } from "next/router";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { FC, useCallback, useEffect, useState } from "react";
import { IBreadcrumb } from "@/components/common/CustomBreadcrumb";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const useManageTour = () => {
  const router = useRouter();

  const tableColumns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.name.length - b.name.length,
      ellipsis: true,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      sorter: (a, b) => a.address.length - b.address.length,
      ellipsis: true,
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <MdOutlineModeEdit
            onClick={() => {
              router.push(`/manage/tours/${record.key}`);
            }}
            size={20}
          />
          <MdDeleteOutline size={20} />
        </Space>
      ),
    },
  ];

  const tableData: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

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
