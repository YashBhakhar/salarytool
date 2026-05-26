import { z } from "zod";

export const EmployeeSchema = z.object({
  full_name: z.string().min(2),
  email: z.string().email(),
  country: z.string(),
  salary: z.number().positive(),
  job_title: z.string(),
  department: z.string(),
});

export const UpdateEmployeeSchema = EmployeeSchema.partial();
