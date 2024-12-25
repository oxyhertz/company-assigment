import { Department, DepartmentToSave } from "@/types/company/department";
import { storageService } from "../async-storage.service";
import {
  Company,
  CompanyToSave,
  CompanySummary,
} from "@/types/company/company";
import { EmployeeToSave } from "@/types/company/employee";

const STORAGE_KEY = "company";

export const companyService = {
  query,
  getById,
  save,
  remove,
  getEmptyDepartment,
  getEmptyEmployee,
};

async function query(): Promise<CompanySummary[]> {
  let companies: Company[] = await storageService.query<Company>(STORAGE_KEY);
  console.log("🚀 ~ query ~ companies:", companies);
  if (!companies.length) {
    companies = await generateDemoCompanyData();
    console.log("🚀 ~ query ~ companies:", companies);
  }
  //return light version of companies
  return companies.map((company) => ({ _id: company._id, name: company.name }));
}

function getById(companyId: string): Promise<Company> {
  return storageService.get<Company>(STORAGE_KEY, companyId);
}

async function remove(companyId: string): Promise<void> {
  await storageService.remove(STORAGE_KEY, companyId);
}

async function save(company: Company): Promise<Company> {
  if (company._id) {
    return await storageService.put<Company>(STORAGE_KEY, company);
  } else {
    const companyToSave: CompanyToSave = {
      name: company.name,
      departments: company.departments,
      employees: company.employees,
    };
    return await storageService.post<Company>(STORAGE_KEY, companyToSave);
  }
}

function getEmptyDepartment(): DepartmentToSave {
  return {
    name: "",
    description: "",
  };
}

function getEmptyEmployee(): EmployeeToSave {
  return {
    name: "",
    role: "",
    depId: "",
    joinedAt: Date.now(),
  };
}

async function generateDemoCompanyData() {
  const initialCompanies: Company[] = [
    {
      _id: "c101fdsg33",
      name: "StoxProx",
      departments: [
        {
          _id: "mag23fdsg33",
          name: "Management",
          description: "The management department",
        },
        {
          _id: "mag24fdsg33",
          name: "Development",
          description: "The development department",
        },
      ],
      employees: [
        {
          _id: "4tteerfdsg33",
          name: "John Doe",
          role: "Manager",
          depId: "mag23fdsg33",
          joinedAt: 1577836800000,
        },
        {
          _id: "4tteedfdsg33",
          name: "Jane Doe",
          role: "Developer",
          depId: "mag24fdsg33",
          joinedAt: 1577836800000,
        },
      ],
    },
    {
      _id: "c102mal90",
      name: "Marmelada",
      departments: [
        {
          _id: "mal90mal90",
          name: "Management",
          description: "The management department",
        },
        {
          _id: "mal91mal90",
          name: "Development",
          description: "The development department",
        },
      ],
      employees: [
        {
          _id: "4ttdermal90",
          name: "Alice",
          role: "Manager",
          depId: "mal90mal90",
          joinedAt: 1577836800000,
        },
        {
          _id: "4pteermal90",
          name: "Bob",
          role: "Developer",
          depId: "mal91mal90",
          joinedAt: 1577836800000,
        },
      ],
    },
    {
      _id: "c103tnc123456",
      name: "TechNova",
      departments: [
        {
          _id: "tnc101tnc123456",
          name: "Marketing",
          description: "The marketing department",
        },
        {
          _id: "tnc102tnc123456",
          name: "Sales",
          description: "The sales department",
        },
      ],
      employees: [
        {
          _id: "5tttertnc123456",
          name: "Charlie",
          role: "Marketing Manager",
          depId: "tnc101tnc123456",
          joinedAt: 1609459200000,
        },
        {
          _id: "5pttertnc123456",
          name: "Dave",
          role: "Sales Executive",
          depId: "tnc102tnc123456",
          joinedAt: 1609459200000,
        },
      ],
    },
  ];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCompanies));

  return initialCompanies;
}
