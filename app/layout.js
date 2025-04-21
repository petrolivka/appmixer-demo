import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/lib/appmixer/appmixer.css";
import { AppmixerProvider } from "@/providers/appmixer-provider";
import Link from "next/link";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AppMixer Demo",
  description:
    "AppMixer is a platform for building and managing your app integrations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased p-4`}
      >
        <div className="h-screen">
          <header className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">My AppMixer Demo</h1>
            <div className="flex items-center gap-2">
              {/* <button>Logout</button> */}
            </div>
          </header>
          <main className="grid grid-cols-12 gap-4 h-full">
            <div className="col-span-2">
              <nav className="mt-4">
                <ul className="mt-2">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/integrations">Integrations</Link>
                  </li>
                  <li>
                    <Link href="/automations">Automations</Link>
                  </li>
                </ul>
              </nav>
              <div className="mt-4">
                <Link
                  href="https://api.pumped-jackass-32081.appmixer.cloud/flows/04b16628-547e-412c-a8e3-28030dbc5062/components/662e2189-3544-45e7-87e6-9fd65eb4f39c"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  target="_blank"
                >
                  Chat
                </Link>
              </div>
            </div>
            <div className="col-span-10">
              <div className="h-full">
                <AppmixerProvider>{children}</AppmixerProvider>
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
