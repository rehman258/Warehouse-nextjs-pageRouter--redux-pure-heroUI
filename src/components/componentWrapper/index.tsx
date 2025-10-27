import React from "react";

export default function ComponentWrapper({ children, className }:{children:React.ReactNode, className:string}) {
  return (
    <div className={`p-6 border rounded-md ${className}`}>
      <h4 className="component-title body-medium">
        {"Inventory Flow"}
      </h4>
      <p className="component-subtitle body-small text-neutral-400">
        {"Monthly inbound vs outbound trends"}
      </p>
      {children}
    </div>
  );
}
