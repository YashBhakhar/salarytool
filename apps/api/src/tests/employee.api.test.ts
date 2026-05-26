import request from "supertest";

import app from "../app";

describe("Employee API", () => {
  let employeeId: number;

  it("should create employee", async () => {
    const response = await request(app).post("/employees").send({
      full_name: "Yash Bhakhar",
      email: "yash@test.com",
      country: "India",
      salary: 90000,
      job_title: "Software Engineer",
      department: "Engineering",
    });

    expect(response.status).toBe(201);

    expect(response.body.success).toBe(true);

    employeeId = response.body.data.lastInsertRowid;
  });

  it("should reject invalid employee", async () => {
    const response = await request(app).post("/employees").send({
      full_name: "",
    });

    expect(response.status).toBe(400);

    expect(response.body.success).toBe(false);
  });

  it("should fetch employees", async () => {
    const response = await request(app).get("/employees");

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);

    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should fetch single employee", async () => {
    const response = await request(app).get(`/employees/${employeeId}`);

    expect(response.status).toBe(200);

    expect(response.body.data.id).toBe(employeeId);
  });

  it("should update employee", async () => {
    const response = await request(app).patch(`/employees/${employeeId}`).send({
      salary: 120000,
    });

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);
  });

  it("should delete employee", async () => {
    const response = await request(app).delete(`/employees/${employeeId}`);

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);
  });

  it("should support pagination", async () => {
    const response = await request(app).get("/employees?page=1&limit=5");

    expect(response.status).toBe(200);

    expect(response.body.data.length).toBeLessThanOrEqual(5);
  });

  it("should support search", async () => {
    const response = await request(app).get("/employees?search=John");

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);
  });

  it("should support country filter", async () => {
    const response = await request(app).get("/employees?country=India");

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);
  });
});
