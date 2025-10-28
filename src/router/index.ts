import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "../stores/auth";

import Login from "../pages/Login.vue";
import Dashboard from "../pages/Dashboard.vue";
import Employees from "../pages/Employees.vue";
import Companies from "../pages/Companies.vue";
import EmployeeDetail from "../pages/EmployeeDetail.vue";
import WorkSchedules from "../pages/WorkSchedules.vue";
import PTOForms from "../pages/PTOForms.vue";
import SalaryTax from "../pages/SalaryTax.vue";
import Reports from "../pages/Reports.vue";
import AuditLog from "../pages/AuditLog.vue";
import Settings from "../pages/Settings.vue";
import ComponentsDemo from "../pages/components-demo.vue";
import WorkingHoursView from "@/pages/WorkingHoursView.vue";

const routes = [
  { path: "/login", component: Login, meta: { public: true } },
  { path: "/", redirect: "/dashboard" },
  { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
  {
    path: "/companies",
    component: Companies,
    meta: { requiresAuth: true, roles: ["admin"] },
  },
  {
    path: "/employees",
    component: Employees,
    meta: { requiresAuth: true, roles: ["admin", "manager"] },
  },
  {
    path: "/employees/:code",
    name: "employee-detail",
    component: EmployeeDetail,
    props: true,
    meta: { requiresAuth: true, roles: ["admin", "manager", "viewer"] },
  },
  {
    path: "/schedules",
    component: WorkSchedules,
    meta: { requiresAuth: true, roles: ["admin", "manager"] },
  },
  {
    path: "/pto",
    component: PTOForms,
    meta: { requiresAuth: true, roles: ["admin", "manager", "viewer"] },
  },
  {
    path: "/salary-tax",
    component: SalaryTax,
    meta: { requiresAuth: true, roles: ["admin"] },
  },
  {
    path: "/reports",
    component: Reports,
    meta: { requiresAuth: true, roles: ["admin", "manager"] },
  },
  {
    path: "/audit",
    component: AuditLog,
    meta: { requiresAuth: true, roles: ["admin"] },
  },
  {
    path: "/settings",
    component: Settings,
    meta: { requiresAuth: true, roles: ["admin"] },
  },
  {
    path: "/working-hour",
    component: WorkingHoursView,
    meta: { requiresAuth: true, roles: ["admin"] },
  },
  {
    path: "/components-demo",
    component: ComponentsDemo,
    meta: { public: true },
  },
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to, from, next) => {
  const auth = useAuth();
  if (to.meta.public) return next();

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next({ path: "/login", query: { redirect: to.fullPath } });
  }
  if (to.meta.roles && !auth.hasRole(to.meta.roles as string[])) {
    return next({ path: "/dashboard" });
  }
  next();
});

export default router;
