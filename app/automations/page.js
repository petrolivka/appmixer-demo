"use client";
import { useAppmixer } from "@/providers/appmixer-provider";
import { useEffect } from "react";

export default function Automations() {
  const { appmixer, createFlowManagerWidget } = useAppmixer();

  useEffect(() => {
    if (appmixer) {
      const flowManager = createFlowManagerWidget("#flow-manager");
      flowManager.open();
    }
  }, [appmixer]);

  return <div id="flow-manager" className="relative w-full h-full"></div>;
}
