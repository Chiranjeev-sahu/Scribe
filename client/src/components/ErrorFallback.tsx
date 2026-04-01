import type { FallbackProps } from "react-error-boundary";

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="text-muted-foreground max-w-md">
        {error instanceof Error
          ? error.message
          : "An unexpected error occurred."}
      </p>
      <button
        onClick={resetErrorBoundary}
        className="bg-primary hover:bg-primary/90 mt-4 rounded-md px-5 py-2 text-sm text-white transition-colors"
      >
        Try again
      </button>
    </div>
  );
};
