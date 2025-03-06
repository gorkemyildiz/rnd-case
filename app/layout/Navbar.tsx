import { Home, Heart, Menu } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  {
    name: "Home",
    link: "/",
    icon: <Home size={14} />,
  },
  {
    name: "Favorites",
    link: "/favorites",
    icon: <Heart size={14} />,
  },
];

const NavbarItem = ({
  name,
  link,
  icon,
}: {
  name: string;
  link: string;
  icon: React.ReactNode;
}) => {
  return (
    <li>
      <Link href={link} className="flex items-center gap-1 hover:opacity-75">
        {icon}
        <span className="text-sm font-semibold">{name}</span>
      </Link>
    </li>
  );
};

const Navbar = () => {
  return (
    <nav className="flex items-center px-4">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <Menu size={14} />
            </Button>
          </SheetTrigger>
          <SheetContent className="p-4">
            <SheetTitle className="border-b-2 pb-4">
              <Image
                width={80}
                height={50}
                src="/logo.png"
                alt="Logo"
                className="flex dark:hidden"
              />
              <Image
                width={80}
                height={50}
                src="/logo-white.png"
                alt="Logo"
                className="hidden dark:flex"
              />
            </SheetTitle>
            <ul className="flex flex-col gap-4">
              {navItems.map((item) => (
                <NavbarItem
                  key={item.name}
                  name={item.name}
                  link={item.link}
                  icon={item.icon}
                />
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </div>
      <ul className="hidden md:flex gap-4">
        {navItems.map((item) => (
          <NavbarItem
            key={item.name}
            name={item.name}
            link={item.link}
            icon={item.icon}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
