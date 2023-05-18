import { Role } from "@/types/common";

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
