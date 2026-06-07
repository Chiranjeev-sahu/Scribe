import { describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "@/app.js";

describe("GET /api/v1/post", () => {
  it("returns 200 with paginated posts", async () => {
    const res = await request(app).get("/api/v1/post");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("posts");
    expect(res.body.data).toHaveProperty("pagination");
    expect(res.body.data.pagination).toHaveProperty("currentPage");
    expect(res.body.data.pagination).toHaveProperty("totalPages");
    expect(res.body.data.pagination).toHaveProperty("totalPosts");
  });

  it("accepts page and limit query params", async () => {
    const res = await request(app)
      .get("/api/v1/post")
      .query({ page: 1, limit: 5 });

    expect(res.status).toBe(200);
    expect(res.body.data.pagination.currentPage).toBe(1);
  });

  it("accepts category filter", async () => {
    const res = await request(app)
      .get("/api/v1/post")
      .query({ category: "Technology" });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});

describe("GET /api/v1/post/public/:id", () => {
  it("returns 404 for non-existent post", async () => {
    const res = await request(app).get(
      "/api/v1/post/public/507f1f77bcf86cd799439011"
    );

    expect(res.status).toBe(404);
  });
});
