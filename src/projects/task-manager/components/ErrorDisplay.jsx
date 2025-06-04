// src/components/ErrorDisplay.jsx
import { AlertTriangle } from "lucide-react";

function ErrorDisplay({ message }) {
  if (!message) {
    return null;
  }

  return (
    <div
      className="bg-red-500/20 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative mb-6 flex items-center gap-3"
      role="alert"
    >
      <AlertTriangle size={24} className="flex-shrink-0" />
      <div>
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{message}</span>
      </div>
    </div>
  );
}

export default ErrorDisplay;
