"use client";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";

// import { useCartStore } from "@/provider/store/cart";
import { ModeToggle } from "./toggle/theme-toggle";
import Search from "./search/search";

interface ListItemProps {
  key: string;
  title: string;
  href: string;
  icon?: string;
  children?: React.ReactNode;
}
const NavBar = () => {
  //   const { count } = useCartStore();
  return (
    <nav className=" flex justify-between items-center  gap-3 mt-5">
      <section className="flex items-center gap-4">
        <Link href={"/"} className="hidden lg:block">
          <Image src="/logo.png" alt="logo" width={100} height={100} />
        </Link>

        <Search />
      </section>

      <section className="flex gap-1 md:gap-4 ">
        <ModeToggle />
        <Button variant={"ghost"} size={"icon"} asChild>
          <Link href="/user/cart" className="relative inline-block">
            <CiShoppingCart className="md:h-6 md:w-6 w-4 h-4" />
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {/* {count} */} 100
            </span>
          </Link>
        </Button>
        <Button variant={"ghost"} size={"icon"} asChild>
          <Link href="/user/profile">
            <FaRegUser className="md:h-6 md:w-6 w-4 h-4" />
          </Link>
        </Button>
      </section>
    </nav>
  );
};

export default NavBar;
