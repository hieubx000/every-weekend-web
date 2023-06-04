import { FC, memo, useEffect, useState } from "react";

import styles from "./style.module.scss";
import SupplierLayout from "@/components/layouts/SupplierLayout";
import {
  Breadcrumb,
  Button,
  Layout,
  Space,
  Tag,
  Table,
  Input,
  Spin,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { ColumnsType } from "antd/es/table";
import TourModal from "@/modules/Modal/TourModal";
import { MdOutlineModeEdit, MdDeleteOutline } from "react-icons/md";
import { useRouter } from "next/router";
const { Search } = Input;
type Props = {};

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const data: DataType[] = [
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

const ManageHotels: FC<Props> = ({}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
const router = useRouter()
  const columns: ColumnsType<DataType> = [
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

  const showModal = () => {
    // setIsModalOpen(true);
    router.push('/manage/tours/new')
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <SupplierLayout>
        <Layout className={styles.container}>
          <Breadcrumb className={styles.breadcrumb}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div className={styles.content}>
            <div className={styles.content_top}>
              <Button type="primary" shape="round" onClick={showModal}>
                Thêm mới
              </Button>
              <Search
                placeholder="Tìm kiếm..."
                allowClear
                onSearch={() => {}}
                style={{ width: 300 }}
              />
            </div>
            <Table columns={columns} dataSource={data} />
            <Button type="dashed" block onClick={showModal}>
              Thêm mới
            </Button>

            <TourModal
              isModalOpen={isModalOpen}
              handleOk={handleOk}
              handleCancel={handleCancel}
            />
          </div>
        </Layout>
    </SupplierLayout>
  );
};

export default memo(ManageHotels);
