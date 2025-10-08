export type LoginFormData = {
  email: string;
  password: string;
};

export type EmployeeType = {
  _id?: string;
  name: string;
  phone: string;
  email: string;
  group: GroupType | null;
};
export type GroupType = {
  _id?: string;
  name: string;
  workingDays: string[];
  shiftStart: string;
  shiftEnd: string;
  supervisor: EmployeeType;
  employees: EmployeeType[];
  _start?: Date;
  _end?: Date;
};
