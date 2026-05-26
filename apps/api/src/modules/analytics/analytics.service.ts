import { AnalyticsRepository } from "./analytics.repository";

const repository = new AnalyticsRepository();

export class AnalyticsService {
  getCountrySalaryInsights() {
    return repository.getCountrySalaryInsights();
  }

  getJobTitleInsights(country?: string) {
    return repository.getJobTitleInsights(country);
  }

  getDepartmentInsights() {
    return repository.getDepartmentInsights();
  }

  getGlobalStats() {
    return repository.getGlobalStats();
  }
}
