import type { Module, Commit, Getter } from "vuex/types/index.js";
import { companyService } from "@/services/company/company.service.local";
import type { Company, CompanySummary } from "@/types/company/company";
import type { RootState } from "@/store";
import { Department, DepartmentToSave } from "@/types/company/department";
import { makeId } from "@/services/util.service";
import { Employee, EmployeeToSave } from "@/types/company/employee";
export interface CompanyState {
  companies: CompanySummary[];
  currentCompany: Company | null;
}

export const companyStore: Module<CompanyState, RootState> = {
  state: {
    companies: [],
    currentCompany: null,
  },
  getters: {
    companies(state) {
      return state.companies;
    },
    currentCompany(state) {
      return state.currentCompany;
    },
  },
  mutations: {
    setCompanies(state, payload: { companies: CompanySummary[] }) {
      state.companies = payload.companies;
    },
    setCurrentCompany(state, payload: { company: Company | null }) {
      state.currentCompany = payload.company;
    },
    removeDepartment(state, payload: { departmentId: string }) {
      const departmentId = payload.departmentId;
      if (state.currentCompany) {
        state.currentCompany.departments =
          state.currentCompany.departments.filter(
            (department) => department._id !== departmentId
          );
      }
    },
    addDepartment(state, payload: { department: Department }) {
      const department = payload.department;
      if (state.currentCompany) {
        state.currentCompany.departments.push(department);
      }
    },
    moveToDepartment(
      state,
      {
        departmentId,
        moveToDepartmentId,
      }: { departmentId: string; moveToDepartmentId: string }
    ) {
      if (state.currentCompany) {
        state.currentCompany.employees.forEach((employee) => {
          if (employee.depId === departmentId) {
            employee.depId = moveToDepartmentId;
          }
        });
      }
    },
    removeEmployee(state, payload: { employeeId: string }) {
      const employeeId = payload.employeeId;
      if (state.currentCompany) {
        state.currentCompany.employees = state.currentCompany.employees.filter(
          (employee) => employee._id !== employeeId
        );
      }
    },
    addEmployee(state, payload: { employee: Employee }) {
      const employee = payload.employee;
      if (state.currentCompany) {
        state.currentCompany.employees.push(employee);
      }
    },
  },
  actions: {
    async removeEmployee(
      { commit, getters },
      { employeeId }: { employeeId: string }
    ) {
      commit("removeEmployee", { employeeId });

      try {
        const companyToUpdate = getters.currentCompany;
        if (companyToUpdate) {
          await companyService.save(companyToUpdate);
        }
      } catch (error) {
        console.log("companyStore: Error in removeEmployee", error);
        throw error;
      }
    },
    async addEmployee(
      { commit, getters },
      { employee }: { employee: EmployeeToSave }
    ) {
      const employeeWithId: Employee = { ...employee, _id: makeId() };
      commit("addEmployee", { employee: employeeWithId });

      try {
        const companyToUpdate = getters.currentCompany;
        if (companyToUpdate) {
          await companyService.save(companyToUpdate);
        }
      } catch (error) {
        console.log("companyStore: Error in addEmployee", error);
        throw error;
      }
    },
    async removeDepartment(
      { commit, getters },
      {
        departmentId,
        moveToDepartmentId,
      }: { departmentId: string; moveToDepartmentId: null | string }
    ) {
      if (moveToDepartmentId) {
        const companyToUpdate = getters.currentCompany;
        if (companyToUpdate) {
          commit("moveToDepartment", { departmentId, moveToDepartmentId });
        }
      }
      commit("removeDepartment", { departmentId });

      try {
        const companyToUpdate = getters.currentCompany;

        if (companyToUpdate) {
          await companyService.save(companyToUpdate);
        }
      } catch (error) {
        console.log("companyStore: Error in removeDepartment", error);
        throw error;
      }
    },
    async addDepartment(
      { commit, getters },
      { department }: { department: DepartmentToSave }
    ) {
      const DepartmentToSave = { ...department, _id: makeId() };
      commit("addDepartment", { department: DepartmentToSave });
      try {
        const companyToUpdate = getters.currentCompany;
        if (companyToUpdate) {
          await companyService.save(companyToUpdate);
        }
      } catch (error) {
        console.log("companyStore: Error in addDepartment", error);
        throw error;
      }
    },
    async loadCompanies({ commit }) {
      try {
        const companies: CompanySummary[] = await companyService.query();
        commit("setCompanies", { companies });
      } catch (err) {
        console.log("companyStore: Error in loadCompanyPreviews", err);
        throw err;
      }
    },
    async loadCompany({ commit }, { companyId }: { companyId: string }) {
      console.log("🚀 ~ loadCompany ~ companyId:", companyId);
      try {
        const company: Company = await companyService.getById(companyId);
        console.log("🚀 ~ loadCompany ~ company:", company);
        commit("setCurrentCompany", { company: company || null });
      } catch (err) {
        console.log("companyStore: Error in loadCompanyById", err);
        throw err;
      }
    },
    async updateCompany(
      { commit },
      { companyToUpdate }: { companyToUpdate: Company }
    ) {
      try {
        const updatedCompany: Company = await companyService.save(
          companyToUpdate
        );
        commit("updateCompany", { company: updatedCompany });
        return updatedCompany;
      } catch (err) {
        console.log("companyStore: Error in updateCompany", err);
        throw err;
      }
    },
  },
};
