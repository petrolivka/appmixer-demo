"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import "@/lib/appmixer/appmixer.css";

export default function Home() {
  const [appmixer, setAppmixer] = useState(null);
  const [widgets, setWidgets] = useState({
    integrations: null,
    wizard: null,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      (async () => {
        try {
          const { Appmixer, Integrations, Wizard } = await import(
            "@/lib/appmixer/appmixer.es.js"
          );

          // Create a local instance
          const appmixerInstance = new Appmixer({
            baseUrl: "https://api.pumped-jackass-32081.appmixer.cloud",
          });

          // First authenticate before registering UI components
          try {
            const auth = await appmixerInstance.api.authenticateUser(
              process.env.NEXT_PUBLIC_VIRTUAL_USER_NAME,
              process.env.NEXT_PUBLIC_VIRTUAL_USER_TOKEN
            );
            appmixerInstance.set("accessToken", auth.token);
            console.log("Authentication successful");
          } catch (error) {
            console.error("Authentication error:", error);
            return; // Don't proceed if authentication fails
          }

          // Register UI components AFTER authentication
          appmixerInstance.ui("Integrations", Integrations);
          appmixerInstance.ui("Wizard", Wizard);

          // Set state with the instance
          setAppmixer(appmixerInstance);

          // Create UI elements after short delay to ensure DOM is ready
          setTimeout(() => {
            try {
              const integrations = appmixerInstance.ui.Integrations({
                el: "#integrations",
                options: {
                  showHeader: true,
                },
              });

              const wizard = appmixerInstance.ui.Wizard();

              // Wire up event handlers
              wizard.on("flow:start-after", () => integrations.reload());
              wizard.on("flow:remove-after", () => {
                integrations.reload();
                wizard.close();
              });

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

              // Set widgets state
              setWidgets({
                integrations,
                wizard,
              });

              // Open the integrations panel
              integrations.open();
            } catch (err) {
              console.error("Error initializing UI components:", err);
            }
          }, 100);
        } catch (err) {
          console.error("Error loading Appmixer:", err);
        }
      })();
    }

    return () => {
      if (widgets.integrations) {
        widgets.integrations.close();
      }
      if (widgets.wizard) {
        widgets.wizard.close();
      }
    };
  }, []);

  const handleOnTestIntegrationClick = () => {
    if (appmixer) {
      appmixer.api.sendAppEvent("test-event", {
        first: "Petr",
        last: "Olivka",
        hotLead: true,
      });
    }
  };

  return (
    <div className="h-screen">
      <main className="grid grid-cols-12 gap-4 h-full">
        <div className="col-span-3">
          <h1 className="text-2xl font-bold">My Awesome SaaS</h1>
          <nav className="mt-4">
            <h2 className="text-lg font-bold">Menu</h2>
            <ul className="mt-2">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/">Home</a>
              </li>
            </ul>
          </nav>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleOnTestIntegrationClick}
            disabled={!appmixer}
          >
            Test Integration
          </button>
        </div>
        <div className="col-span-9">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
          <div className="h-full">
            <div id="integrations" className="relative w-full h-full"></div>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
