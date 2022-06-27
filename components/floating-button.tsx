import Link from "next/link";
import React from "react";

interface IFloating {
  children: React.ReactNode;
  href: string;
}

export default function FloatingButton({ children, href }: IFloating) {
  return (
    <Link href={href}>
      <a className="fixed bottom-24 right-5 flex aspect-square h-14 w-14 cursor-pointer  items-center justify-center rounded-full border-0 border-transparent bg-orange-400 text-white shadow-xl transition-colors hover:bg-orange-500">
        {children}
      </a>
    </Link>
  );
}
