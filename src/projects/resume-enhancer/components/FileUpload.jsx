import React, { useCallback, useState } from "react";
import { Upload, File, X, AlertCircle } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";
import { useAppDispatch } from "../store";
import { setOriginalResume } from "../store/slices/resumeSlice";

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const FileUpload = () => {
  const dispatch = useAppDispatch();
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileRead = useCallback(
    (content, fileName) => {
      if (!content.trim()) {
        setError("The file appears to be empty. Please upload a file with content.");
        return;
      }

      dispatch(setOriginalResume(content));
      setUploadedFile({ name: fileName });
      setError(null);
      console.log(`File ${fileName} uploaded successfully`);
    },
    [dispatch]
  );

  const extractTextFromPDF = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      let fullText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");
        fullText += pageText + "\n";
      }

      return fullText.trim();
    } catch (error) {
      console.error("PDF extraction error:", error);
      throw new Error("Failed to extract text from PDF. The file may be corrupted or password-protected.");
    }
  };

  const extractTextFromDOC = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });

      if (!result.value.trim()) {
        throw new Error("No text could be extracted from the document.");
      }

      return result.value;
    } catch (error) {
      console.error("DOC extraction error:", error);
      throw new Error("Failed to extract text from DOC/DOCX file. Please ensure the file is not corrupted.");
    }
  };

  const processFile = useCallback(
    async (file) => {
      setIsProcessing(true);
      setError(null);

      try {
        // Check file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          throw new Error("File size must be less than 10MB");
        }

        const fileExtension = file.name.split(".").pop()?.toLowerCase();

        // Handle text files (.txt, .md)
        if (fileExtension === "txt" || fileExtension === "md" || !fileExtension) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const content = e.target?.result;
            handleFileRead(content, file.name);
          };
          reader.onerror = () => {
            setError("Failed to read the file. Please try again.");
          };
          reader.readAsText(file);
          return;
        }

        // Handle DOC/DOCX files
        if (fileExtension === "doc" || fileExtension === "docx") {
          try {
            const extractedText = await extractTextFromDOC(file);
            handleFileRead(extractedText, file.name);
          } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to process DOC file");
          }
          return;
        }

        // Handle PDF files
        if (fileExtension === "pdf") {
          try {
            const extractedText = await extractTextFromPDF(file);
            if (extractedText.length < 50) {
              throw new Error("Very little text was extracted from the PDF. The file may be image-based or corrupted.");
            }
            handleFileRead(extractedText, file.name);
          } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to process PDF file");
          }
          return;
        }

        // Handle RTF files
        if (fileExtension === "rtf") {
          const reader = new FileReader();
          reader.onload = (e) => {
            const content = e.target?.result;
            // Basic RTF to text conversion (removes RTF formatting)
            const textContent = content
              .replace(/\\[a-z]+[0-9]*\s?/gi, "") // Remove RTF commands
              .replace(/[{}]/g, "") // Remove braces
              .replace(/\\\\/g, "\\") // Fix escaped backslashes
              .trim();

            if (textContent.length < 50) {
              setError(
                "The RTF file content seems too short or may not have been converted properly. Please try saving as .txt instead."
              );
              return;
            }

            handleFileRead(textContent, file.name);
          };
          reader.onerror = () => {
            setError("Failed to read the RTF file. Please try saving as .txt instead.");
          };
          reader.readAsText(file);
          return;
        }

        // Unsupported file type
        setError(
          `Unsupported file format: .${fileExtension}. Please upload .txt, .md, .rtf, .pdf, or .doc/.docx files.`
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while processing the file");
      } finally {
        setIsProcessing(false);
      }
    },
    [handleFileRead]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragOver(false);
      const files = Array.from(e.dataTransfer.files);
      const file = files[0];

      if (!file) {
        setError("No file was dropped. Please try again.");
        return;
      }

      processFile(file);
    },
    [processFile]
  );

  const handleFileSelect = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (file) {
        processFile(file);
      }
    },
    [processFile]
  );

  const clearFile = () => {
    setUploadedFile(null);
    setError(null);
    dispatch(setOriginalResume(""));
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
          <button onClick={() => setError(null)} className="text-red-600 hover:text-red-800 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
          isDragOver
            ? "border-blue-500 bg-blue-50/50 scale-[1.02]"
            : "border-gray-300 hover:border-blue-400 hover:bg-gray-50/50"
        } ${isProcessing ? "opacity-50 pointer-events-none" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".txt,.md,.rtf,.pdf,.doc,.docx"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          id="file-upload"
          disabled={isProcessing}
        />

        {isProcessing ? (
          <div className="space-y-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600">Processing file...</p>
          </div>
        ) : uploadedFile ? (
          <div className="flex items-center justify-center space-x-3">
            <File className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-lg font-medium text-gray-900">{uploadedFile.name}</p>
              <p className="text-sm text-gray-500">File uploaded successfully</p>
            </div>
            <button onClick={clearFile} className="p-1 rounded-full hover:bg-red-100 text-red-500 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              <Upload className={`w-12 h-12 transition-colors ${isDragOver ? "text-blue-600" : "text-gray-400"}`} />
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-900 mb-2">Drop your resume here</p>
              <p className="text-gray-600 mb-4">Or click to browse and select a file</p>
              <p className="text-sm text-gray-500">Supports .txt, .md, .rtf, .pdf, and .doc/.docx files (max 10MB)</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
