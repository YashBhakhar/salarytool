import { api } from "../../../lib/api";

export async function getGlobalStats() {
  const response = await api.get(
    "/analytics/global-stats"
  );

  return response.data;
}

export async function getCountrySalaryInsights() {
  const response = await api.get(
    "/analytics/country-salary"
  );

  return response.data;
}

export async function getJobTitleInsights(
  country?: string
) {
  const response = await api.get(
    "/analytics/job-title",
    {
      params: { country },
    }
  );

  return response.data;
}

export async function getDepartmentInsights() {
  const response = await api.get(
    "/analytics/departments"
  );

  return response.data;
}