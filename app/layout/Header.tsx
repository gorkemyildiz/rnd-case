import Image from "next/image";
import Link from "next/link";
import React from "react";
import Navbar from "./Navbar";
import ToggleThemeButton from "./ToggleThemeButton";

const Header = () => {
  return (
    <div className="flex justify-between w-full h-15 bg-slate-100 dark:bg-slate-950 sticky top-0 left-0 right-0 z-50">
      <div className="flex items-center px-4">
        <Link href="/">
          <Image
            width={100}
            height={100}
            src="/logo.png"
            alt="Logo"
            className="flex dark:hidden"
          />
          <Image
            width={100}
            height={100}
            src="/logo-white.png"
            alt="Logo"
            className="hidden dark:flex"
          />
        </Link>
      </div>
      <Navbar />

      <div className="items-center px-4 hidden md:flex">
        <ToggleThemeButton />
      </div>
    </div>
  );
};

export default Header;
