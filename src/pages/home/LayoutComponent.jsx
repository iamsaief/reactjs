import { Link } from "react-router";
import { componentRoutesData } from "../../routes";

export const LayoutComponent = () => {
  return (
    <>
      <div className="mx-auto max-w-4xl">
        <div className="space-y-3 text-white">
          <ul className="list-inside list-disc space-y-2">
            {componentRoutesData?.map((component) => (
              <li key={component.id}>
                <Link
                  to={component.path}
                  className="text-blue-500 hover:underline"
                >
                  {component.metadata.name}
                </Link>
              </li>
            ))}
            <li>🛠️ Coming soon ... </li>
          </ul>
        </div>
      </div>
    </>
  );
};
