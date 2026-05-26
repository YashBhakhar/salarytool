import { Request, Response } from "express";

import { AnalyticsService } from "./analytics.service";

const service = new AnalyticsService();

export class AnalyticsController {
  getCountrySalaryInsights(req: Request, res: Response) {
    const result = service.getCountrySalaryInsights();

    res.json({
      success: true,
      data: result,
    });
  }

  getJobTitleInsights(req: Request, res: Response) {
    const country = req.query.country as string;

    const result = service.getJobTitleInsights(country);

    res.json({
      success: true,
      data: result,
    });
  }

  getDepartmentInsights(req: Request, res: Response) {
    const result = service.getDepartmentInsights();

    res.json({
      success: true,
      data: result,
    });
  }

  getGlobalStats(req: Request, res: Response) {
    const result = service.getGlobalStats();

    res.json({
      success: true,
      data: result,
    });
  }
}
