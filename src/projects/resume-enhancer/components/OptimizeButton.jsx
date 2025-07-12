import { RefreshCw, Sparkles } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store";
import { clearResumes, enhanceResume } from "../store/slices/resumeSlice";
import { cn } from "../../../utils/cn";

export const OptimizeButton = () => {
  const dispatch = useAppDispatch();
  const { originalResume, isLoading, apiKey, enhancedResume } = useAppSelector((state) => state.resume);

  const handleOptimize = () => {
    if (originalResume && apiKey) {
      dispatch(enhanceResume());
    }
  };

  const handleReset = () => {
    dispatch(clearResumes());
  };

  const isDisabled = !originalResume || !apiKey || isLoading;

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        onClick={handleOptimize}
        disabled={isDisabled}
        className={cn(
          "flex-1 flex items-center justify-center space-x-2 py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300",
          isDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-[1.02] shadow-lg hover:shadow-xl"
        )}
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Optimizing...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            <span>Optimize Resume</span>
          </>
        )}
      </button>

      {enhancedResume && (
        <button
          onClick={handleReset}
          className="flex items-center justify-center space-x-2 py-4 px-6 rounded-xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all duration-300"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Start Over</span>
        </button>
      )}
    </div>
  );
};
