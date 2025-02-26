import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">À propos de Sermon GPT</h1>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="mb-4 text-xl font-semibold">Notre Mission</h2>
          <p className="text-muted-foreground">
            Sermon GPT utilise l'intelligence artificielle pour aider les
            prédicateurs à améliorer leurs sermons et leur impact. Nous croyons
            en l'alliance de la technologie moderne avec la vérité intemporelle
            pour servir l'Église plus efficacement.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h2 className="mb-4 text-xl font-semibold">Comment ça marche</h2>
          <p className="text-muted-foreground">
            Notre plateforme alimentée par l'IA analyse vos sermons selon plusieurs
            dimensions : structure, clarté théologique, pertinence pratique et
            engagement. Vous recevez des retours détaillés et des suggestions
            concrètes pour améliorer votre prédication.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}