"use client";
import Chat from "./components/Chat";

export default function Home() {
  return (
    <div className="flex flex-col items-center  h-full">
      <h1 className="text-4xl font-bold">Welcome to AppMixer Demo</h1>
      <p className="text-lg">
        AppMixer is a platform for building and managing your app integrations.
      </p>
      <p>
        Start by asking about your favorite movies or creating an{" "}
        <a href="/integrations">integration</a> or{" "}
        <a href="/automations">automation</a>.
      </p>

      <div className="mt-8 w-full">
        <Chat />
      </div>
    </div>
  );
}
