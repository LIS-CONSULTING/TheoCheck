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
import { Settings, Languages, Bell } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

export function Navbar() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const [notifications, setNotifications] = useState({
    email: true,
    analysis: true,
  });

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
    toast({
      title: t("common.languageChanged"),
      description: t("common.languageChangeEffect"),
    });
  };

  const toggleNotification = (type: "email" | "analysis") => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
    toast({
      title: t("settings.notifications.updated"),
      description: t(`settings.notifications.${type}`) + " " +
        (notifications[type] ? t("settings.notifications.toggle.disable") : t("settings.notifications.toggle.enable")),
    });
  };

  return (
    <nav className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4">
        <Link href="/">
          <a className="text-2xl font-bold tracking-tight">TheoCheck</a>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
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
          {user ? (
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
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Bell className="mr-2 h-4 w-4" />
                      <span>{t("common.notifications")}</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem onClick={() => toggleNotification("email")}>
                        {notifications.email ? t("settings.notifications.toggle.disable") : t("settings.notifications.toggle.enable")} {t("settings.notifications.email")}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toggleNotification("analysis")}>
                        {notifications.analysis ? t("settings.notifications.toggle.disable") : t("settings.notifications.toggle.enable")} {t("settings.notifications.analysis")}
                      </DropdownMenuItem>
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