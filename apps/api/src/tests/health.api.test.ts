import request from "supertest";

import app from "../app";

describe("Health API", () => {
  it("should return healthy response", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      success: true,
      message: "API is healthy",
    });
  });
});
