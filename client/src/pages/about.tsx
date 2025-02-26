import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">À propos de Sermon GPT</h1>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="mb-4 text-xl font-semibold">Notre Mission</h2>
          <p className="text-muted-foreground">
            Chez Sermon-GPT, nous croyons que chaque prédicateur a un message puissant à transmettre. Notre mission est d'aider les orateurs à affiner leur prédication en alliant la richesse de la tradition chrétienne aux outils les plus avancés de l'intelligence artificielle.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h2 className="mb-4 text-xl font-semibold">Sermon-GPT : L'IA au service de votre prédication</h2>
          <p className="text-muted-foreground">
            Prêchez avec clarté, puissance et impact. Sermon-GPT analyse vos sermons en profondeur et vous offre un retour précis sur la structure, la théologie, l'application pratique et l'engagement de votre message.
          </p>
          <p className="text-muted-foreground mt-4 font-semibold">
            Affinez votre prédication. Renforcez votre impact.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}