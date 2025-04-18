"use client";

import { useEffect } from "react";
import { useAppmixer } from "@/providers/appmixer-provider";

export default function Home() {
  const { appmixer, createIntegrationsWidget, createWizardWidget } =
    useAppmixer();

  useEffect(() => {
    if (appmixer) {
      const integrations = createIntegrationsWidget("#integrations", {
        showHeader: true,
      });

      const wizard = createWizardWidget();

      integrations.on("integration:create", (templateId) => {
        wizard.close();
        wizard.set("flowId", templateId);
        wizard.open();
      });

      integrations.on("integration:edit", (integrationId) => {
        wizard.close();
        wizard.set("flowId", integrationId);
        wizard.open();
      });

      wizard.on("flow:start-after", () => integrations.reload());
      wizard.on("flow:remove-after", () => {
        integrations.reload();
        wizard.close();
      });

      integrations.open();
    }
  }, [appmixer]);

  return <div id="integrations" className="relative w-full h-full"></div>;
}
