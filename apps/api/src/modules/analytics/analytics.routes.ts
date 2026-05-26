import { Router } from "express";

import { AnalyticsController } from "./analytics.controller";

const router = Router();

const controller = new AnalyticsController();

router.get("/country-salary", controller.getCountrySalaryInsights);

router.get("/job-title", controller.getJobTitleInsights);

router.get("/departments", controller.getDepartmentInsights);

router.get("/global-stats", controller.getGlobalStats);

export default router;
