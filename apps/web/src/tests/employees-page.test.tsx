import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import EmployeesPage from "../modules/employees/pages/employees-page";

import * as hooks from "../modules/employees/hooks/use-employees";

const queryClient = new QueryClient();

function renderComponent() {
  return render(
    <QueryClientProvider client={queryClient}>
      <EmployeesPage />
    </QueryClientProvider>
  );
}

describe("Employees Page", () => {
  beforeEach(() => {
    vi.spyOn(hooks, "useEmployees").mockReturnValue({
      data: {
        data: [
          {
            id: 1,
            full_name: "John Doe",
            country: "India",
            salary: 50000,
            job_title: "Engineer",
          },
        ],
      },
      isLoading: false,
    } as any);

    vi.spyOn(hooks, "useCreateEmployee").mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    } as any);

    vi.spyOn(hooks, "useUpdateEmployee").mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    } as any);

    vi.spyOn(hooks, "useDeleteEmployee").mockReturnValue({
      mutate: vi.fn(),
    } as any);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders employee table", () => {
    renderComponent();

    expect(screen.getByText("John Doe")).toBeDefined();
  });

  it("renders add employee button", () => {
    renderComponent();

    expect(screen.getByText("Add Employee")).toBeDefined();
  });

  it("opens create modal", async () => {
    renderComponent();

    await userEvent.click(screen.getByText("Add Employee"));

    expect(screen.getByText("Create Employee")).toBeDefined();
  });

  it("renders search input", () => {
    renderComponent();

    expect(screen.getByPlaceholderText("Search employee")).toBeDefined();
  });

  it("renders pagination buttons", () => {
    renderComponent();

    expect(screen.getByText("Prev")).toBeDefined();

    expect(screen.getByText("Next")).toBeDefined();
  });

  it("renders edit button", () => {
    renderComponent();

    expect(screen.getByText("Edit")).toBeDefined();
  });

  it("renders delete button", () => {
    renderComponent();

    expect(screen.getByText("Delete")).toBeDefined();
  });

  it("shows loading state", () => {
    vi.spyOn(hooks, "useEmployees").mockReturnValue({
      data: undefined,
      isLoading: true,
    } as any);

    renderComponent();

    expect(screen.getByText("Loading...")).toBeDefined();
  });
});
