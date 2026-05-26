import request from "supertest";

import app from "../app";

describe("Analytics API", () => {
  it("should get country salary insights",
    async () => {
      const response = await request(app)
        .get("/analytics/country-salary");

      expect(response.status).toBe(200);

      expect(response.body.success)
        .toBe(true);

      expect(Array.isArray(response.body.data))
        .toBe(true);
    });

  it("should get job title insights",
    async () => {
      const response = await request(app)
        .get("/analytics/job-title");

      expect(response.status).toBe(200);

      expect(response.body.success)
        .toBe(true);
    });

  it("should filter job title insights by country",
    async () => {
      const response = await request(app)
        .get(
          "/analytics/job-title?country=India"
        );

      expect(response.status).toBe(200);

      expect(response.body.success)
        .toBe(true);
    });

  it("should get department insights",
    async () => {
      const response = await request(app)
        .get("/analytics/departments");

      expect(response.status).toBe(200);

      expect(response.body.success)
        .toBe(true);
    });

  it("should get global stats",
    async () => {
      const response = await request(app)
        .get("/analytics/global-stats");

      expect(response.status).toBe(200);

      expect(response.body.success)
        .toBe(true);

      expect(
        response.body.data.total_employees
      ).toBeDefined();
    });
});