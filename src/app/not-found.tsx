import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-default-100 text-default-500">
        <Compass className="h-10 w-10" />
      </div>
      <p className="text-sm font-semibold text-primary">404</p>
      <h1 className="mt-1 text-3xl font-bold">Page not found</h1>
      <p className="mt-2 max-w-md text-default-500">
        The page you’re looking for doesn’t exist or has moved.
      </p>
      <Link
        href="/dashboard"
        className="mt-6 inline-flex h-11 items-center rounded-xl bg-primary px-6 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
