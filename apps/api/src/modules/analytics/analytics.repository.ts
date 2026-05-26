import { db } from "../../database/sqlite";

export class AnalyticsRepository {
  getCountrySalaryInsights() {
    const stmt = db.prepare(`
      SELECT
        country,
        MIN(salary) as min_salary,
        MAX(salary) as max_salary,
        ROUND(AVG(salary), 2) as avg_salary,
        COUNT(*) as employee_count
      FROM employees
      GROUP BY country
      ORDER BY avg_salary DESC
    `);

    return stmt.all();
  }

  getJobTitleInsights(country?: string) {
    let sql = `
      SELECT
        country,
        job_title,
        ROUND(AVG(salary), 2) as avg_salary,
        COUNT(*) as employee_count
      FROM employees
    `;

    const params: unknown[] = [];

    if (country) {
      sql += ` WHERE country = ?`;
      params.push(country);
    }

    sql += `
      GROUP BY country, job_title
      ORDER BY avg_salary DESC
    `;

    const stmt = db.prepare(sql);

    return stmt.all(...params);
  }

  getDepartmentInsights() {
    const stmt = db.prepare(`
      SELECT
        department,
        COUNT(*) as employee_count,
        ROUND(AVG(salary), 2) as avg_salary
      FROM employees
      GROUP BY department
      ORDER BY employee_count DESC
    `);

    return stmt.all();
  }

  getGlobalStats() {
    const stmt = db.prepare(`
      SELECT
        COUNT(*) as total_employees,
        ROUND(AVG(salary), 2) as avg_salary,
        MIN(salary) as min_salary,
        MAX(salary) as max_salary
      FROM employees
    `);

    return stmt.get();
  }
}
