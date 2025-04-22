"use client";
import Chat from "./components/Chat";

export default function Home() {
  const handleSendRecommendations = () => {
    alert("Recommendations sent");
  };
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold">Welcome to AppMixer</h1>
      <p className="text-lg">
        AppMixer is a platform for building and managing your app integrations.
      </p>
      <p>
        Start by creating an <a href="/integrations">integration</a> or{" "}
        <a href="/automations">automation</a>.
      </p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
        onClick={handleSendRecommendations}
      >
        Send Recommendations
      </button>

      <div className="mt-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Movie Recommendation Chatbot
        </h2>
        <Chat />
      </div>
    </div>
  );
}
