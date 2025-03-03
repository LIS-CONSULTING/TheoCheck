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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Settings, Languages, Menu } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <Button variant="ghost" onClick={() => auth.signOut()}>
        {t("common.logout")}
      </Button>
    </>
  );

  return (
    <nav className="border-b bg-background">
      <div className="mx-auto flex h-14 md:h-16 max-w-7xl items-center px-4">
        <Link href="/">
          <a className="flex items-center">
            <span className="text-xl md:text-2xl font-bold tracking-tight">TheoCheck</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="ml-2 text-xs md:text-sm bg-red-100 text-red-600 px-1.5 py-0.5 rounded-md font-medium cursor-help">
                    BETA
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-[250px] text-sm text-red-600">
                  {t("common.betaMessage")}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </a>
        </Link>

        {isMobile ? (
          <div className="ml-auto">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px]">
                <div className="flex flex-col space-y-4 py-4">
                  <NavLinks />
                  {user ? (
                    <div className="flex flex-col space-y-4">
                      <Link href="/settings">
                        <Button variant="ghost" className="w-full justify-start">
                          <Settings className="mr-2 h-4 w-4" />
                          {t("common.settings")}
                        </Button>
                      </Link>
                      <Button variant="ghost" className="w-full justify-start" onClick={() => handleLanguageChange(i18n.language === 'fr' ? 'en' : 'fr')}>
                        <Languages className="mr-2 h-4 w-4" />
                        {i18n.language === 'fr' ? 'English' : 'Français'}
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" onClick={() => auth.signOut()}>
                        {t("common.logout")}
                      </Button>
                    </div>
                  ) : (
                    <Link href="/login">
                      <Button className="w-full">{t("common.login")}</Button>
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <div className="ml-auto flex items-center space-x-4">
            <NavLinks />
            {user ? (
              <UserMenu />
            ) : (
              <Link href="/login">
                <Button>{t("common.login")}</Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}