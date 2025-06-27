import { useAppDispatch, useAppSelector } from "../store";
import { setOriginalResume } from "../store/slices/resumeSlice";

export const TextInput = () => {
  const dispatch = useAppDispatch();
  const originalResume = useAppSelector((state) => state.resume.originalResume);

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="resume-text" className="block text-lg font-semibold text-gray-900 mb-3">
          Paste Your Resume Text
        </label>
        <textarea
          id="resume-text"
          value={originalResume}
          onChange={(e) => dispatch(setOriginalResume(e.target.value))}
          placeholder="Paste your resume content here..."
          className="w-full h-64 p-4 border border-gray-300 rounded-xl resize-none text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <p className="text-sm text-gray-600">Copy and paste your existing resume content in plain text format</p>
    </div>
  );
};
