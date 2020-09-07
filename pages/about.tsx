import { getAboutPageConfig } from "../lib/api";
import { InferGetStaticPropsType } from "next";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export const getStaticProps = async () => {
  return {
    props: {
      aboutPageConfig: await getAboutPageConfig(),
    },
  };
};

function About({
  aboutPageConfig,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="max-w-6xl px-4 py-8 mx-auto space-y-8 sm:py-16">
      <h1 className="text-4xl font-bold leading-tight tracking-wider text-center text-gray-800 uppercase sm:text-5xl md:text-left">
        {aboutPageConfig.fields.header}
      </h1>
      <div className="flex flex-col items-center md:block">
        <img
          src={`https:${aboutPageConfig.fields.headshot.fields.file.url}?fm=jpg&fl=progressive&h=500`}
          className="float-left mb-8 rounded-sm shadow-2xl md:mb-4 md:mr-10"
        />
        <div className="prose max-w-none">
          {documentToReactComponents(aboutPageConfig.fields.description)}
        </div>
      </div>
    </div>
  );
}

export default About;
