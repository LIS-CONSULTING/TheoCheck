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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Settings, Languages } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

export function Navbar() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
    toast({
      title: t("common.languageChanged"),
      description: t("common.languageChangeEffect"),
    });
  };

  const NavigationItems = () => (
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
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4">
        <Link href="/">
          <a className="text-2xl font-bold tracking-tight">TheoCheck</a>
        </Link>

        {/* Desktop Navigation */}
        <div className="ml-auto hidden items-center space-x-4 md:flex">
          <NavigationItems />
          {user ? (
            <UserMenu />
          ) : (
            <Link href="/login">
              <Button>{t("common.login")}</Button>
            </Link>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="ml-auto md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[300px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-4 flex flex-col space-y-4">
                <NavigationItems />
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
                      onClick={() => {
                        auth.signOut();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {t("common.logout")}
                    </Button>
                  </>
                ) : (
                  <Link href="/login">
                    <Button className="w-full">{t("common.login")}</Button>
                  </Link>
                )}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    className="flex-1"
                    onClick={() => handleLanguageChange('fr')}
                  >
                    Français
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex-1"
                    onClick={() => handleLanguageChange('en')}
                  >
                    English
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}