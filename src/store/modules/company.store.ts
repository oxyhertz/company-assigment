import type { Module, Commit, Getter } from "vuex/types/index.js";
import { companyService } from "@/services/company/company.service.local";
import type { Company, CompanySummary } from "@/types/company/company";
import type { RootState } from "@/store";

export interface CompanyState {
  companies: CompanySummary[];
  currentCompany: Company | null;
}

export const companyStore: Module<CompanyState, RootState> = {
  namespaced: true,
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
  },
  actions: {
    async loadCompanies({ commit }) {
      try {
        const companies: CompanySummary[] = await companyService.query();
        commit("setCompanyPreviews", { companies });
      } catch (err) {
        console.log("companyStore: Error in loadCompanyPreviews", err);
        throw err;
      }
    },
    async loadCompany({ commit }, { companyId: string }) {
      try {
        const company: Company = await companyService.getById(companyId);
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
