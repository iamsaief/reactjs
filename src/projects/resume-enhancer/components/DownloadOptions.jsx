import { Download, FileText } from "lucide-react";
import { useAppSelector } from "../store";
import jsPDF from "jspdf";

export const DownloadOptions = () => {
  const { enhancedResume } = useAppSelector((state) => state.resume);

  if (!enhancedResume) return null;

  const downloadAsText = () => {
    const blob = new Blob([enhancedResume], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "enhanced-resume.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAsMarkdown = () => {
    const blob = new Blob([enhancedResume], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "enhanced-resume.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAsDoc = () => {
    // Create RTF format for better compatibility
    const rtfContent = `{\\rtf1\\ansi\\deff0 {\\fonttbl {\\f0 Times New Roman;}}\\f0\\fs24 ${enhancedResume.replace(
      /\n/g,
      "\\par "
    )}}`;
    const blob = new Blob([rtfContent], { type: "application/rtf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "enhanced-resume.rtf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAsPDF = () => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    const margins = 20;
    const lineHeight = 6;
    const maxLineWidth = pageWidth - margins * 2;

    // Split text into lines and handle word wrapping
    const lines = enhancedResume.split("\n");
    let yPosition = margins;

    doc.setFontSize(10);

    lines.forEach((line) => {
      if (yPosition > pageHeight - margins) {
        doc.addPage();
        yPosition = margins;
      }

      // Handle different markdown formatting
      if (line.startsWith("# ")) {
        doc.setFontSize(16);
        doc.setFont(undefined, "bold");
        const text = line.substring(2);
        const wrappedText = doc.splitTextToSize(text, maxLineWidth);
        doc.text(wrappedText, margins, yPosition);
        yPosition += wrappedText.length * lineHeight * 1.2;
        doc.setFontSize(10);
        doc.setFont(undefined, "normal");
      } else if (line.startsWith("## ")) {
        doc.setFontSize(14);
        doc.setFont(undefined, "bold");
        const text = line.substring(3);
        const wrappedText = doc.splitTextToSize(text, maxLineWidth);
        doc.text(wrappedText, margins, yPosition);
        yPosition += wrappedText.length * lineHeight * 1.1;
        doc.setFontSize(10);
        doc.setFont(undefined, "normal");
      } else if (line.startsWith("- ")) {
        const text = "• " + line.substring(2);
        const wrappedText = doc.splitTextToSize(text, maxLineWidth - 5);
        doc.text(wrappedText, margins + 5, yPosition);
        yPosition += wrappedText.length * lineHeight;
      } else if (line.trim()) {
        const wrappedText = doc.splitTextToSize(line, maxLineWidth);
        doc.text(wrappedText, margins, yPosition);
        yPosition += wrappedText.length * lineHeight;
      } else {
        yPosition += lineHeight;
      }
    });

    doc.save("enhanced-resume.pdf");
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center space-x-2 mb-4">
        <Download className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Download Enhanced Resume</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <button
          onClick={downloadAsMarkdown}
          className="flex items-center justify-center space-x-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-blue-500 transition-all"
        >
          <FileText className="w-4 h-4" />
          <span>Markdown</span>
        </button>

        <button
          onClick={downloadAsPDF}
          className="flex items-center justify-center space-x-2 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-green-500 transition-all"
        >
          <FileText className="w-4 h-4" />
          <span>PDF</span>
        </button>

        <button
          onClick={downloadAsDoc}
          className="flex items-center justify-center space-x-2 p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-purple-500 transition-all"
        >
          <FileText className="w-4 h-4" />
          <span>Doc</span>
        </button>

        <button
          onClick={downloadAsText}
          className="flex items-center justify-center space-x-2 p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-gray-500 transition-all"
        >
          <FileText className="w-4 h-4" />
          <span>Text</span>
        </button>
      </div>
    </div>
  );
};
