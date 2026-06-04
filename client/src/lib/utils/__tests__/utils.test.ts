import { describe, expect, it } from "vitest";

import { cn, formatDate } from "../utils";

describe("cn", () => {
  it("joins class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("filters out falsy values", () => {
    expect(cn("foo", false, undefined, null, "bar")).toBe("foo bar");
  });

  it("handles empty inputs", () => {
    expect(cn()).toBe("");
  });

  it("merges Tailwind classes (last one wins)", () => {
    expect(cn("px-4", "px-6")).toBe("px-6");
  });
});

describe("formatDate", () => {
  it("formats a valid date string in short format", () => {
    expect(formatDate("2024-01-15")).toBe("Jan 15, 2024");
  });

  it("returns uppercase when format is uppercase", () => {
    expect(formatDate("2024-01-15", "uppercase")).toBe("JAN 15, 2024");
  });

  it("returns long format when specified", () => {
    const result = formatDate("2024-01-15", "long");
    expect(result).toContain("2024");
    expect(result).toContain("Jan");
  });

  it("handles invalid date strings gracefully", () => {
    const result = formatDate("not-a-date");
    expect(result).toBe("Invalid Date");
  });

  it("handles empty string", () => {
    const result = formatDate("");
    expect(result).toBe("Invalid Date");
  });
});
