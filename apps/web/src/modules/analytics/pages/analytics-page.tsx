import Card from "../../../components/common/card";

import StatsCard from "../components/stats-card";

import CountrySalaryTable from "../components/country-salary-table";

import DepartmentTable from "../components/department-table";

import JobTitleTable from "../components/job-title-table";

import {
  useCountrySalaryInsights,
  useDepartmentInsights,
  useGlobalStats,
  useJobTitleInsights,
} from "../hooks/use-analytics";

export default function AnalyticsPage() {
  const globalStats = useGlobalStats();

  const countryInsights = useCountrySalaryInsights();

  const jobTitleInsights = useJobTitleInsights();

  const departmentInsights = useDepartmentInsights();

  if (
    globalStats.isLoading ||
    countryInsights.isLoading ||
    jobTitleInsights.isLoading ||
    departmentInsights.isLoading
  ) {
    return <p>Loading analytics...</p>;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <StatsCard
          title="Total Employees"
          value={globalStats.data?.data.total_employees}
        />

        <StatsCard
          title="Average Salary"
          value={`$${globalStats.data?.data.avg_salary}`}
        />

        <StatsCard
          title="Minimum Salary"
          value={`$${globalStats.data?.data.min_salary}`}
        />

        <StatsCard
          title="Maximum Salary"
          value={`$${globalStats.data?.data.max_salary}`}
        />
      </div>

      <Card>
        <h2 className="mb-4 text-2xl font-bold">Country Salary Insights</h2>

        <CountrySalaryTable data={countryInsights.data?.data || []} />
      </Card>

      <Card>
        <h2 className="mb-4 text-2xl font-bold">Job Title Insights</h2>

        <JobTitleTable data={jobTitleInsights.data?.data || []} />
      </Card>

      <Card>
        <h2 className="mb-4 text-2xl font-bold">Department Insights</h2>

        <DepartmentTable data={departmentInsights.data?.data || []} />
      </Card>
    </div>
  );
}
