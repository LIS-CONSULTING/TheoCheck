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

export function Navbar() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [language, setLanguage] = useState("fr");
  const [notifications, setNotifications] = useState({
    email: true,
    analysis: true,
  });

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    toast({
      title: "Langue modifiée",
      description: "Le changement sera effectif au prochain rechargement",
    });
  };

  const toggleNotification = (type: "email" | "analysis") => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
    toast({
      title: "Préférences de notification mises à jour",
      description: `Les notifications ${type === "email" ? "par email" : "d'analyse"} ont été ${notifications[type] ? "désactivées" : "activées"}`,
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
            <a className="text-sm font-medium">Analyser</a>
          </Link>
          <Link href="/history">
            <a className="text-sm font-medium">Historique</a>
          </Link>
          <Link href="/about">
            <a className="text-sm font-medium">À propos</a>
          </Link>
          <Link href="/contact">
            <a className="text-sm font-medium">Contact</a>
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
                  <DropdownMenuLabel>Paramètres</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/settings">
                    <DropdownMenuItem>
                      Préférences utilisateur
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Languages className="mr-2 h-4 w-4" />
                      <span>Langue et région</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuRadioGroup value={language} onValueChange={handleLanguageChange}>
                        <DropdownMenuRadioItem value="fr">Français</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Bell className="mr-2 h-4 w-4" />
                      <span>Notifications</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem onClick={() => toggleNotification("email")}>
                        {notifications.email ? "Désactiver" : "Activer"} les notifications par email
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toggleNotification("analysis")}>
                        {notifications.analysis ? "Désactiver" : "Activer"} les notifications d'analyse
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="ghost"
                onClick={() => auth.signOut()}
              >
                Déconnexion
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button>Connexion</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}