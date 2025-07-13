import { useContext, useMemo, memo } from "react";
import { AgeContext } from "../context/AgeProvider";

const QuoteIcon = () => (
  <svg
    className="w-8 h-8 text-[rgb(79_70_229)]/30"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 18 14"
  >
    <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
  </svg>
);

const AgeCard = () => {
  const context = useContext(AgeContext);
  if (!context) return null;

  const { state } = context;
  const { name, age, quote, isLoadingQuote, dob } = state;

  if (!dob) return null;

  const shareText = () => {
    if (!age) return "";
    return `I'm ${age.years} years, ${age.months} months, and ${age.days} days old! Check out your age on ChronoCraft. Quote of the day: "${quote}"`;
  };

  const handleDownload = () => {
    alert(
      "In a real application, this would use a library like html2canvas to capture the card below as an image and trigger a download. This functionality is omitted to adhere to project constraints."
    );
  };

  return (
    <div className="mt-8 animate-slide-up [animation-delay:300ms]">
      <div
        id="age-card"
        className="p-8 bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-800 dark:to-purple-900 rounded-2xl shadow-2xl text-white relative overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-16 -left-10 w-48 h-48 bg-white/10 rounded-full"></div>

        <div className="relative z-10">
          <h3 className="text-2xl font-bold">{name || "Your Age Card"}</h3>
          {age && (
            <p className="text-4xl font-light mt-4">
              <span className="font-bold">{age.years}</span> years, <span className="font-bold">{age.months}</span>{" "}
              months, <span className="font-bold">{age.days}</span> days
            </p>
          )}

          <div className="mt-8 pt-6 border-t border-white/20">
            <QuoteIcon />
            {isLoadingQuote ? (
              <div className="h-6 mt-2 bg-white/20 rounded-md animate-pulse w-3/4"></div>
            ) : (
              <blockquote className="text-lg italic mt-2 text-indigo-100">"{quote}"</blockquote>
            )}
            <p className="text-right text-sm mt-2 text-indigo-200/70">- Gemini AI</p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={handleDownload}
          className="w-full sm:w-auto px-6 py-2 font-semibold text-white bg-[rgb(79_70_229)] hover:bg-[rgb(99_102_241)] rounded-lg shadow-md transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[rgb(79_70_229)] dark:focus-visible:ring-offset-slate-900"
        >
          Download Card
        </button>
        <div className="flex items-center gap-2">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-[rgb(79_70_229)] dark:hover:text-[rgb(99_102_241)] transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.213 3.803 4.653-.7.193-1.444.248-2.22.083.621 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.588-7.52 2.588-.49 0-.974-.03-1.451-.086 2.685 1.723 5.874 2.73 9.282 2.73 11.218 0 17.359-9.282 17.359-17.359 0-.264-.006-.527-.017-.789.938-.678 1.758-1.522 2.405-2.5z"></path>
            </svg>
          </a>
          <a
            href={`mailto:?subject=My Age Calculation&body=${encodeURIComponent(shareText)}`}
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-[rgb(79_70_229)] dark:hover:text-[rgb(99_102_241)] transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default memo(AgeCard);
