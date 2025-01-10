"use client";

import { useEffect } from "react";
import { Button } from "@/ui/shadcn/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">Something went wrong!</h1>
        <p className="text-lg text-gray-600">We're sorry for the inconvenience.</p>
        <Button
          onClick={reset}
          className="rounded-full px-8"
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
