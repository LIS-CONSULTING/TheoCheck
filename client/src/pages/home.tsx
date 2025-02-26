import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-foreground mb-8">
          Améliorez vos sermons avec l'IA
        </h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Soumettez votre sermon et recevez une analyse détaillée pour améliorer votre prédication.
        </p>

        <Link href="/analyze">
          <Button size="lg" className="text-lg px-8 py-6 transform hover:scale-105 transition-transform">
            Analyser un sermon
          </Button>
        </Link>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg bg-card">
            <h3 className="text-lg font-semibold mb-2">Analyse détaillée</h3>
            <p className="text-muted-foreground">Structure, théologie, et pertinence évaluées avec précision</p>
          </div>
          <div className="p-6 rounded-lg bg-card">
            <h3 className="text-lg font-semibold mb-2">Suggestions concrètes</h3>
            <p className="text-muted-foreground">Recommandations personnalisées pour améliorer votre message</p>
          </div>
          <div className="p-6 rounded-lg bg-card">
            <h3 className="text-lg font-semibold mb-2">Rapport complet</h3>
            <p className="text-muted-foreground">Visualisation claire des points forts et axes d'amélioration</p>
          </div>
        </div>
      </div>
    </div>
  );
}