import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Notre Mission</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Chez Sermon-GPT, nous croyons que chaque prédicateur a un message puissant à transmettre. Notre mission est d'aider les orateurs à affiner leur prédication en alliant la richesse de la tradition chrétienne aux outils les plus avancés de l'intelligence artificielle.
          </p>
          <h2 className="text-3xl font-bold mt-12 mb-4">Sermon-GPT : L'IA au service de votre prédication</h2>
          <p className="text-lg leading-8 text-muted-foreground">
            Prêchez avec clarté, puissance et impact. Sermon-GPT analyse vos sermons en profondeur et vous offre un retour précis sur la structure, la théologie, l'application pratique et l'engagement de votre message.
          </p>
          <p className="text-xl font-semibold mt-6">
            Affinez votre prédication. Renforcez votre impact.
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
        <div className="p-6 rounded-lg bg-card hover:bg-muted/50 transition-colors">
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
        <div className="p-6 rounded-lg bg-card hover:bg-muted/50 transition-colors">
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
        <div className="p-6 rounded-lg bg-card hover:bg-muted/50 transition-colors">
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