import { Link } from "react-router";
import { routesData } from "../../routes";
import { ExternalLink } from "lucide-react";

const projectsData = routesData.filter((route) => route.metadata);

export const LayoutProject = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-3">
        {projectsData?.map((project, index) => {
          const {
            id,
            path,
            metadata: { name, year, status, technologies },
          } = project;

          return (
            <div
              key={id}
              className="group bg-gray-800/30 backdrop-blur-sm border border-gray-700/20 rounded-lg p-6 hover:bg-gray-800/50 hover:border-gray-600/30 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between">
                <Link to={path} className="absolute inset-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors duration-200">
                      {name}
                    </h3>
                    <span className="text-sm text-gray-400">{year}</span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        status === "Completed" ? "bg-green-500/20 text-green-300" : "bg-yellow-500/20 text-yellow-300"
                      }`}
                    >
                      {status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gray-700/40 text-gray-300 text-xs rounded border border-gray-600/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="ml-6 text-gray-400 hover:text-white transition-colors duration-200 group-hover:text-blue-300">
                  <ExternalLink className="w-5 h-5 " />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
