import { Heart } from "lucide-react";
import { PageMeta } from "../../components/PageMeta";
import Header from "./components/Header";
import { AgeProvider } from "./context/AgeProvider";
import AgeCard from "./components/AgeCard";
import AgeForm from "./components/AgeForm";
import { ResultsDisplay } from "./components/ResultsDisplay";

/**
 * The root component of the ChronoCraft application.
 * It sets up the main layout, provides the global state via AgeProvider,
 * and arranges the primary UI components.
 */
export const ChronoCraft = () => {
  return (
    // AgeProvider wraps the entire app, making the age calculation state
    // available to all descendant components via the AgeContext.
    <AgeProvider>
      <PageMeta title="Chrono Craft" />

      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans transition-colors duration-300 flex flex-col">
        <Header />
        <main className="container mx-auto p-4 md:p-8">
          {/* Main content area with a responsive grid layout. */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Column: Input Form */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 animate-fade-in z-1">
              <h2 className="text-2xl font-bold text-brand-primary mb-6">Calculate Your Age</h2>
              <AgeForm />
            </div>

            {/* Right Column: Results Display */}
            <div className="lg:col-span-3 animate-fade-in [animation-delay:200ms]">
              <ResultsDisplay />
              <AgeCard />
            </div>
          </div>
        </main>
        <footer className="mt-auto px-4 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
          <p className="text-gray-600 flex items-center justify-center gap-1">
            Build with <Heart className="h-4 w-4" /> by{" "}
            <a href="https://www.linkedin.com/in/saiefalemon/" className="hover:underline">
              Saief Al Emon
            </a>
          </p>
        </footer>
      </div>
    </AgeProvider>
  );
};
