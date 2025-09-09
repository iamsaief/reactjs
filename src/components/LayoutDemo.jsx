import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import Footer from "./Footer";

export default function LayoutDemo({ children, backTo = "/components" }) {
  const navigate = useNavigate();

  const canGoBack = useMemo(() => {
    try {
      return (window?.history?.state?.idx ?? 0) > 0;
    } catch {
      return false;
    }
  }, []);

  const handleBack = () => {
    if (canGoBack) navigate(-1);
    else navigate(backTo);
  };

  useEffect(() => {
    document.title = "Components | Demo";
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-slate-950 px-4 pt-14 pb-4 md:py-8">
        <div className="mb-30">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-700/30 bg-gray-800/40 px-3 py-1.5 text-sm text-gray-200 backdrop-blur-sm transition-all duration-300 hover:border-gray-600/40 hover:bg-gray-800/60"
            aria-label="Go back"
          >
            ← Back
          </button>
        </div>
        <div className="mx-auto max-h-full min-h-max w-full max-w-lg rounded-xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-800/50">
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
}
