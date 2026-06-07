import { describe, expect, it } from "vitest";

import { loginSchema, signupSchema } from "@/validators/auth.schema.js";
import { updatePost } from "@/validators/post.schema.js";

describe("signupSchema", () => {
  it("accepts valid signup data", () => {
    const result = signupSchema.safeParse({
      email: "user@example.com",
      password: "password123",
      username: "testuser",
    });
    expect(result.success).toBe(true);
  });

  it("rejects short password", () => {
    const result = signupSchema.safeParse({
      email: "user@example.com",
      password: "123",
      username: "testuser",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = signupSchema.safeParse({
      email: "not-an-email",
      password: "password123",
      username: "testuser",
    });
    expect(result.success).toBe(false);
  });

  it("rejects short username", () => {
    const result = signupSchema.safeParse({
      email: "user@example.com",
      password: "password123",
      username: "ab",
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing fields", () => {
    const result = signupSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});

describe("loginSchema", () => {
  it("accepts valid login data", () => {
    const result = loginSchema.safeParse({
      identifier: "testuser",
      password: "password123",
    });
    expect(result.success).toBe(true);
  });

  it("accepts email as identifier", () => {
    const result = loginSchema.safeParse({
      identifier: "user@example.com",
      password: "password123",
    });
    expect(result.success).toBe(true);
  });

  it("rejects short password", () => {
    const result = loginSchema.safeParse({
      identifier: "testuser",
      password: "short",
    });
    expect(result.success).toBe(false);
  });
});

describe("updatePost", () => {
  it("accepts valid post data", () => {
    const result = updatePost.safeParse({
      title: "My Post",
      category: "Technology",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid category", () => {
    const result = updatePost.safeParse({
      category: "InvalidCategory",
    });
    expect(result.success).toBe(false);
  });

  it("allows partial updates", () => {
    const result = updatePost.safeParse({ title: "Just the title" });
    expect(result.success).toBe(true);
  });

  it("allows empty coverImage string", () => {
    const result = updatePost.safeParse({
      title: "Post",
      category: "Culture",
      coverImage: "",
    });
    expect(result.success).toBe(true);
  });
});
