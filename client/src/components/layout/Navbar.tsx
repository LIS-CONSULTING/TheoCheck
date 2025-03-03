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
import { Menu, Settings, Languages, X } from "lucide-react";
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
        <Button variant="ghost" className="text-sm font-medium">
          {t("common.analyze")}
        </Button>
      </Link>
      <Link href="/about">
        <Button variant="ghost" className="text-sm font-medium">
          {t("common.about")}
        </Button>
      </Link>
      <Link href="/contact">
        <Button variant="ghost" className="text-sm font-medium">
          {t("common.contact")}
        </Button>
      </Link>
    </>
  );

  const UserMenu = () => (
    <>
      {user ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>{t("common.settings")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/settings">
                <DropdownMenuItem>
                  {t("common.userPreferences")}
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Languages className="mr-2 h-4 w-4" />
                  <span>{t("common.language")}</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup value={i18n.language} onValueChange={handleLanguageChange}>
                    <DropdownMenuRadioItem value="fr">Français</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => auth.signOut()}>
                {t("common.logout")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <Link href="/login">
          <Button size="sm">{t("common.login")}</Button>
        </Link>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight">TheoCheck</span>
          </Link>
        </div>

        {isMobile ? (
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-auto md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
              <div className="flex flex-col space-y-4 py-4">
                <NavItems />
                <div className="mt-auto">
                  <UserMenu />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <>
            <div className="mr-4 hidden md:flex md:flex-1 md:items-center md:justify-between md:space-x-4">
              <div className="flex items-center space-x-4">
                <NavItems />
              </div>
              <div className="flex items-center space-x-4">
                <UserMenu />
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}