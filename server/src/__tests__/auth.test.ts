import { describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "@/app.js";

describe("POST /api/v1/auth/signup", () => {
  it("returns 201 and user data for valid input", async () => {
    const res = await request(app)
      .post("/api/v1/auth/signup")
      .send({
        username: "newuser",
        email: "newuser@example.com",
        password: "password123",
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.username).toBe("newuser");
    expect(res.body.data.user.email).toBe("newuser@example.com");
    expect(res.body.data.user).not.toHaveProperty("password");
  });

  it("sets auth cookies on signup", async () => {
    const res = await request(app)
      .post("/api/v1/auth/signup")
      .send({
        username: "cookieuser",
        email: "cookieuser@example.com",
        password: "password123",
      });

    expect(res.headers["set-cookie"]).toBeDefined();
    const cookies = res.headers["set-cookie"] as unknown as string[];
    expect(cookies.some((c: string) => c.startsWith("accessToken"))).toBe(true);
    expect(cookies.some((c: string) => c.startsWith("refreshToken"))).toBe(
      true
    );
  });

  it("returns 409 for duplicate username", async () => {
    await request(app)
      .post("/api/v1/auth/signup")
      .send({
        username: "dupeuser",
        email: "dupeuser@example.com",
        password: "password123",
      });

    const res = await request(app)
      .post("/api/v1/auth/signup")
      .send({
        username: "dupeuser",
        email: "another@example.com",
        password: "password123",
      });

    expect(res.status).toBe(409);
    expect(res.body.message).toContain("already exists");
  });

  it("returns 400 for missing fields", async () => {
    const res = await request(app)
      .post("/api/v1/auth/signup")
      .send({});

    expect(res.status).toBe(400);
  });

  it("returns 400 for invalid email", async () => {
    const res = await request(app)
      .post("/api/v1/auth/signup")
      .send({
        username: "baduser",
        email: "not-an-email",
        password: "password123",
      });

    expect(res.status).toBe(400);
  });
});

describe("POST /api/v1/auth/login", () => {
  it("returns 200 and logs in with username", async () => {
    await request(app)
      .post("/api/v1/auth/signup")
      .send({
        username: "loginuser",
        email: "loginuser@example.com",
        password: "password123",
      });

    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({
        identifier: "loginuser",
        password: "password123",
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.username).toBe("loginuser");
  });

  it("returns 200 and logs in with email", async () => {
    await request(app)
      .post("/api/v1/auth/signup")
      .send({
        username: "emaillogin",
        email: "emaillogin@example.com",
        password: "password123",
      });

    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({
        identifier: "emaillogin@example.com",
        password: "password123",
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("returns 401 for wrong password", async () => {
    await request(app)
      .post("/api/v1/auth/signup")
      .send({
        username: "wrongpass",
        email: "wrongpass@example.com",
        password: "password123",
      });

    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({
        identifier: "wrongpass",
        password: "wrongpassword",
      });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Invalid credentials");
  });

  it("returns 401 for non-existent user", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({
        identifier: "nobody",
        password: "password123",
      });

    expect(res.status).toBe(401);
  });
});
