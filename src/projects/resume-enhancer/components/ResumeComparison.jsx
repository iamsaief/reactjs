import { FileText, Sparkles } from "lucide-react";
import { useAppSelector } from "../store";

export const ResumeComparison = () => {
  const { originalResume, enhancedResume, isLoading } = useAppSelector((state) => state.resume);

  if (!originalResume && !enhancedResume) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Original Resume */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Original Resume</h3>
        </div>
        <div className="bg-gray-50 rounded-xl p-6 h-96 overflow-y-auto border border-gray-200">
          <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono leading-relaxed">
            {originalResume || "No content yet..."}
          </pre>
        </div>
      </div>

      {/* Enhanced Resume */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Enhanced Resume</h3>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 h-96 overflow-y-auto border border-blue-200">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-blue-600 font-medium">AI is enhancing your resume...</p>
              </div>
            </div>
          ) : enhancedResume ? (
            <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">{enhancedResume}</pre>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Click "Optimize Resume" to see the enhanced version
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
