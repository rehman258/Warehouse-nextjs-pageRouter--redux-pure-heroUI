"use client";

import React from "react";
import ComponentWrapper from "@/components/componentWrapper";
import StatCard from "@/components/statCard";
import { Tabs,Tab } from "@heroui/react";
export default function Reports() {
  return (
    <>
      <ComponentWrapper className="mb-6">
        <ul className="flex gap-6">
          <li>
            <StatCard/>
          </li>
          <li>
            <StatCard/>
          </li>
          <li>
            <StatCard/>
          </li>
          <li>
            <StatCard/>
          </li>
          <li>
            <StatCard/>
          </li>
        </ul>
      </ComponentWrapper>
      <ComponentWrapper>
        <Tabs>
          <Tab title="Optimizations">
            {"Optimizations"}
          </Tab>
          <Tab title="Anomalies">
            {"Anomalies"}
          </Tab>
          <Tab title="Sales">
            {"Sales"}
          </Tab>
        </Tabs>
      </ComponentWrapper>
    </>
  );
}
