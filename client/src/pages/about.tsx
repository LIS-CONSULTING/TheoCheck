import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">TheoCheck</h1>

      <Card className="mb-8">
        <CardContent className="pt-6 prose prose-gray dark:prose-invert">
          <p>
            Dans un monde où les principes de base du christianisme sont le plus souvent ignorés, 
            les églises et les pasteurs sont appelés à communiquer l'évangile avec justesse et clarté. 
            Mais comment savoir si une prédication va réellement toucher son auditoire ?
          </p>
          <p className="text-xl font-semibold">TheoCheck est la solution.</p>
          <p>
            Nous offrons une évaluation précise de vos prises de parole en nous appuyant sur des 
            critères objectifs et une analyse guidée par des principes bibliques.
          </p>
          <blockquote className="border-l-4 pl-4 italic">
            "Il n'existe aucune raison pour que la prédication de l'Évangile soit vécue comme un 
            fardeau, ni pour l'orateur ni pour son auditoire." Charles Spurgeon
          </blockquote>
          <p>
            Demain, les pasteurs ne se demanderont plus seulement "As-tu bien préparé ta prédication ?" 
            mais "Est-ce que tu l'as ThéoChecké ?"
          </p>
          <p>
            Parce que la vérité mérite d'être bien communiquée, et que la croissance spirituelle 
            passe par une évaluation constructive.
          </p>
          <p className="text-lg font-semibold">TheoCheck – Nous guidons, l'Esprit assiste.</p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="pt-6 prose prose-gray dark:prose-invert">
          <h2 className="text-xl font-semibold mb-4">Qui sommes-nous ?</h2>
          <p>
            Nous sommes une équipe désireuse de mettre la technologie au service de l'évangile.
          </p>
          <div className="mt-6 space-y-8">
            <div>
              <h3 className="font-semibold">Stéphane</h3>
              <p>
                "Des idées plein la tête, une vie professionnelle déjà bien remplie, j'ai créé il y a 
                deux ans Par L'Écoute, une société de services chrétienne friendly pour mettre mes 
                compétences au service des organisations qui servent l'évangile, et développer des 
                projets qui poursuivent le même objectif."
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Lev</h3>
              <p>
                "À 19 ans, lycéen passionné par le marketing, j'ai intégré plusieurs projets pour 
                allier mes compétences en communication et ma volonté d'aider ceux dans le besoin. 
                En lien avec la communauté des réfugiés ukrainiens, mon objectif est de proposer des 
                solutions marketing innovantes qui répondent aux besoins spécifiques de ceux qui 
                cherchent à se reconstruire et à s'intégrer. Mon but ? Créer des stratégies modernes 
                et efficaces pour faire grandir des initiatives sociales et solidaires."
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Ivan</h3>
              <p>
                "Lycéen de 18 ans, intéressé par la technologie et l'innovation, j'ai intégré 
                TheoCheck pour combiner mes compétences techniques avec l'objectif de soutenir les 
                prédicateurs. Mon but ? Proposer une solution moderne et efficace pour améliorer la 
                qualité des prédications, en offrant une analyse précise et objective."
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}