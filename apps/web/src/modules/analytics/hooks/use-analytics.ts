import { useQuery }
from "@tanstack/react-query";

import {
  getCountrySalaryInsights,
  getDepartmentInsights,
  getGlobalStats,
  getJobTitleInsights,
} from "../services/analytics.service";

export function useGlobalStats() {
  return useQuery({
    queryKey: ["global-stats"],
    queryFn: getGlobalStats,
  });
}

export function useCountrySalaryInsights() {
  return useQuery({
    queryKey: ["country-salary"],
    queryFn: getCountrySalaryInsights,
  });
}

export function useJobTitleInsights(
  country?: string
) {
  return useQuery({
    queryKey: [
      "job-title-insights",
      country,
    ],
    queryFn: () =>
      getJobTitleInsights(country),
  });
}

export function useDepartmentInsights() {
  return useQuery({
    queryKey: ["department-insights"],
    queryFn: getDepartmentInsights,
  });
}