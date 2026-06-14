"use client";

import { useEffect } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col items-center justify-center bg-muted/40 px-4 text-center">
      <div className="mx-auto flex max-w-[500px] flex-col items-center justify-center space-y-6">
        <div className="rounded-full bg-red-100 p-6 shadow-sm ring-1 ring-red-900/5">
          <AlertCircle className="h-12 w-12 text-red-500" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            Something went wrong
          </h1>
          <p className="text-lg text-zinc-600">
            An unexpected error occurred while trying to process your request. Please try again.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            onClick={() => reset()}
            className={buttonVariants({
              variant: "default",
              size: "lg",
            })}
          >
            Try again
          </button>
          <Link
            href="/"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
            })}
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
