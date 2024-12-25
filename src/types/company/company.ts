import { Department } from "./department";
import { Employee } from "./employee";

export interface Company {
  _id: string;
  name: string;
  departments: Department[];
  employees: Employee[];
}

export interface CompanySummary {
  _id: string;
  name: string;
}
export type CompanyToSave = Omit<Company, "_id">;
