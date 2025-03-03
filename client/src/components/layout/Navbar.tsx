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
    <div className="flex flex-col gap-3">
      <Link href="/analyze">
        <Button variant="default" className="w-full justify-center text-base font-medium h-11">
          {t("common.analyze")}
        </Button>
      </Link>
      <Link href="/about">
        <Button variant="ghost" className="w-full justify-center text-base font-medium h-11">
          {t("common.about")}
        </Button>
      </Link>
      <Link href="/contact">
        <Button variant="ghost" className="w-full justify-center text-base font-medium h-11">
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
          <Button variant="outline" size="lg" className="text-base px-6">
            {t("common.login")}
          </Button>
        </Link>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center flex-1 justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold tracking-tight">TheoCheck</span>
          </Link>

          {isMobile ? (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] p-6">
                <div className="flex flex-col h-full">
                  <div className="flex-1 mt-8">
                    <NavItems />
                  </div>
                  <div className="mt-auto pb-6 pt-6 border-t">
                    <UserMenu />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <>
              <div className="flex-1 flex justify-center max-w-sm mx-4">
                <NavItems />
              </div>
              <div className="flex items-center">
                <UserMenu />
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}