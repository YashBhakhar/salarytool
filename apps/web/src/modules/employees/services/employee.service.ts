import { api } from "../../../lib/api";

export async function getEmployees(
  params?: {
    page?: number;
    limit?: number;
    search?: string;
    country?: string;
  }
) {
  const response = await api.get(
    "/employees",
    { params }
  );

  return response.data;
}

export async function createEmployee(
  data: unknown
) {
  const response = await api.post(
    "/employees",
    data
  );

  return response.data;
}

export async function updateEmployee(
  id: number,
  data: unknown
) {
  const response = await api.patch(
    `/employees/${id}`,
    data
  );

  return response.data;
}

export async function deleteEmployee(
  id: number
) {
  const response = await api.delete(
    `/employees/${id}`
  );

  return response.data;
}