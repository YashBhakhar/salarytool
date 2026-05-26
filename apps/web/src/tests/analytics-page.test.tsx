import { render, screen } from "@testing-library/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AnalyticsPage from "../modules/analytics/pages/analytics-page";

import * as hooks from "../modules/analytics/hooks/use-analytics";

const queryClient = new QueryClient();

function renderComponent() {
  return render(
    <QueryClientProvider client={queryClient}>
      <AnalyticsPage />
    </QueryClientProvider>
  );
}

describe("Analytics Page", () => {
  beforeEach(() => {
    vi.spyOn(hooks, "useGlobalStats").mockReturnValue({
      data: {
        data: {
          total_employees: 10000,
          avg_salary: 50000,
          min_salary: 10000,
          max_salary: 100000,
        },
      },
      isLoading: false,
    } as any);

    vi.spyOn(hooks, "useCountrySalaryInsights").mockReturnValue({
      data: {
        data: [
          {
            country: "India",
            avg_salary: 50000,
            min_salary: 10000,
            max_salary: 90000,
            employee_count: 2000,
          },
        ],
      },
      isLoading: false,
    } as any);

    vi.spyOn(hooks, "useJobTitleInsights").mockReturnValue({
      data: {
        data: [
          {
            country: "India",
            job_title: "Engineer",
            avg_salary: 60000,
            employee_count: 500,
          },
        ],
      },
      isLoading: false,
    } as any);

    vi.spyOn(hooks, "useDepartmentInsights").mockReturnValue({
      data: {
        data: [
          {
            department: "Engineering",
            employee_count: 500,
            avg_salary: 60000,
          },
        ],
      },
      isLoading: false,
    } as any);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders stats cards", () => {
    renderComponent();

    expect(screen.getByText("Total Employees")).toBeDefined();

    expect(screen.getByText("10000")).toBeDefined();
  });

  it("renders country insights", () => {
    renderComponent();

    expect(screen.getByText("Country Salary Insights")).toBeDefined();

    expect(screen.getByText("India")).toBeDefined();
  });

  it("renders job title insights", () => {
    renderComponent();

    expect(screen.getByText("Job Title Insights")).toBeDefined();

    expect(screen.getByText("Engineer")).toBeDefined();
  });

  it("renders department insights", () => {
    renderComponent();

    expect(screen.getByText("Department Insights")).toBeDefined();

    expect(screen.getByText("Engineering")).toBeDefined();
  });

  it("renders loading state", () => {
    vi.spyOn(hooks, "useGlobalStats").mockReturnValue({
      isLoading: true,
    } as any);

    renderComponent();

    expect(screen.getByText("Loading analytics...")).toBeDefined();
  });
});
