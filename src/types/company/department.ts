export interface Department {
  _id: string;
  name: string;
  description: string;
}
export type DepartmentToSave = Omit<Department, "_id">;

export interface DepartmentFormField {
  label: string;
  key: keyof DepartmentToSave;
  type: string;
  isRequired: boolean;
}
