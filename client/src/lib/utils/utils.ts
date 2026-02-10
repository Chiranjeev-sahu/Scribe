import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  dateString: string,
  format: "short" | "long" | "uppercase" = "short"
): string {
  const date = new Date(dateString);

  // Check for invalid date
  if (isNaN(date.getTime())) {
    console.warn(`Invalid date string: ${dateString}`);
    return "Invalid Date";
  }

  const formatted = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return format === "uppercase" ? formatted.toUpperCase() : formatted;
}
