import {
  getAllBookEntries,
  getAllSeriesEntries,
  getAboutPageConfig,
  getLandingPageConfig,
} from "../lib/api";
import { InferGetStaticPropsType } from "next";
import { IBookFields, ISeriesFields } from "../@types/generated/contentful";
import { Entry } from "contentful";
import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export const getStaticProps = async () => {
  return {
    props: {
      books: await getAllBookEntries(),
      series: await getAllSeriesEntries(),
      aboutPageConfig: await getAboutPageConfig(),
      landingPageConfig: await getLandingPageConfig(),
    },
  };
};

function Universe({}: {}) {
  return (
    <div className="grid grid-flow-row grid-cols-1 gap-4 p-4 sm:gap-8 sm:p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      TODO : Universe
    </div>
  );
}

function Series({ series }: { series: Entry<ISeriesFields> }) {
  return (
    <div className="grid grid-flow-row grid-cols-1 gap-4 p-4 sm:gap-8 sm:p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      <div className="col-span-1 space-y-2 sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5">
        <div>
          <Link href="/series/[id]" as={`/series/${series.sys.id}`}>
            <a className="text-3xl font-bold leading-tight tracking-wider text-white hover:text-gray-300 focus:outline-none">
              {series.fields.name}
            </a>
          </Link>
          {series.fields.tagLine && (
            <p className="text-lg font-light leading-tight tracking-widest text-gray-500">
              {series.fields.tagLine}
            </p>
          )}
        </div>
        {series.fields.description && (
          <>
            <hr className="opacity-25" />
            <div className="prose text-gray-100 max-w-none">
              {documentToReactComponents(series.fields.description)}
            </div>
          </>
        )}
      </div>
      {series.fields.books.map((book, i) => (
        <Book key={i} book={book} />
      ))}
    </div>
  );
}

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

function Books({
  books,
  series,
  aboutPageConfig,
  landingPageConfig,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const serieslessBooks = books.filter(
    ({ sys: { id } }) =>
      !series.some((series) =>
        series.fields.books.some((book) => book.sys.id === id)
      )
  );
  return (
    <div className="grid grid-flow-row grid-cols-1 gap-4 p-4 sm:gap-8 sm:p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {series.map((series, i) => (
        <div
          key={i}
          className="col-span-1 bg-gray-900 rounded-sm shadow-lg sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5"
        >
          <Series series={series} />
        </div>
      ))}
      {serieslessBooks.map((book, i) => (
        <Book key={i} book={book} />
      ))}
    </div>
  );
}

export default Books;
