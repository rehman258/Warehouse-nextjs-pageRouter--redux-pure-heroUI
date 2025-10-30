"use client";

import React from "react";
import { NextIntlClientProvider } from "next-intl";
import { Provider } from "react-redux";
import { store } from "@/store";
export default function Providers({ children }:{children:React.ReactNode}) {
  return (
    <NextIntlClientProvider locale="en">
      <Provider store={store}>
        {children}
      </Provider>
    </NextIntlClientProvider>
  );
}
