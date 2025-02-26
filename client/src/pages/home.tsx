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

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 rounded-lg bg-card">
          <h3 className="text-xl font-bold mb-3 text-primary">Analyse complète</h3>
          <p className="text-base mb-4">Évaluation détaillée de votre sermon selon plusieurs critères</p>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <span className="inline-block text-primary mr-2">●</span>
              Structure et cohérence
            </li>
            <li>
              <span className="inline-block text-primary mr-2">●</span>
              Clarté théologique
            </li>
            <li>
              <span className="inline-block text-primary mr-2">●</span>
              Pertinence et application
            </li>
            <li>
              <span className="inline-block text-primary mr-2">●</span>
              Engagement et style
            </li>
          </ul>
        </div>
        <div className="p-6 rounded-lg bg-card">
          <h3 className="text-xl font-bold mb-3 text-primary">Visualisation interactive</h3>
          <p className="text-base mb-4">Graphiques et statistiques pour mieux comprendre vos forces et faiblesses</p>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <span className="inline-block text-primary mr-2">●</span>
              Graphique radar des compétences
            </li>
            <li>
              <span className="inline-block text-primary mr-2">●</span>
              Histogramme des points forts
            </li>
            <li>
              <span className="inline-block text-primary mr-2">●</span>
              Analyse comparative
            </li>
            <li>
              <span className="inline-block text-primary mr-2">●</span>
              Suivi des progrès
            </li>
          </ul>
        </div>
        <div className="p-6 rounded-lg bg-card">
          <h3 className="text-xl font-bold mb-3 text-primary">Rapport détaillé</h3>
          <p className="text-base mb-4">Téléchargez un rapport complet pour approfondir votre analyse</p>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <span className="inline-block text-primary mr-2">●</span>
              Rapport PDF téléchargeable
            </li>
            <li>
              <span className="inline-block text-primary mr-2">●</span>
              Conseils personnalisés
            </li>
            <li>
              <span className="inline-block text-primary mr-2">●</span>
              Suggestions d'amélioration
            </li>
            <li>
              <span className="inline-block text-primary mr-2">●</span>
              Ressources recommandées
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}