export default function Home() {
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
    </div>
  );
}
