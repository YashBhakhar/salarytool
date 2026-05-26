import { EmployeeRepository } from "./employee.repository";

import {
  EmployeeSchema,
  UpdateEmployeeSchema,
} from "./employee.validator";

import { Employee, EmployeeQuery } from "./employee.types";

const repository = new EmployeeRepository();

export class EmployeeService {
  create(data: Employee) {
    const validated = EmployeeSchema.parse(data);
    const now = new Date().toISOString();
    return repository.create({ ...validated, created_at: now, updated_at: now });
  }

  getAll(query: EmployeeQuery) {
    return repository.findAll(query);
  }

  getById(id: number) {
    return repository.findById(id);
  }

  update(id: number, data: unknown) {
    const validated =
      UpdateEmployeeSchema.parse(data);

    return repository.update(id, validated);
  }

  delete(id: number) {
    return repository.delete(id);
  }
}