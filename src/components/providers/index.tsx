"use client";

import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { StoreProvider } from "@/store/StoreProvider";

export default function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <NextIntlClientProvider locale="en">
      <StoreProvider>
        <HeroUIProvider navigate={router.push}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </HeroUIProvider>
      </StoreProvider>
    </NextIntlClientProvider>
  );
}
