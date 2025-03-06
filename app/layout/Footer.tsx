import { Github, Twitter, Instagram } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="border-t bg-background px-4 w-full">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="text-center text-sm text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} company. All rights reserved.
        </div>
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <nav className="flex gap-4 text-sm">
            <Link
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </Link>
          </nav>
          <Separator orientation="vertical" className="hidden h-4 md:block" />
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="Github">
                <Github className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
