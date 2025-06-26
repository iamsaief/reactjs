import { AlertCircle, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store";
import { clearError } from "../store/slices/resumeSlice";

export const ErrorDisplay = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.resume.error);

  if (!error) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3">
      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <h4 className="text-red-800 font-medium mb-1">Enhancement Failed</h4>
        <p className="text-red-700 text-sm">{error}</p>
      </div>
      <button onClick={() => dispatch(clearError())} className="text-red-600 hover:text-red-800 transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ErrorDisplay;
