import type { FallbackProps } from "react-error-boundary";

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="max-w-md text-gray-500">
        {error instanceof Error
          ? error.message
          : "An unexpected error occurred."}
      </p>
      <button
        onClick={resetErrorBoundary}
        className="mt-4 rounded-md bg-gray-900 px-5 py-2 text-sm text-white transition-colors hover:bg-gray-700"
      >
        Try again
      </button>
    </div>
  );
};
