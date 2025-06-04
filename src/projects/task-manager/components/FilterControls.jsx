// src/components/FilterControls.jsx
import { useTasks, useTaskDispatch } from "../TaskContext";

function FilterControls() {
  const { filter, isLoading } = useTasks();
  const dispatch = useTaskDispatch();

  return (
    <div className="mb-6 flex justify-center sm:justify-start gap-2 sm:gap-3 p-2 bg-slate-800/60 rounded-lg shadow-sm">
      {["all", "active", "completed"].map((filterType) => (
        <button
          key={filterType}
          onClick={() => dispatch({ type: "SET_FILTER", payload: { filter: filterType } })}
          className={`px-3 py-2 sm:px-4 text-sm sm:text-base font-medium rounded-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500
            ${
              filter === filterType
                ? "bg-sky-500 text-white shadow-sm"
                : "bg-slate-700 hover:bg-slate-600/80 text-slate-300 hover:text-slate-100"
            }`}
          disabled={isLoading}
        >
          {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default FilterControls;
