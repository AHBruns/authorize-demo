import { Carousel } from "react-responsive-carousel";
import { IBook } from "../@types/generated/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";

export function BooksCarousel({ books }: { books: IBook[] }) {
  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      showIndicators={false}
      showArrows={true}
      autoPlay={true}
      infiniteLoop={true}
      swipeable={true}
      interval={3500}
      className="min-h-full overflow-hidden rounded-sm shadow-lg"
    >
      {books.map((carouselBook) => (
        <div
          key={carouselBook.fields.title}
          className="relative flex items-center justify-center min-h-full px-6 py-4 sm:px-10 sm:py-16"
        >
          <div
            className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black shadow-inner"
            style={{ minHeight: "120%" }}
          >
            <img
              src={`https:${carouselBook.fields.cover.fields.file.url}?fm=jpg&fl=progressive`}
              className="absolute inset-0 object-top min-w-full min-h-full transform scale-150 opacity-75"
              style={{
                filter: "blur(35px)",
              }}
            />
          </div>
          <div className="z-10 flex flex-col items-center justify-center p-4 space-y-4 bg-white rounded-sm shadow-lg /w-full /self-stretch md:w-auto sm:p-8 md:space-y-0 md:space-x-8 md:flex-row">
            <Link href="/books/[id]" as={`/books/${carouselBook.sys.id}`}>
              <a className="transition-all duration-300 ease-in-out transform hover:scale-105">
                <img
                  key={carouselBook.fields.title}
                  src={`https:${carouselBook.fields.cover.fields.file.url}?fm=jpg&fl=progressive&h=300`}
                  className="relative z-10 rounded-sm shadow-lg"
                  style={{ width: "auto" }}
                />
              </a>
            </Link>
            {carouselBook.fields.description && (
              <div className="z-10 self-stretch hidden max-h-full overflow-y-hidden break-words sm:break-normal sm:block">
                <div className="flex flex-col items-start self-stretch justify-start max-w-3xl">
                  <h1 className="text-3xl font-semibold leading-tight tracking-wider text-left text-gray-700">
                    {carouselBook.fields.title}
                  </h1>
                  <div className="max-w-full prose text-left sm:prose-lg">
                    {documentToReactComponents(carouselBook.fields.description)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </Carousel>
  );
}
