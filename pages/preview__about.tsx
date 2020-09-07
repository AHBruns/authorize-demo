import About from "./about";
import {
  getAllBookEntries,
  getAllSeriesEntries,
  getAboutPageConfig,
  getLandingPageConfig,
} from "../lib/api";

export const getStaticProps = async () => {
  return {
    props: {
      books: await getAllBookEntries(true),
      series: await getAllSeriesEntries(true),
      aboutPageConfig: await getAboutPageConfig(true),
      landingPageConfig: await getLandingPageConfig(true),
    },
  };
};

export default About;
