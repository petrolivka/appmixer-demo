"use client";

import { useParams } from "next/navigation";
import { useAppmixer } from "@/providers/appmixer-provider";
import { useEffect } from "react";
export default function Flow() {
  const { flowId } = useParams();
  const { appmixer, createDesignerWidget } = useAppmixer();

  useEffect(() => {
    if (appmixer) {
      const designer = createDesignerWidget("#flow-designer");
      designer.set("flowId", flowId);
      designer.open();
    }
  }, [appmixer]);
  return <div id="flow-designer" className="relative w-full h-full"></div>;
}
