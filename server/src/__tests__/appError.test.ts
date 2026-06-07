import { describe, expect, it } from "vitest";

import { APIResponse } from "@/util/apiResponse.js";
import { AppError } from "@/util/appError.js";

describe("AppError", () => {
  it("creates an operational error with status and message", () => {
    const error = new AppError(404, "Not found");
    expect(error.statusCode).toBe(404);
    expect(error.message).toBe("Not found");
    expect(error.isOperational).toBe(true);
  });

  it("stores optional error details", () => {
    const details = [{ field: "email", message: "Invalid format" }];
    const error = new AppError(400, "Validation failed", details);
    expect(error.errors).toEqual(details);
  });

  it("is an instance of Error", () => {
    const error = new AppError(500, "Server error");
    expect(error).toBeInstanceOf(Error);
  });
});

describe("APIResponse", () => {
  it("marks success as true for 2xx codes", () => {
    const response = new APIResponse(200, { id: 1 }, "OK");
    expect(response.success).toBe(true);
  });

  it("marks success as false for 4xx codes", () => {
    const response = new APIResponse(404, null, "Not found");
    expect(response.success).toBe(false);
  });

  it("defaults message to 'Success'", () => {
    const response = new APIResponse(201, { id: 1 });
    expect(response.message).toBe("Success");
  });

  it("stores data correctly", () => {
    const data = { user: { name: "Test" } };
    const response = new APIResponse(200, data);
    expect(response.data).toEqual(data);
  });
});
