import React from "react";
import Link from "next/link";

const items = [
  { text: "Home", href: "/" },
  { text: "Books", href: "/books" },
  { text: "About", href: "/about" },
  { text: "Contact", href: "/contact" },
];

function HeaderItem({ text, href }: { text: string; href: string }) {
  return (
    <Link href={href}>
      <a className="p-2 hover:text-gray-900 focus:outline-none">{text}</a>
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-20 w-full">
      <div className="flex flex-wrap items-center justify-between p-2 text-gray-700 bg-white shadow-2xl">
        <Link href="/">
          <a className="p-2 text-3xl font-semibold leading-none hover:text-gray-900">
            Isaac Asimov
          </a>
        </Link>
        <nav className="flex flex-wrap items-center tracking-wider">
          {items.map((item) => (
            <HeaderItem key={item.text} {...item} />
          ))}
        </nav>
      </div>
    </header>
  );
}
