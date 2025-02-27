import { Card, CardContent } from "@/components/ui/card";

export default function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Confidentialité et Sécurité</h1>

      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground space-y-4">
            Nous prenons très au sérieux la confidentialité et la sécurité de vos données. 
            Tous vos sermons et données personnelles sont cryptés et traités de manière sécurisée sur nos serveurs. 
            Ces contenus ne sont jamais partagés avec des tiers et sont utilisés exclusivement pour fournir 
            les services d'analyse que vous avez demandés. Nous limitons la conservation de vos données 
            au temps strictement nécessaire à leur traitement.
          </p>
          <p className="text-muted-foreground mt-4">
            L'authentification de votre compte est gérée de manière sécurisée via Firebase, 
            et nous utilisons des protocoles de cryptage modernes pour protéger vos informations 
            de connexion et vos données personnelles à chaque étape de leur utilisation.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}