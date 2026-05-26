import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createEmployee,
  deleteEmployee,
  getEmployees,
  updateEmployee,
} from "../services/employee.service";

export function useEmployees(
  params?: {
    page?: number;
    limit?: number;
    search?: string;
    country?: string;
  }
) {
  return useQuery({
    queryKey: ["employees", params],
    queryFn: () => getEmployees(params),
    placeholderData: keepPreviousData,
  });
}

export function useCreateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEmployee,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },
  });
}

export function useUpdateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: unknown;
    }) => updateEmployee(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },
  });
}

export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmployee,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },
  });
}