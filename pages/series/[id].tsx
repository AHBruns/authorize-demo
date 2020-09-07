import { getSeriesEntry, getAllSeriesEntries } from "../../lib/api";
import { InferGetStaticPropsType, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";
import { Entry } from "contentful";
import { IBookFields } from "../../@types/generated/contentful";
import { BuyLinks } from "../../components/BuyLinks";

export const getStaticProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  return {
    props: {
      series: await getSeriesEntry(
        id.startsWith("preview__") ? id.slice(9) : id,
        id.startsWith("preview__")
      ),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: (await getAllSeriesEntries()).map((series) => ({
      params: { id: series.sys.id },
    })),
    fallback: true,
  };
};

function Book({ book }: { book: Entry<IBookFields> }) {
  return (
    <div className="flex items-center justify-center p-6 bg-gray-800 rounded-sm shadow-lg">
      <Link href="/books/[id]" as={`/books/${book.sys.id}`}>
        <a className="focus:outline-none">
          <img
            src={`https:${book.fields.cover.fields.file.url}?q=50&fm=jpg&fl=progressive`}
            className="transition-all duration-300 ease-in-out transform rounded-sm shadow-lg hover:scale-105"
          />
        </a>
      </Link>
    </div>
  );
}

function SeriesById({
  series,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) return null;

  return (
    <div>
      <div className="relative py-56 overflow-hidden bg-gray-900">
        {series.fields.splashArt && (
          <img
            src={`https:${series.fields.splashArt.fields.file.url}`}
            className="absolute inset-0 object-cover object-center h-full min-w-full min-h-full mx-auto opacity-50"
          />
        )}
        <div className="relative z-10 flex items-center justify-center max-w-5xl p-4 mx-auto">
          <h1 className="text-5xl font-bold leading-tight tracking-wider text-center text-white sm:text-6xl">
            {series.fields.name}
          </h1>
        </div>
      </div>
      <div className="p-8 space-y-8">
        {(series.fields.tagLine || series.fields.description) && (
          <div className="max-w-5xl mx-auto space-y-4">
            {series.fields.tagLine && (
              <h2 className="text-4xl font-bold leading-tight tracking-wider text-gray-800">
                {series.fields.tagLine}
              </h2>
            )}
            {series.fields.description && (
              <div className="prose max-w-none">
                {documentToReactComponents(series.fields.description)}
              </div>
            )}
          </div>
        )}
        <div className="grid grid-flow-row grid-cols-1 gap-4 p-4 bg-gray-900 rounded-sm shadow-lg sm:gap-8 sm:p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {series.fields.books.map((book, i) => (
            <Book key={i} book={book} />
          ))}
        </div>
        {series.fields.buyLinks && (
          <BuyLinks buyLinks={series.fields.buyLinks} />
        )}
      </div>
    </div>
  );
}

export default SeriesById;
