import { useState, useEffect, useRef } from "react";

import { Form, InputRef, SelectProps, theme } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import { Address } from "@/types/common";

const useManageTourForm = () => {
  const [isAddAddressModal, setIsAddAddressModal] = useState(false);
  const [pictureCertificate, setPictureCertificate] = useState<string[]>([]);
  const [gatheringPlace, setGatheringPlace] = useState<Address[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputTagIndex, setEditInputTagIndex] = useState(-1);
  const [editInputTagValue, setEditInputTagValue] = useState("");
  const inputRef = useRef<InputRef>(null);
  const editInputTagRef = useRef<InputRef>(null);
  const [form] = Form.useForm();

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

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputTagRef.current?.focus();
  }, [inputValue]);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputTagValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputTagIndex] = editInputTagValue;
    setTags(newTags);
    setEditInputTagIndex(-1);
    setInputValue("");
  };

  return {
    isAddAddressModal,
    setIsAddAddressModal,
    pictureCertificate,
    setPictureCertificate,
    handleAddPictureCertificate,
    gatheringPlace,
    setGatheringPlace,
    handlePostAddress,
    form,
    tags,
    setTags,
    editInputTagIndex,
    setEditInputTagIndex,
    editInputTagRef,
    editInputTagValue,
    handleEditInputConfirm,
    handleEditInputChange,
    handleClose,
    setEditInputTagValue,
    inputVisible,
    inputRef,
    showInput,
    inputValue,
    handleInputChange,
    handleInputConfirm,
    renderAddress,
  };
};

export { useManageTourForm };
