import React from "react";
import { IComponentWrapper } from "@/types/components";

export default function ComponentWrapper({ children, className, title, desc }:IComponentWrapper) {
  return (
    <div className={`self-start gap-6 flex flex-col p-6 shadow bg-white rounded-md ${className}`}>
      {
        (title || desc) &&
      <div>
        {
          title &&
          <h4 className="component-title body-medium">
            {title}
          </h4>
        }
        {
          desc && 
          <p className="component-subtitle body-small text-neutral-400">
            {desc}
          </p>
        }
      </div>
      }
      {children}
    </div>
  );
}
