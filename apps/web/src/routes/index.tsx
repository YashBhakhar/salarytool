import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import AppLayout
  from "../components/layout/app-layout";

import EmployeesPage
  from "../modules/employees/pages/employees-page";

import AnalyticsPage
  from "../modules/analytics/pages/analytics-page";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<AppLayout />}
        >
          <Route
            index
            element={<EmployeesPage />}
          />

          <Route
            path="analytics"
            element={<AnalyticsPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}