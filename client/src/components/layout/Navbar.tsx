import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/hooks/useAuth";
import { auth } from "@/lib/firebase";

export function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4">
        <Link href="/">
          <a className="text-xl font-bold">Sermon GPT</a>
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
            <Button
              variant="ghost"
              onClick={() => auth.signOut()}
            >
              Déconnexion
            </Button>
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