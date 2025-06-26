import { FileText, Heart, Sparkles, Type, Upload } from "lucide-react";
import ErrorDisplay from "./components/ErrorDisplay";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/Tabs";
import { FileUpload } from "./components/FileUpload";
import { TextInput } from "./components/TextInput";

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
          {/* Error Display */}
          <ErrorDisplay />

          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <FileText className="w-6 h-6 mr-3 text-blue-600" />
              Upload Your Resume
            </h2>

            {/* Tab - Upload and Paste */}
            <Tabs defaultValue="upload" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 bg-gray-50 p-1.5 rounded-xl h-auto">
                <TabsTrigger
                  value="upload"
                  className="flex items-center justify-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 rounded-lg py-3 px-4 font-medium transition-all"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload File</span>
                </TabsTrigger>
                <TabsTrigger
                  value="text"
                  className="flex items-center justify-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 rounded-lg py-3 px-4 font-medium transition-all"
                >
                  <Type className="w-4 h-4" />
                  <span>Paste Text</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="mt-6">
                <FileUpload />
              </TabsContent>

              <TabsContent value="text" className="mt-6">
                <TextInput />
              </TabsContent>
            </Tabs>
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
