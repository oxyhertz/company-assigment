import { createStore } from "vuex";
import { companyStore } from "@/store/modules/company.store";
import type { CompanyState } from "@/store/modules/company.store";
export interface RootState {
  company: CompanyState;
}

export const store = createStore<RootState>({
  modules: {
    company: companyStore,
  },
});

export default store;
