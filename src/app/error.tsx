"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("App-level error:", error);
  }, [error]);

  const errorMessage = error?.message || "An unexpected error occurred";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold">Something went wrong!</h1>
        <p className="mb-4 text-gray-600">{errorMessage}</p>
        <button
          onClick={reset}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
