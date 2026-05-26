import Table from "../../../components/common/table";

interface Props {
  data: any[];
}

export default function CountrySalaryTable({ data }: Props) {
  return (
    <Table
      headers={[
        "Country",
        "Min Salary",
        "Max Salary",
        "Avg Salary",
        "Employees",
      ]}
    >
      {data.map((item) => (
        <tr key={item.country} className="border-b">
          <td className="px-4 py-3">{item.country}</td>

          <td className="px-4 py-3">${item.min_salary}</td>

          <td className="px-4 py-3">${item.max_salary}</td>

          <td className="px-4 py-3">${item.avg_salary}</td>

          <td className="px-4 py-3">{item.employee_count}</td>
        </tr>
      ))}
    </Table>
  );
}
