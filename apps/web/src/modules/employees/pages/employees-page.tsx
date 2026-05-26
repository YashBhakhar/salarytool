import { useState } from "react";

import Button
  from "../../../components/common/button";

import Input
  from "../../../components/common/input";

import Card
  from "../../../components/common/card";

import EmployeeForm
  from "../components/employee-form";

import EmployeeModal
  from "../components/employee-modal";

import EmployeeTable
  from "../components/employee-table";

import {
  useCreateEmployee,
  useDeleteEmployee,
  useEmployees,
  useUpdateEmployee,
} from "../hooks/use-employees";
import { useDebounce } from "../../../hooks/use-debounce";

export default function EmployeesPage() {
  const [page, setPage] = useState(1);

  const [search, setSearch] =
    useState("");

  const [open, setOpen] =
    useState(false);

  const [editingEmployee,
    setEditingEmployee] =
    useState<any>(null);

  const debouncedSearch = useDebounce(search, 500);
  const { data, isLoading } =
    useEmployees({
      page,
      limit: 10,
      search: debouncedSearch,
    });


  const createMutation =
    useCreateEmployee();

  const updateMutation =
    useUpdateEmployee();

  const deleteMutation =
    useDeleteEmployee();

  function handleCreate(data: unknown) {
    createMutation.mutate(data, {
      onSuccess: () => setOpen(false),
    });
  }

  function handleUpdate(data: unknown) {
    updateMutation.mutate(
      {
        id: editingEmployee.id,
        data,
      },
      {
        onSuccess: () => {
          setEditingEmployee(null);
          setOpen(false);
        },
      }
    );
  }

  function handleDelete(id: number) {
    deleteMutation.mutate(id);
  }

  return (
    <Card>
      <div className="mb-6 flex items-center gap-4 justify-between">
        <Input
          placeholder="Search employee"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          name="search"
          className="flex-1"
        />

        <Button
          onClick={() => {
            setEditingEmployee(null);
            setOpen(true);
          }}
        >
          Add Employee
        </Button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <EmployeeTable
          employees={data?.data || []}
          onEdit={(employee) => {
            setEditingEmployee(employee);
            setOpen(true);
          }}
          onDelete={handleDelete}
        />
      )}

      <div className="mt-6 flex gap-2">
        <Button
          onClick={() =>
            setPage((prev) =>
              Math.max(prev - 1, 1)
            )
          }
        >
          Prev
        </Button>

        <Button
          onClick={() =>
            setPage((prev) => prev + 1)
          }
        >
          Next
        </Button>
      </div>

      <EmployeeModal
        open={open}
        title={
          editingEmployee
            ? "Edit Employee"
            : "Create Employee"
        }
        onClose={() => setOpen(false)}
      >
        <EmployeeForm
          defaultValues={editingEmployee}
          loading={
            createMutation.isPending ||
            updateMutation.isPending
          }
          onSubmit={
            editingEmployee
              ? handleUpdate
              : handleCreate
          }
        />
      </EmployeeModal>
    </Card>
  );
}