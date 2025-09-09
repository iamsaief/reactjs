import { Link } from "react-router";
import { componentRoutesData } from "../../routes";
import { cn } from "../../utils/cn";

export const LayoutComponent = () => {
  const sortedComponentData = componentRoutesData.sort((a, b) =>
    a.metadata.name.localeCompare(b.metadata.name),
  );

  return (
    <>
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {sortedComponentData?.map((component, index) => (
            <div
              key={component.id}
              className="group animate-fade-in space-y-3 rounded-lg border border-gray-700/20 bg-gray-800/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-gray-600/30 hover:bg-gray-800/50"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between">
                <Link to={component.path} className="absolute inset-0" />
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-semibold text-white transition-colors duration-200 group-hover:text-blue-300">
                    {component.metadata.name}
                  </h3>

                  <div
                    className={cn(
                      "rounded-[6px] border border-gray-600/20 bg-gray-700/40 px-2 py-1 text-xs leading-none whitespace-nowrap",
                      colorMap[index % colorMap.length],
                    )}
                  >
                    {component.metadata.tag}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {component.metadata.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className={cn(
                      "rounded border border-gray-600/20 bg-gray-700/40 px-2 py-1 text-xs text-gray-300",
                    )}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const colorMap = [
  "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "bg-green-500/20 text-green-300 border-green-500/30",
  "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  "bg-red-500/20 text-red-300 border-red-500/30",
  "bg-orange-500/20 text-orange-300 border-orange-500/30",
  "bg-pink-500/20 text-pink-300 border-pink-500/30",
  "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
];
