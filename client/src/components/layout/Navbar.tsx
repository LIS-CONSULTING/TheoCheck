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
} from "@/components/ui/dropdown-menu";
import { Settings } from "lucide-react";

export function Navbar() {
  const { user } = useAuth();

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
          <Link href="/privacy">
            <a className="text-sm font-medium">Confidentialité</a>
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
                  <DropdownMenuItem>
                    Langue et région
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Notifications
                  </DropdownMenuItem>
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