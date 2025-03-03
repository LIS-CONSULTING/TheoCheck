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
    <>
      <Link href="/analyze">
        <Button variant="ghost" className="w-full md:w-auto text-base font-medium px-6 h-12 justify-start md:justify-center">
          {t("common.analyze")}
        </Button>
      </Link>
      <Link href="/about">
        <Button variant="ghost" className="w-full md:w-auto text-base font-medium px-6 h-12 justify-start md:justify-center">
          {t("common.about")}
        </Button>
      </Link>
      <Link href="/contact">
        <Button variant="ghost" className="w-full md:w-auto text-base font-medium px-6 h-12 justify-start md:justify-center">
          {t("common.contact")}
        </Button>
      </Link>
    </>
  );

  const UserMenu = () => (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-12 w-12">
              <Settings className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel className="text-base px-3 py-2">{t("common.settings")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/settings">
              <DropdownMenuItem className="text-base px-3 py-2.5">
                {t("common.userPreferences")}
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="text-base px-3 py-2.5">
                <Languages className="mr-3 h-5 w-5" />
                <span>{t("common.language")}</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="min-w-[8rem]">
                <DropdownMenuRadioGroup value={i18n.language} onValueChange={handleLanguageChange}>
                  <DropdownMenuRadioItem value="fr" className="text-base px-3 py-2.5">
                    Français
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="en" className="text-base px-3 py-2.5">
                    English
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => auth.signOut()} 
              className="text-base px-3 py-2.5"
            >
              {t("common.logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/login">
          <Button size="lg" className="w-full md:w-auto text-base px-6 h-12">
            {t("common.login")}
          </Button>
        </Link>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-3 mr-6">
            <span className="text-2xl font-bold tracking-tight">TheoCheck</span>
          </Link>
        </div>

        {isMobile ? (
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-12 w-12 ml-4">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[380px] p-6">
              <div className="flex flex-col h-full">
                <div className="flex-1 space-y-2">
                  <NavItems />
                </div>
                <div className="pt-6 border-t">
                  <UserMenu />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <>
            <div className="hidden md:flex md:items-center md:space-x-2">
              <NavItems />
            </div>
            <div className="hidden md:flex md:items-center md:pl-4">
              <UserMenu />
            </div>
          </>
        )}
      </div>
    </nav>
  );
}