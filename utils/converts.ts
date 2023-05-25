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

export const numberFormatter = (value: number) => {
  const numberFormatter = Intl.NumberFormat("en-US");
  const formatted = numberFormatter.format(value);

  return formatted;
};
