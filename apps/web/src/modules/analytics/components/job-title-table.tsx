import Table from "../../../components/common/table";

interface Props {
  data: any[];
}

export default function JobTitleTable({ data }: Props) {
  return (
    <Table headers={["Country", "Job Title", "Avg Salary", "Employees"]}>
      {data.map((item, index) => (
        <tr key={index} className="border-b">
          <td className="px-4 py-3">{item.country}</td>

          <td className="px-4 py-3">{item.job_title}</td>

          <td className="px-4 py-3">${item.avg_salary}</td>

          <td className="px-4 py-3">{item.employee_count}</td>
        </tr>
      ))}
    </Table>
  );
}
