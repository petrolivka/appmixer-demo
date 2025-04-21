"use client";
import { useAppmixer } from "@/providers/appmixer-provider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Automations() {
  const { appmixer, createFlowManagerWidget, createDesignerWidget } =
    useAppmixer();
  const router = useRouter();

  useEffect(() => {
    if (appmixer) {
      const options = {
        menu: [
          { event: "flow:open", label: "Open" },
          { event: "flow:rename", label: "Rename" },
          { event: "flow:remove", label: "Remove" },
        ],
      };
      const flowManager = createFlowManagerWidget("#flow-manager", {
        options: options,
      });

      flowManager.on("flow:open", (flowId) => {
        flowManager.close();
        router.push(`/automations/${flowId}`);
      });

      flowManager.open();
    }
  }, [appmixer]);

  return <div id="flow-manager" className="relative w-full h-full"></div>;
}
