import Database from "better-sqlite3";

export const db = new Database("salary-management.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    country TEXT NOT NULL,
    salary REAL NOT NULL,
    job_title TEXT NOT NULL,
    department TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

db.exec(`
  CREATE INDEX IF NOT EXISTS idx_country
  ON employees(country);
`);

db.exec(`
  CREATE INDEX IF NOT EXISTS idx_job_title
  ON employees(job_title);
`);

console.log("SQLite Connected");
