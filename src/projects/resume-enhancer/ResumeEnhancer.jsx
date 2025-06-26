import { Provider } from "react-redux";
import { store } from "./store";
import { Index } from "./Index";
import { PageMeta } from "../../components/PageMeta";

export const ResumeEnhancerProviderWrapper = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export const ResumeEnhancer = () => {
  return (
    <ResumeEnhancerProviderWrapper>
      <PageMeta title="Resume Enhancer" />
      <Index />
    </ResumeEnhancerProviderWrapper>
  );
};
