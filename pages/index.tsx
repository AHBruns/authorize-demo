import { getLandingPageConfig } from "../lib/api";
import { InferGetStaticPropsType } from "next";
import { BooksCarousel } from "../components/BooksCarousel";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";
import { Hero } from "../components/Hero";
import { useRouter } from "next/router";

export const getStaticProps = async () => {
  return {
    props: {
      landingPageConfig: await getLandingPageConfig(),
    },
  };
};

export default function Index({
  landingPageConfig,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) return null;

  return (
    <div className="space-y-8 sm:space-y-16">
      <Hero
        callToAction={landingPageConfig.fields.callToAction}
        schemelessUrl={
          landingPageConfig.fields.callToActionBackground.fields.file.url
        }
      />
      {landingPageConfig.fields.briefBio && (
        <div className="bg-white">
          <div className="flex flex-col items-start max-w-5xl px-4 mx-auto md:-mt-10 md:py-24 sm:px-10 ">
            <h1 className="px-4 py-3 text-4xl font-bold leading-none text-white transform -translate-y-4 bg-gray-900 rounded-sm shadow-lg sm:text-6xl sm:translate-y-10 sm:translate-x-10 lg:-translate-x-10">
              A brief bio
            </h1>
            <div className="rounded-sm sm:shadow-2xl">
              <div className="pb-8 bg-white rounded-sm sm:p-8 sm:shadow-lg sm:pt-16">
                <div className="prose-lg max-w-none">
                  {documentToReactComponents(landingPageConfig.fields.briefBio)}
                </div>
                <div className="h-4 sm:h-8" />
                <Link href="/about">
                  <a className="px-3 py-2 text-2xl font-semibold leading-tight tracking-wider text-white bg-gray-800 rounded-sm shadow-lg hover:bg-gray-900">
                    Read More
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      {landingPageConfig.fields.carouselBooks.length > 0 && (
        <div className="px-4 sm:px-16">
          <div className="mx-auto">
            <BooksCarousel books={landingPageConfig.fields.carouselBooks} />
          </div>
        </div>
      )}
      <div className="px-4 sm:px-16">
        <div className="flex flex-col p-8 space-y-4 text-white bg-gray-900 rounded-sm shadow-lg">
          <h1 className="max-w-6xl text-2xl font-bold leading-tight tracking-wider uppercase sm:text-5xl">
            Join my Newsletter!
          </h1>
          <div className="flex flex-col space-x-0 space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row">
            <input
              className="w-full max-w-xs p-3 leading-tight tracking-wider text-gray-800 rounded-sm shadow-lg sm:text-xl focus:outline-none"
              placeholder="your email"
            ></input>
            <button className="self-start p-3 font-semibold leading-tight tracking-wider text-gray-700 whitespace-no-wrap bg-white rounded-sm shadow-lg sm:text-xl focus:outline-none hover:text-gray-900">
              Sign me up!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
