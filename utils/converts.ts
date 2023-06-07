import { provinceList } from "@/public/assets/data/intData";
import { Role } from "@/types/common";
import moment from "moment";

export const convertRoleEnumToName = (role: Role) => {
  switch (role) {
    case Role.guest:
      return "Khách vãng lai";
    case Role.customer:
      return "Khách hàng";
    case Role.supplier:
      return "Nhà cung cấp";
    case Role.admin:
      return "Quản trị viên";
  }
};

export const convertTimestampToDate = (timestamp: number) => {
  const date = moment.unix(timestamp).format("DD/MM/YYYY");

  return date;
};

export const convertTimestampToDateTime = (timestamp: number) => {
  const date = moment.unix(timestamp).format("hh:mm - DD/MM/YYYY");

  return date;
};

export const convertTimestampToDateTimeAdded = (
  timestamp: number,
  days: number,
) => {
  const date = moment
    .unix(timestamp)
    .add(days, "days")
    .format("hh:mm - DD/MM/YYYY");

  return date;
};

export const convertDatePickerToTimestamp = (date: any) => {
  return parseInt(moment(date.$d).format("X"));
};

export const numberFormatter = (value: number) => {
  const numberFormatter = Intl.NumberFormat("en-US");
  const formatted = numberFormatter.format(value);

  return formatted;
};

export const convertEnumToProvince = (number: number) => {
  const res = provinceList.find((item) => {
    return item.id === number;
  });
  return res?.name;
};
