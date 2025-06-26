import { FileText, Heart, Sparkles } from "lucide-react";

export const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Resume Enhancer
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your resume into an ATS-optimized, professional document that gets you hired
          </p>
        </div>

        <div className="space-y-8">
          {/* TODO: Error Display */}

          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <FileText className="w-6 h-6 mr-3 text-blue-600" />
              Upload Your Resume
            </h2>

            {/* Tab - Upload and Paste */}
          </div>

          {/* API Configuration */}

          {/* Optimize Button */}

          {/* Resume Comparison - Only show when there's original content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Resume Comparison</h2>
          </div>

          {/* Download Options - Only show when there's enhanced resume */}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 py-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm- flex items-center justify-center gap-1">
            Build with <Heart className="h-4 w-4" /> by{" "}
            <a href="https://www.linkedin.com/in/saiefalemon/" className="hover:underline">
              Saief Al Emon
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
