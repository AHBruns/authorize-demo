import { GetStaticPaths, InferGetStaticPropsType } from "next";
import {
  getAboutPageConfig,
  getLandingPageConfig,
  getBookEntry,
  getAllSeriesEntries,
} from "../../lib/api";
import { useRouter } from "next/router";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BuyLinks } from "../../components/BuyLinks";

export const getStaticProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  return {
    props: {
      book: await getBookEntry(
        id.startsWith("preview__") ? id.slice(9) : id,
        id.startsWith("preview__")
      ),
      series: await getAllSeriesEntries(true),
      aboutPageConfig: await getAboutPageConfig(true),
      landingPageConfig: await getLandingPageConfig(true),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

function BookById({
  book,
  series,
  aboutPageConfig,
  landingPageConfig,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) return null;

  return (
    <div>
      <div className="relative overflow-hidden bg-gray-900">
        <img
          src={`https:${book.fields.cover.fields.file.url}`}
          className="absolute inset-0 object-cover object-center h-full min-w-full min-h-full mx-auto opacity-50"
          style={{ filter: "blur(25px)" }}
        />
        <div className="flex flex-col items-center justify-center max-w-5xl py-16 mx-auto space-y-8">
          <img
            src={`https:${book.fields.cover.fields.file.url}`}
            className="relative z-10 rounded-sm shadow-2xl h-96"
          />
          <div className="relative z-10 text-center text-white">
            <h1 className="px-4 py-1 text-5xl font-bold leading-tight tracking-wider text-center text-white rounded-sm sm:text-6xl">
              {book.fields.title}
            </h1>
            <p className="leading-tight tracking-wider">
              By: {book.fields.authors.join(", ")}
            </p>
          </div>
        </div>
      </div>
      <div className="p-4 mx-auto space-y-8 sm:p-8">
        {book.fields.description && (
          <div className="max-w-5xl mx-auto prose">
            {documentToReactComponents(book.fields.description)}
          </div>
        )}
        {book.fields.buyLinks && <BuyLinks buyLinks={book.fields.buyLinks} />}
      </div>
    </div>
  );
}

export default BookById;
