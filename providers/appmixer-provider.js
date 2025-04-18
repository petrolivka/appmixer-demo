"use client";

import { createContext, useContext, useEffect, useState } from "react";
import "@/lib/appmixer/appmixer.css";

const AppmixerContext = createContext(null);

export function AppmixerProvider({ children }) {
  const [appmixer, setAppmixer] = useState(null);
  const [widgets, setWidgets] = useState({
    integrations: null,
    wizard: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      (async () => {
        try {
          setIsLoading(true);
          const { Appmixer, Integrations, Wizard, FlowManager } = await import(
            "@/lib/appmixer/appmixer.es.js"
          );

          // Create a local instance
          const appmixerInstance = new Appmixer({
            baseUrl: "https://api.pumped-jackass-32081.appmixer.cloud",
          });

          // First authenticate
          try {
            const auth = await appmixerInstance.api.authenticateUser(
              process.env.NEXT_PUBLIC_VIRTUAL_USER_NAME,
              process.env.NEXT_PUBLIC_VIRTUAL_USER_TOKEN
            );
            appmixerInstance.set("accessToken", auth.token);
            console.log("Authentication successful");
          } catch (error) {
            console.error("Authentication error:", error);
            setError("Authentication failed");
            setIsLoading(false);
            return;
          }

          // Register UI components
          appmixerInstance.ui("Integrations", Integrations);
          appmixerInstance.ui("Wizard", Wizard);
          appmixerInstance.ui("FlowManager", FlowManager);

          // Set state with the instance
          setAppmixer(appmixerInstance);
          setIsLoading(false);
        } catch (err) {
          console.error("Error loading Appmixer:", err);
          setError("Failed to load Appmixer");
          setIsLoading(false);
        }
      })();
    }

    return () => {
      // Cleanup if needed
    };
  }, []);

  const createIntegrationsWidget = (el, options = {}) => {
    if (!appmixer) return null;

    try {
      const integrations = appmixer.ui.Integrations({
        el,
        options: {
          showHeader: true,
          ...options,
        },
      });
      return integrations;
    } catch (err) {
      console.error("Error creating Integrations widget:", err);
      return null;
    }
  };

  const createWizardWidget = () => {
    if (!appmixer) return null;

    try {
      return appmixer.ui.Wizard();
    } catch (err) {
      console.error("Error creating Wizard widget:", err);
      return null;
    }
  };

  const sendAppEvent = (eventName, data) => {
    if (!appmixer) return;
    appmixer.api.sendAppEvent(eventName, data);
  };

  const createFlowManagerWidget = (el, options = {}) => {
    if (!appmixer) return null;
    try {
      return appmixer.ui.FlowManager({
        el,
        ...options,
      });
    } catch (err) {
      console.error("Error creating FlowManager widget:", err);
      return null;
    }
  };

  return (
    <AppmixerContext.Provider
      value={{
        appmixer,
        isLoading,
        error,
        createIntegrationsWidget,
        createWizardWidget,
        createFlowManagerWidget,
        sendAppEvent,
      }}
    >
      {children}
    </AppmixerContext.Provider>
  );
}

export function useAppmixer() {
  const context = useContext(AppmixerContext);
  if (context === null) {
    throw new Error("useAppmixer must be used within an AppmixerProvider");
  }
  return context;
}
