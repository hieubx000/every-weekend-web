import { useState, useEffect, useRef } from "react";

import { Form, InputRef, SelectProps, theme } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";

const useManageTourForm = () => {
  const [isAddAddressModal, setIsAddAddressModal] = useState(false);
  const [pictureCertificate, setPictureCertificate] = useState<string[]>([]);
  const [convetratePlace, setConvetratePlace] = useState<any>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputTagIndex, setEditInputTagIndex] = useState(-1);
  const [editInputTagValue, setEditInputTagValue] = useState("");
  const inputRef = useRef<InputRef>(null);
  const editInputTagRef = useRef<InputRef>(null);
  const [form] = Form.useForm();

  const options: SelectProps["options"] = [
    { label: "Máy bay", value: "may_bay" },
    { label: "Tàu hỏa", value: "tau_hoa" },
    { label: "Xe khách", value: "xe_khach" },
  ];

  const handleAddPictureCertificate = (imgUrl: string) => {
    setPictureCertificate([...pictureCertificate, imgUrl]);
  };

  const handlePostAddress = async (data: any) => {
    form.setFieldsValue({ address: [...convetratePlace, data] });
    setConvetratePlace([...convetratePlace, data]);

    console.log(convetratePlace);
  };

  const renderAddress = convetratePlace.map((address: any, index: number) => (
    <div key={index}>
      <span>
        {index + 1}. {address.address}
      </span>
      <DeleteTwoTone
        onClick={() => {
          form.setFieldsValue({
            address: convetratePlace.filter(
              (item: any) => item.address !== address.address,
            ),
          });
          setConvetratePlace(
            convetratePlace.filter(
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
    convetratePlace,
    setConvetratePlace,
    handlePostAddress,
    form,
    options,
    tags,
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
