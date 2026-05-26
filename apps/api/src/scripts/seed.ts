import fs from "fs";
import path from "path";

import { db } from "../database/sqlite";
import {
  COUNTRIES,
  DEPARTMENTS,
  JOB_TITLES,
} from "../modules/employee/employee.constants";

const firstNames = fs
  .readFileSync(
    path.join(__dirname, "../../seed-data/first_names.txt"),
    "utf-8"
  )
  .split("\n");

const lastNames = fs
  .readFileSync(path.join(__dirname, "../../seed-data/last_names.txt"), "utf-8")
  .split("\n");

function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

const insert = db.prepare(`
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

const insertMany = db.transaction(() => {
  for (let i = 0; i < 10000; i++) {
    const first = randomItem(firstNames);
    const last = randomItem(lastNames);

    const fullName = `${first} ${last}`;

    insert.run(
      fullName,
      `employee${i}@company.com`,
      randomItem(COUNTRIES),
      Math.floor(Math.random() * 90000) + 10000,
      randomItem(JOB_TITLES),
      randomItem(DEPARTMENTS)
    );
  }
});

insertMany();

console.log("10,000 employees seeded successfully");
