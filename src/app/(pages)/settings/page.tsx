"use client";

import React from "react";
import ComponentWrapper from "@/components/componentWrapper";
import { Switch, Button } from "@heroui/react";
export default function Settings() {
  return (
    <>
      <ComponentWrapper className="mb-6">
        <div className="flex justify-between items-center">
          <div className="font-medium text-xs">{"Enabled notificatios"}</div>
          <Switch color="success" size="sm"/>
        </div>
        <div className="flex justify-between items-center">
          <div className="font-medium text-xs">{"Dark mode"}</div>
          <Switch color="success" size="sm"/>
        </div>
        <div className="flex justify-between items-center">
          <div className="font-medium text-xs">{"Auto Refresh Dashboard"}</div>
          <Switch color="success" size="sm"/>
        </div>
      </ComponentWrapper>
      <ComponentWrapper className="mb-6">
        <div className="flex justify-self-start gap-2">
          <Button className="justify-self-start bg-white shadow text-xs font-bold">
            {"Change password"}
          </Button>
          <Button className="justify-self-start bg-white shadow text-xs font-bold">
            {"Enable Two factor authtentication"}
          </Button>
          <Button className="justify-self-start bg-white shadow text-xs font-bold">
            {"View Login history"}
          </Button>
        </div>
      </ComponentWrapper>
      <ComponentWrapper className="mb-6">
        <div className="flex justify-self-start gap-6">
          <Button className="justify-self-start bg-white shadow text-xs font-bold">
            {"Export Data"}
          </Button>
        </div>
      </ComponentWrapper>
    </>
  );
}
