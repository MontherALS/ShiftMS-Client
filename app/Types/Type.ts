export type LoginFormData = {
  email: string;
  password: string;
};
export type AddEmployeeFormData = {
  _id?: string;
  name: string;
  phone: string;
  email: string;
  groupId: string;
};

export type EmployeeType = {
  _id?: string;
  name: string;
  phone: string;
  email: string;
  group: GroupWithObjects;
};

export type GroupWithObjects = {
  _id?: string;
  name: string;
  workingDays: string[];
  shiftStart: string;
  shiftEnd: string;
  supervisor: EmployeeType | null;
  employees: EmployeeType[];
  _start?: Date;
  _end?: Date;
};

export type GroupWithIds = {
  _id?: string;
  name: string;
  workingDays: string[];
  shiftStart: string;
  shiftEnd: string;
  supervisor: string;
  employees: string[];
  _start?: Date;
  _end?: Date;
};
