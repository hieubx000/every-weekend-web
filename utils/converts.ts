import { provinceList } from "@/public/assets/data/intData";
import { Role } from "@/types/commonTypes";
import moment from "moment";
import { dateFormat } from "./patterns";
import { blogCategory, statusList, vehicleList } from "./initData";
import { SelectProps } from "antd";

export const convertRoleEnumToName = (role?: Role) => {
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

export const convertDatePickerToEndDate = (date: any) => {
  return moment(date.$d).format("DD-MM-YYYY");
};
export const convertDatePickerToEndDateTimestamp = (date: any) => {
  return parseInt(moment(moment(date.$d).format("YYYY-MM-DD")).format("X"));
};

export const convertIso8061ToDate = (date: any) => {
  return moment(date).format(dateFormat);
};

export const convertIso8061ToDateTime = (date: any) => {
  return moment(date).format("HH:mm - DD/MM/YYYY");
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

export const convertEnumToStatus = (number: number) => {
  const res =
    number > 0
      ? statusList.find((item) => {
          return item.id === number;
        })
      : statusList.find((item) => {
          return item.id === 1;
        });

  return res?.name;
};

export const convertEnumStatusToColorTag = (number: number) => {
  switch (number) {
    case 1:
      return "processing";
    case 2:
      return "success";
    case 3:
      return "error";
    case 4:
      return "default";
    default:
      return "processing";
  }
};

export const convertEnumToVehicle = (number: string) => {
  const res = vehicleList.find((item: SelectProps) => {
    return item.value === number;
  });

  return res?.label;
};

export const convertEnumToCategory = (number: number) => {
  const res = blogCategory.find((item) => {
    return item.id === number;
  });

  return res?.name;
};

const getDayOfTimeStampRange = (start: number, end: number) => {
  const d1 = new Date(start);
  const d2 = new Date(end);
  let ms1 = d1.getTime();
  let ms2 = d2.getTime();

  return Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000));
};
