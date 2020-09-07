import Link from "next/link";

export function Footer() {
  return (
    <div className="flex items-center justify-center px-4 py-4 text-gray-500  /pt-24 sm:px-16">
      <p className="text-center">
        Owned by{" "}
        <Link href="/about">
          <a className="underline hover:text-gray-700">Isaac Asimov</a>
        </Link>{" "}
        &middot; Made by{" "}
        <a
          className="underline hover:text-gray-700"
          href="https://alexbruns.dev"
        >
          Alex Bruns
        </a>
      </p>
    </div>
  );
}
