import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import CompanyIndex from "@/views/CompanyIndex.vue";
import DepartmentTable from "@/components/company/DepartmentTable.vue";
import EmployeeTable from "@/components/company/EmployeeTable.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/company/:companyId",
      component: CompanyIndex,
      children: [
        {
          path: "",
          component: DepartmentTable,
        },
        {
          path: "employee",
          component: EmployeeTable,
        },
      ],
    },
  ],
});

export default router;
