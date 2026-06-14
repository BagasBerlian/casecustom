import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col items-center justify-center bg-muted/40 px-4 text-center">
      <div className="mx-auto flex max-w-[500px] flex-col items-center justify-center space-y-6">
        <div className="rounded-full bg-zinc-100 p-6 shadow-sm ring-1 ring-zinc-900/5">
          <Ghost className="h-12 w-12 text-zinc-400" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            Page Not Found
          </h1>
          <p className="text-lg text-zinc-600">
            The page you are looking for does not exist, or you do not have permission to view it.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link
            href="/"
            className={buttonVariants({
              variant: "default",
              size: "lg",
            })}
          >
            Return to Home
          </Link>
          <Link
            href="/configure/upload"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
            })}
          >
            Create a case
          </Link>
        </div>
      </div>
    </div>
  );
}
