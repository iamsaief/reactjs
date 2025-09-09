import { useMemo } from "react";
import { AppWindow, Component, Heart } from "lucide-react";
import { useLocation, useNavigate, Outlet } from "react-router";
import { BgShapes } from "./BgShapes";
import { PageMeta } from "../../components/PageMeta";
import { SlidingTabs } from "../../components/SlidingTabs";
import Footer from "../../components/Footer";

export const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const layouts = useMemo(
    () => [
      { key: "projects", label: "Projects", icon: AppWindow, to: "/projects" },
      {
        key: "components",
        label: "Components",
        icon: Component,
        to: "/components",
      },
    ],
    [],
  );

  const keyFromPath = (pathname) =>
    pathname.startsWith("/components") ? "components" : "projects";
  const activeLayout = keyFromPath(location.pathname);

  const onSelectTab = (key) => {
    const target = layouts.find((l) => l.key === key);
    if (target) navigate(target.to);
  };

  return (
    <>
      <PageMeta title="React.js" favicon="⚛️" />

      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-950 via-slate-900 to-slate-950">
        <BgShapes />

        <main className="relative z-10 container mx-auto px-6 py-12">
          <div className="mb-12 text-center">
            <h1 className="mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-5xl/[1.2] font-bold text-transparent">
              Projects
            </h1>
            <p className="mx-auto max-w-2xl leading-relaxed text-gray-300 delay-200">
              A curated collection of React applications, components, and
              experimental projects showcasing modern web development techniques
              and creative solutions.
            </p>
          </div>

          {/* Layout Toggle */}
          <div className="mb-12 flex justify-center delay-300">
            <SlidingTabs
              items={layouts}
              activeKey={activeLayout}
              onSelect={(key) => onSelectTab(key)}
            />
          </div>

          {/* Render child routes via Outlet */}
          <div className="transition-all duration-500 ease-in-out">
            <Outlet />
          </div>

          {/* Footer */}
          <Footer />
        </main>
      </div>
    </>
  );
};
