import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Améliorez vos sermons avec l'IA
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Soumettez votre sermon et recevez une analyse détaillée, des retours
          personnalisés, et des suggestions concrètes pour améliorer votre
          prédication.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/analyze">
            <Button size="lg" className="text-xl px-10 py-7 transform hover:scale-105 transition-transform">
              Analyser un sermon
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" size="lg" className="text-xl px-10 py-7 transform hover:scale-105 transition-transform">
              En savoir plus
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-32 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="text-center">
          <h3 className="mt-6 text-lg font-semibold">Analyse détaillée</h3>
          <p className="mt-2 text-muted-foreground">
            Obtenez des retours complets sur la structure, la théologie, la pertinence et l'engagement
          </p>
        </div>
        <div className="text-center">
          <h3 className="mt-6 text-lg font-semibold">Visualisations interactives</h3>
          <p className="mt-2 text-muted-foreground">
            Des graphiques interactifs pour visualiser vos points forts et axes d'amélioration
          </p>
        </div>
        <div className="text-center">
          <h3 className="mt-6 text-lg font-semibold">Suggestions concrètes</h3>
          <p className="mt-2 text-muted-foreground">
            Recevez des recommandations spécifiques pour améliorer l'efficacité de votre prédication
          </p>
        </div>
      </div>
    </div>
  );
}