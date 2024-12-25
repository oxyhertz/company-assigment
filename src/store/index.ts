import { createStore } from "vuex";

export interface RootState {}

export const store = createStore<RootState>({
  modules: {},
});

export default store;
