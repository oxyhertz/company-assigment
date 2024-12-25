export interface Employee {
  _id: string;
  name: string;
  role: string;
  depId: string;
  joinedAt: number;
}

export type EmployeeToSave = Omit<Employee, "_id">;

export interface EmployeeFormField {
  label: string;
  key: keyof EmployeeToSave;
  type: string;
  isRequired: boolean;
}
