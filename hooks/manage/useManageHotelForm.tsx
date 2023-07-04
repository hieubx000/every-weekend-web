import { useState, useCallback, useEffect } from "react";

import { Form } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import { Address } from "@/types/common";
import { handleError } from "@/utils/helper";
import { getAllDestinationApi } from "@/pages/api/services/destination";

const useManageHotelForm = () => {
  const [isAddAddressModal, setIsAddAddressModal] = useState(false);
  const [pictureCertificate, setPictureCertificate] = useState<string[]>([]);
  const [gatheringPlace, setGatheringPlace] = useState<Address[]>([]);
  const [form] = Form.useForm();

  const [destinations, setDestinations] = useState([]);

  const getDestinationData = useCallback(async () => {
    try {
      const response = await getAllDestinationApi();
      const data: any = [];
      response.data.data.map((item: any) => {
        data.push({
          id: item._id,
          title: item.title,
        });
      });
      setDestinations(data);
    } catch (error) {
      handleError(error);
    }
  }, []);

  useEffect(() => {
    getDestinationData();
  }, []);

  const handleAddPictureCertificate = (imgUrl: string) => {
    setPictureCertificate([...pictureCertificate, imgUrl]);
  };

  const handlePostAddress = async (data: any) => {
    form.setFieldsValue({ address: [...gatheringPlace, data] });
    setGatheringPlace([...gatheringPlace, data]);
  };

  const renderAddress = gatheringPlace.map((address: any, index: number) => (
    <div key={index}>
      <span>
        {index + 1}. {address.address}
      </span>
      <DeleteTwoTone
        onClick={() => {
          form.setFieldsValue({
            address: gatheringPlace.filter(
              (item: any) => item.address !== address.address,
            ),
          });
          setGatheringPlace(
            gatheringPlace.filter(
              (item: any) => item.address !== address.address,
            ),
          );
        }}
        twoToneColor="red"
      />
    </div>
  ));

  return {
    isAddAddressModal,
    setIsAddAddressModal,
    pictureCertificate,
    setPictureCertificate,
    handleAddPictureCertificate,
    form,
    handlePostAddress,
    gatheringPlace,
    renderAddress,
    destinations,
    setGatheringPlace
  };
};

export { useManageHotelForm };
