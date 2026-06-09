"use client";

import { Button, Checkbox, Input } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("demo@wareflow.pro");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  // Demo: any valid input signs in and enters the dashboard.
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: { email?: string; password?: string } = {};
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) next.email = "Enter a valid email";
    if (password.length < 6) next.password = "Password must be at least 6 characters";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    router.push("/dashboard");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Sign in</h1>
      <p className="mt-1 text-sm text-default-500">Welcome back to WareFlow Pro.</p>

      <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          variant="bordered"
          value={email}
          onValueChange={setEmail}
          isInvalid={!!errors.email}
          errorMessage={errors.email}
        />
        <Input
          label="Password"
          type={show ? "text" : "password"}
          autoComplete="current-password"
          variant="bordered"
          value={password}
          onValueChange={setPassword}
          isInvalid={!!errors.password}
          errorMessage={errors.password}
          endContent={
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Hide password" : "Show password"}
              className="text-default-400"
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
        />

        <div className="flex items-center justify-between">
          <Checkbox defaultSelected size="sm">
            Remember me
          </Checkbox>
        </div>

        <Button type="submit" color="primary" className="w-full">
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-default-500">
        Demo mode — any email &amp; password works.
      </p>
    </div>
  );
}
