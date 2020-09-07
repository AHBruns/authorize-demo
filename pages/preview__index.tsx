import Index from "./index";
import { getLandingPageConfig } from "../lib/api";

export const getStaticProps = async () => {
  return {
    props: {
      landingPageConfig: await getLandingPageConfig(true),
    },
    revalidate: 1,
  };
};

export default Index;
