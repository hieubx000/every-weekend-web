import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useState } from "react";

import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { Space, Tag, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { IBreadcrumb } from "@/components/common/CustomBreadcrumb";
import ActionConfirm from "@/components/common/ActionConfirm";
import {
  convertEnumToProvince,
  convertTimestampToDate,
} from "@/utils/converts";
import { Address, Destination, User } from "@/types/common";
import useUserProfile from "../useUserProfile";
import { handleError } from "@/utils/helper";
import { deleteTourApi } from "@/pages/api/services/tour";
import { getAllHotelApi } from "@/pages/api/services/hotel";

interface DataType {
  key: string;
  id: string;
  title: string;
  toDestination: Destination;
  imageUrl: string[];
  address: Address[];
}

const useManageHotel = () => {
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
      title: "Tên khách sạn",
      dataIndex: "title",
      key: "title",
      render: (text) => <p>{text}</p>,
      ellipsis: true,
    },
    {
      title: "Ảnh",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (urls) => <img width={100} src={urls[0]} alt="" />,
      ellipsis: true,
    },
    {
      title: "Vị trí",
      dataIndex: "toDestination",
      key: "toDestination",
      render: (text: Destination) => <p>{text.title}</p>,
      ellipsis: true,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      render: (text: Address[]) => <p>{text[0]?.address}</p>,
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
              router.push(`${router.pathname}/${record.id}`);
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
      const response = await getAllHotelApi({ createdBy: userProfile?.id });

      const data: DataType[] = [];
      response.data.data.map((item: any) => {
        data.push({
          key: item._id,
          id: item._id,
          title: item.title,
          address: item.address,
          imageUrl: item.imageUrl,
          toDestination: item.toDestination,
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

  const pushToCreateHotel = useCallback(() => {
    router.push("/manage/hotels/new");
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

  return { breadcrumbItems, tableColumns, tableData, pushToCreateHotel };
};

export { useManageHotel };
