"use client";

import { useParams } from "next/navigation";
import { useAppmixer } from "@/providers/appmixer-provider";
import { useEffect, useRef } from "react";

export default function Flow() {
  const { flowId } = useParams();
  const { appmixer, createDesignerWidget } = useAppmixer();
  const designerRef = useRef(null);

  useEffect(() => {
    if (appmixer && designerRef.current) {
      const designer = createDesignerWidget(designerRef.current);
      designer.set("flowId", flowId);
      designer.open();
    }
  }, [appmixer, flowId, createDesignerWidget]);

  return (
    <div
      id="flow-designer"
      ref={designerRef}
      className="relative w-full h-full"
    ></div>
  );
}
