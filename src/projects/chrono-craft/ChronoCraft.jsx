import { PageMeta } from "../../components/PageMeta";
import { AgeProvider } from "./context/AgeProvider";

export const ChronoCraft = () => {
  return (
    <AgeProvider>
      <PageMeta title="Chrono Craft" />
      <h1>ChronoCraft</h1>
    </AgeProvider>
  );
};
