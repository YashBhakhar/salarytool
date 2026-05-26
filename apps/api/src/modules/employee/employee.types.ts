export interface Employee {
  id: number;
  full_name: string;
  email: string;
  country: string;
  salary: number;
  job_title: string;
  department: string;
  created_at: string;
  updated_at: string;
}

export interface EmployeeQuery {
  page?: number;
  limit?: number;
  search?: string;
  country?: string;
}
