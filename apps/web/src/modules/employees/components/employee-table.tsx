import Table from "../../../components/common/table";

import Button from "../../../components/common/button";

interface Props {
  employees: any[];
  onEdit: (employee: any) => void;
  onDelete: (id: number) => void;
}

export default function EmployeeTable({ employees, onEdit, onDelete }: Props) {
  return (
    <Table headers={["Name", "Country", "Salary", "Job Title", "Actions"]}>
      {employees.map((employee) => (
        <tr key={employee.id} className="border-b">
          <td className="px-4 py-3">{employee.full_name}</td>

          <td className="px-4 py-3">{employee.country}</td>

          <td className="px-4 py-3">${employee.salary}</td>

          <td className="px-4 py-3">{employee.job_title}</td>

          <td className="flex gap-2 px-4 py-3">
            <Button onClick={() => onEdit(employee)}>Edit</Button>

            <Button
              className="bg-red-500"
              onClick={() => onDelete(employee.id)}
            >
              Delete
            </Button>
          </td>
        </tr>
      ))}
    </Table>
  );
}
