import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/hooks/useAuth";
import { auth } from "@/lib/firebase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Menu, Settings, Languages } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useBreakpoint } from "@/hooks/use-mobile";

export function Navbar() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useBreakpoint('mobile');

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
    toast({
      title: t("common.languageChanged"),
      description: t("common.languageChangeEffect"),
    });
  };

  const NavItems = () => (
    <div className="flex flex-col space-y-2">
      <Link href="/analyze">
        <Button variant="ghost" className="w-full justify-start text-base font-medium px-4 h-11">
          {t("common.analyze")}
        </Button>
      </Link>
      <Link href="/about">
        <Button variant="ghost" className="w-full justify-start text-base font-medium px-4 h-11">
          {t("common.about")}
        </Button>
      </Link>
      <Link href="/contact">
        <Button variant="ghost" className="w-full justify-start text-base font-medium px-4 h-11">
          {t("common.contact")}
        </Button>
      </Link>
    </div>
  );

  const UserMenu = () => (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Settings className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="text-base">{t("common.settings")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/settings">
              <DropdownMenuItem className="text-base py-3">
                {t("common.userPreferences")}
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="text-base py-3">
                <Languages className="mr-3 h-5 w-5" />
                <span>{t("common.language")}</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={i18n.language} onValueChange={handleLanguageChange}>
                  <DropdownMenuRadioItem value="fr" className="text-base py-3">Français</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="en" className="text-base py-3">English</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => auth.signOut()} className="text-base py-3">
              {t("common.logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/login">
          <Button size="lg" className="text-base px-6">
            {t("common.login")}
          </Button>
        </Link>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-3">
            <span className="text-2xl font-bold tracking-tight">TheoCheck</span>
          </Link>
        </div>

        {isMobile ? (
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] p-6">
              <div className="flex flex-col h-full">
                <NavItems />
                <div className="mt-auto">
                  <UserMenu />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <>
            <div className="hidden md:flex md:flex-col md:items-start md:space-y-2">
              <NavItems />
            </div>
            <div className="hidden md:flex md:items-center md:space-x-4">
              <UserMenu />
            </div>
          </>
        )}
      </div>
    </nav>
  );
}