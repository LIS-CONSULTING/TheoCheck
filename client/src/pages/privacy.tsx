import { Card, CardContent } from "@/components/ui/card";

export default function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Confidentialité et Sécurité</h1>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="mb-4 text-xl font-semibold">Protection de vos données</h2>
          <p className="text-muted-foreground">
            Nous prenons très au sérieux la confidentialité de vos sermons et de vos données personnelles.
            Tous les contenus sont cryptés et traités de manière sécurisée sur nos serveurs.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="mb-4 text-xl font-semibold">Utilisation des données</h2>
          <p className="text-muted-foreground">
            Vos sermons et analyses ne sont jamais partagés avec des tiers. Ils sont
            utilisés exclusivement pour fournir les services d'analyse que vous avez demandés.
            Nous ne conservons vos données que le temps nécessaire à leur traitement.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h2 className="mb-4 text-xl font-semibold">Sécurité des comptes</h2>
          <p className="text-muted-foreground">
            L'authentification de votre compte est gérée de manière sécurisée via Firebase.
            Nous utilisons des protocoles de cryptage modernes pour protéger vos informations
            de connexion et vos données personnelles.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
