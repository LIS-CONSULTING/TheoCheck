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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Settings, Languages, Menu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

export function Navbar() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
    toast({
      title: t("common.languageChanged"),
      description: t("common.languageChangeEffect"),
    });
  };

  const NavLinks = () => (
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
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
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        variant="ghost"
        onClick={() => auth.signOut()}
      >
        {t("common.logout")}
      </Button>
    </>
  );

  return (
    <nav className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <a className="text-xl font-bold tracking-tight sm:text-2xl">TheoCheck</a>
        </Link>

        {/* Mobile Menu */}
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px]">
              <div className="flex flex-col space-y-4 pt-8">
                <NavLinks />
                {user ? (
                  <>
                    <Link href="/settings">
                      <Button variant="ghost" className="w-full justify-start">
                        <Settings className="mr-2 h-4 w-4" />
                        {t("common.settings")}
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => auth.signOut()}
                    >
                      {t("common.logout")}
                    </Button>
                  </>
                ) : (
                  <Link href="/login">
                    <Button className="w-full">{t("common.login")}</Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:items-center md:space-x-2">
          <NavLinks />
          {user ? (
            <UserMenu />
          ) : (
            <Link href="/login">
              <Button>{t("common.login")}</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}