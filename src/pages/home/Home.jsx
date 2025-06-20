import { AppWindow, Component, Heart } from "lucide-react";
import { useState } from "react";
import { BgShapes } from "./BgShapes";
import { LayoutProject } from "./LayoutProject";
import { LayoutComponent } from "./LayoutComponent";
import { PageMeta } from "../../components/PageMeta";

export const HomePage = () => {
  const [activeLayout, setActiveLayout] = useState("list-1");

  return (
    <>
      <PageMeta title="React.js" favicon="⚛️" />

      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-slate-950 relative overflow-hidden">
        <BgShapes />

        <main className="relative z-10 container mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl/[1.2] font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-6 animate-fade-in">
              Projects
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-200">
              A curated collection of React applications, components, and experimental projects showcasing modern web
              development techniques and creative solutions.
            </p>
          </div>

          {/* Layout Toggle */}
          <div className="flex justify-center mb-12 animate-fade-in delay-300">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full p-1 flex">
              <button
                onClick={() => setActiveLayout("list-1")}
                className={`inline-flex items-center justify-center gap-2 whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  activeLayout === "list-1"
                    ? "bg-white text-black hover:bg-gray-100"
                    : "text-gray-300 hover:text-white hover:bg-gray-700"
                }`}
              >
                <AppWindow className="w-4 h-4" />
                Projects
              </button>
              <button
                onClick={() => setActiveLayout("list-2")}
                className={`inline-flex items-center justify-center gap-2 whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  activeLayout === "list-2"
                    ? "bg-white text-black hover:bg-gray-100"
                    : "text-gray-300 hover:text-white hover:bg-gray-700"
                }`}
              >
                <Component className="w-4 h-4" />
                Components
              </button>
            </div>
          </div>

          {/* Render Layouts */}
          <div className="transition-all duration-500 ease-in-out">
            {activeLayout === "list-1" ? <LayoutProject /> : <LayoutComponent />}
          </div>

          {/* Footer */}
          <footer className="max-w-4xl mx-auto text-gray-300 border-gray-300/10 border-t mt-50 py-6 text-center">
            <p className="text-gray-500 text-sm flex items-center justify-center gap-1">
              Made with <Heart className="h-4 w-4" /> by{" "}
              <a href="https://www.linkedin.com/in/saiefalemon/" className="hover:underline">
                Saief Al Emon
              </a>
            </p>
          </footer>
        </main>
      </div>
    </>
  );
};
