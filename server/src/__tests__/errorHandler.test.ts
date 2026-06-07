import type { NextFunction, Request, Response } from "express";
import { describe, expect, it, vi } from "vitest";
import { ZodError, z } from "zod";

import { errorHandler } from "@/middlewares/errorHandler.js";
import { AppError } from "@/util/appError.js";

function createMockRes(): Response {
  const res: Partial<Response> = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  };
  return res as unknown as Response;
}

describe("errorHandler", () => {
  it("handles AppError with correct status code", () => {
    const res = createMockRes();
    const err = new AppError(404, "Resource not found");

    errorHandler(err, {} as Request, res, {} as NextFunction);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: "Resource not found",
      })
    );
  });

  it("handles ZodError with 400 status", () => {
    const res = createMockRes();
    const schema = z.object({ name: z.string() });
    const result = schema.safeParse({ name: 123 });
    const zodError = result.error as ZodError;

    errorHandler(zodError, {} as Request, res, {} as NextFunction);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: "Validation Error",
      })
    );
  });

  it("handles generic error with 500", () => {
    const res = createMockRes();
    const err = new Error("Something broke");

    errorHandler(err, {} as Request, res, {} as NextFunction);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
      })
    );
  });

  it("handles TokenExpiredError", () => {
    const res = createMockRes();
    const err = new Error("jwt expired");
    err.name = "TokenExpiredError";

    errorHandler(err, {} as Request, res, {} as NextFunction);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: "jwt expired",
      })
    );
  });

  it("handles JsonWebTokenError", () => {
    const res = createMockRes();
    const err = new Error("invalid token");
    err.name = "JsonWebTokenError";

    errorHandler(err, {} as Request, res, {} as NextFunction);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: "Invalid token. Please log in again.",
      })
    );
  });
});
