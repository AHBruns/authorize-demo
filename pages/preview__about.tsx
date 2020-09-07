import About from "./about";
import { getAboutPageConfig } from "../lib/api";

export const getStaticProps = async () => {
  return {
    props: {
      aboutPageConfig: await getAboutPageConfig(true),
    },
    revalidate: 1,
  };
};

export default About;
