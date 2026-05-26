import { render, screen }
  from "@testing-library/react";

import EmployeesPage
  from "../modules/employees/pages/employees-page";
import { TestProvider } from "./test-utils";
describe("Employees Page", () => {
  it("renders add employee button", () => {
    render(
      <TestProvider>
        <EmployeesPage />
      </TestProvider>
    );

    expect(
      screen.getByText("Add Employee")
    ).toBeDefined();
  });
});