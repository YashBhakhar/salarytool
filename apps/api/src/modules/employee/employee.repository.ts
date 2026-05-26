import { db } from "../../database/sqlite";

import { Employee, EmployeeQuery } from "./employee.types";

export class EmployeeRepository {
  create(employee: Omit<Employee, "id">) {
    const stmt = db.prepare(`
      INSERT INTO employees (
        full_name,
        email,
        country,
        salary,
        job_title,
        department
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    return stmt.run(
      employee.full_name,
      employee.email,
      employee.country,
      employee.salary,
      employee.job_title,
      employee.department
    );
  }

  findAll(query: EmployeeQuery) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const offset = (page - 1) * limit;

    let sql = `
      SELECT * FROM employees
      WHERE 1=1
    `;

    const params: unknown[] = [];

    if (query.search) {
      sql += ` AND full_name LIKE ?`;
      params.push(`%${query.search}%`);
    }

    if (query.country) {
      sql += ` AND country = ?`;
      params.push(query.country);
    }

    sql += `
      LIMIT ?
      OFFSET ?
    `;

    params.push(limit, offset);

    const stmt = db.prepare(sql);

    return stmt.all(...params);
  }

  findById(id: number) {
    const stmt = db.prepare(`
      SELECT * FROM employees
      WHERE id = ?
    `);

    return stmt.get(id);
  }

  update(id: number, data: Partial<Employee>) {
    const fields = Object.keys(data);

    const values = Object.values(data);

    const updates = fields.map((field) => `${field} = ?`).join(", ");

    const stmt = db.prepare(`
      UPDATE employees
      SET ${updates},
      updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    return stmt.run(...values, id);
  }

  delete(id: number) {
    const stmt = db.prepare(`
      DELETE FROM employees
      WHERE id = ?
    `);

    return stmt.run(id);
  }
}
