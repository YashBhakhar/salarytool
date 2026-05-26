import Table from "../../../components/common/table";

interface Props {
  data: any[];
}

export default function DepartmentTable({ data }: Props) {
  return (
    <Table headers={["Department", "Employees", "Avg Salary"]}>
      {data.map((item) => (
        <tr key={item.department} className="border-b">
          <td className="px-4 py-3">{item.department}</td>

          <td className="px-4 py-3">{item.employee_count}</td>

          <td className="px-4 py-3">${item.avg_salary}</td>
        </tr>
      ))}
    </Table>
  );
}
