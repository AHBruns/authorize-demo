import Index from "./index";
import {
  getAllBookEntries,
  getAllSeriesEntries,
  getAboutPageConfig,
  getLandingPageConfig,
} from "../lib/api";

export const getStaticProps = async () => {
  try {
    return {
      props: {
        books: await getAllBookEntries(true),
        series: await getAllSeriesEntries(true),
        aboutPageConfig: await getAboutPageConfig(true),
        landingPageConfig: await getLandingPageConfig(true),
      },
    };
  } catch (err) {
    console.log(err);
    return { props: {} };
  }
};

export default Index;
