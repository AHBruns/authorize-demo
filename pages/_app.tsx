import "../styles/tailwind.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Head } from "next/document";

function MyApp({ Component, pageProps }) {
  const [showingBanner, setShowingBanner] = useState(true);

  return (
    <>
      <Head>
        <title>Isaac Asimov</title>
        <meta
          name="description"
          content="Isaac Asimov immigrated with his family from Russia to the United States and became a biochemistry professor while pursuing writing. He published his first novel, Pebble in the Sky, in 1950. An immensely prolific author who penned nearly 500 books, he published influential sci-fi works like I, Robot and the Foundation trilogy, as well as books in a variety of other genres."
        />
      </Head>
      {showingBanner && (
        <div className="z-50 flex flex-row flex-wrap items-center justify-center px-4 py-2 text-green-800 bg-green-200 shadow-inner sm:justify-between">
          <p className="text-center">
            This is a demo site. You can get started with your own site{" "}
            <a href="#" className="underline hover:text-green-900">
              here
            </a>
            .
          </p>
          <button
            className="p-1 hover:text-green-900 focus:outline-none"
            onClick={() => setShowingBanner(false)}
          >
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-6 h-6 x-circle"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
      <div className="min-h-screen">
        <Header />
        <Component {...pageProps} />
        <div className="h-16" />
        <Footer />
      </div>
    </>
  );
}

export default MyApp;
