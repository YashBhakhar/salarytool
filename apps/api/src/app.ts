import express from "express";
import cors from "cors";

import "./database/sqlite";

import healthRoutes
from "./routes/health.routes";

import employeeRoutes
from "./modules/employee/employee.routes";

import analyticsRoutes
from "./modules/analytics/analytics.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", healthRoutes);

app.use("/employees", employeeRoutes);

app.use("/analytics", analyticsRoutes);

export default app;