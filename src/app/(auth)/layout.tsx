import Link from "next/link";
import { BarChart3, PackageCheck, Truck, Warehouse } from "lucide-react";

const HIGHLIGHTS = [
  { icon: PackageCheck, title: "Real-time inventory", text: "Track stock levels and locations across every zone." },
  { icon: Truck, title: "Order management", text: "Inbound and outbound orders, end to end." },
  { icon: BarChart3, title: "Actionable analytics", text: "Capacity, movement and category insights." },
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Brand panel (desktop) */}
      <aside className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-slate-900 p-12 text-slate-100 lg:flex">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
          aria-hidden
        />
        <Link href="/dashboard" className="relative flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Warehouse className="h-5 w-5" />
          </span>
          <span className="text-lg font-semibold text-white">WareFlow Pro</span>
        </Link>

        <div className="relative">
          <h2 className="text-3xl font-bold leading-tight">Run your warehouse with clarity.</h2>
          <p className="mt-3 max-w-md text-slate-300">
            Inventory, orders, suppliers and analytics — unified in one fast, modern dashboard.
          </p>
          <ul className="mt-8 space-y-4">
            {HIGHLIGHTS.map((h) => (
              <li key={h.title} className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <h.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold">{h.title}</p>
                  <p className="text-sm text-slate-400">{h.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-slate-500">WareFlow Pro v1.0</p>
      </aside>

      {/* Form area */}
      <main className="flex flex-1 items-center justify-center bg-background px-4 py-10">
        <div className="w-full max-w-md">
          <Link href="/dashboard" className="mb-8 flex items-center justify-center gap-2.5 lg:hidden">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Warehouse className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold">WareFlow Pro</span>
          </Link>
          {children}
        </div>
      </main>
    </div>
  );
}
