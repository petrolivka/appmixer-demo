"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import "@/lib/appmixer/appmixer.css";

let appmixer = null;

export default function Home() {
  const [isBrowser, setIsBrowser] = useState(false);
  //const [appmixer, setAppmixer] = useState(null);

  const ensureToken = async () => {
    if (!appmixer) {
      return;
    }

    const auth = await appmixer.api.authenticateUser(
      process.env.NEXT_PUBLIC_VIRTUAL_USER_NAME,
      process.env.NEXT_PUBLIC_VIRTUAL_USER_TOKEN
    );

    appmixer.set("accessToken", auth.token);
  };

  useEffect(() => {
    setIsBrowser(true);

    if (typeof window !== "undefined") {
      import("@/lib/appmixer/appmixer.es.js").then(
        ({ Appmixer, Integrations, Wizard }) => {
          appmixer = new Appmixer({
            baseUrl: "https://api.pumped-jackass-32081.appmixer.cloud",
          });

          ensureToken();

          appmixer.ui("Integrations", Integrations);
          appmixer.ui("Wizard", Wizard);

          const integrations = appmixer.ui.Integrations({
            el: "#integrations",
            options: {
              showHeader: true,
            },
          });
          const wizard = appmixer.ui.Wizard();
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

          integrations.open();
        }
      );
    }

    return () => {
      //
    };
  }, []);

  const handleOnTestIntegrationClick = () => {
    appmixer.api.sendAppEvent("test-event", {
      first: "John",
      last: "Doe",
      hotLead: true,
    });
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
