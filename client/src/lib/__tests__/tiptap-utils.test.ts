import { describe, expect, it, vi } from "vitest";

import {
  formatShortcutKey,
  isExtensionAvailable,
  isValidPosition,
  sanitizeUrl,
} from "../tiptap-utils";

describe("isValidPosition", () => {
  it("returns true for valid positions", () => {
    expect(isValidPosition(0)).toBe(true);
    expect(isValidPosition(42)).toBe(true);
  });

  it("returns false for null, undefined, or negative", () => {
    expect(isValidPosition(null)).toBe(false);
    expect(isValidPosition(undefined)).toBe(false);
    expect(isValidPosition(-1)).toBe(false);
  });
});

describe("formatShortcutKey", () => {
  it("formats mod key on Mac", () => {
    expect(formatShortcutKey("mod", true)).toBe("⌘");
  });

  it("capitalizes non-special keys on Mac", () => {
    expect(formatShortcutKey("shift", true)).toBe("⇧");
  });

  it("capitalizes first letter on non-Mac", () => {
    expect(formatShortcutKey("ctrl", false)).toBe("Ctrl");
  });

  it("returns the key as-is for non-special non-Mac", () => {
    expect(formatShortcutKey("a", false, false)).toBe("a");
  });
});

describe("sanitizeUrl", () => {
  it("returns valid https URLs unchanged", () => {
    expect(sanitizeUrl("https://example.com", "http://localhost")).toBe(
      "https://example.com/"
    );
  });

  it("returns '#' for javascript: URLs", () => {
    const url = sanitizeUrl("javascript:alert(1)", "http://localhost");
    expect(url).toBe("#");
  });
});

describe("isExtensionAvailable", () => {
  it("returns false when editor is null", () => {
    expect(isExtensionAvailable(null, "bold")).toBe(false);
  });

  it("returns false for empty extension list", () => {
    const mockEditor = {
      extensionManager: { extensions: [] },
    };
    const result = isExtensionAvailable(mockEditor as any, "bold");
    expect(result).toBe(false);
  });
});
