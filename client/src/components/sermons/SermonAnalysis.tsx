import { type SermonAnalysis } from "@shared/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

interface SermonAnalysisProps {
  analysis: SermonAnalysis;
}

export function SermonAnalysisView({ analysis }: SermonAnalysisProps) {
  const mainChartData = [
    { subject: "Structure", score: analysis.structure },
    { subject: "Théologie", score: analysis.theology },
    { subject: "Pertinence", score: analysis.relevance },
    { subject: "Engagement", score: analysis.engagement },
  ];

  const deliveryChartData = [
    { subject: "Clarté", score: analysis.deliveryAnalysis.clarity },
    { subject: "Persuasion", score: analysis.deliveryAnalysis.persuasiveness },
    { subject: "Impact Émotionnel", score: analysis.deliveryAnalysis.emotionalImpact },
  ];

  const engagementChartData = [
    { subject: "Interactivité", score: analysis.audienceEngagement.interactivity },
    { subject: "Relatabilité", score: analysis.audienceEngagement.relatability },
    { subject: "Application Pratique", score: analysis.audienceEngagement.practicalApplication },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Résultats de l'Analyse</CardTitle>
          <CardDescription>
            Note Globale: {analysis.overallScore}/10
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer>
              <RadarChart data={mainChartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <Radar
                  name="Score"
                  dataKey="score"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Précision Biblique</CardTitle>
            <CardDescription>Score: {analysis.biblicalAccuracy.score}/10</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Références Bibliques</h4>
                <ul className="list-disc list-inside space-y-1">
                  {analysis.biblicalAccuracy.references.map((ref, i) => (
                    <li key={i}>{ref}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Suggestions d'Amélioration</h4>
                <ul className="list-disc list-inside space-y-1">
                  {analysis.biblicalAccuracy.suggestions.map((sug, i) => (
                    <li key={i}>{sug}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Structure du Contenu</CardTitle>
            <CardDescription>Score de Fluidité: {analysis.contentStructure.flowScore}/10</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Introduction</h4>
                <p className="text-sm text-muted-foreground">{analysis.contentStructure.introduction}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Points Principaux</h4>
                <ul className="list-decimal list-inside space-y-1">
                  {analysis.contentStructure.mainPoints.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Conclusion</h4>
                <p className="text-sm text-muted-foreground">{analysis.contentStructure.conclusion}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Analyse de la Présentation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <ResponsiveContainer>
                <RadarChart data={deliveryChartData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <Radar
                    name="Score"
                    dataKey="score"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <h4 className="font-medium mb-2">Suggestions d'Amélioration</h4>
              <ul className="list-disc list-inside space-y-1">
                {analysis.deliveryAnalysis.suggestions.map((sug, i) => (
                  <li key={i}>{sug}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engagement du Public</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <ResponsiveContainer>
                <RadarChart data={engagementChartData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <Radar
                    name="Score"
                    dataKey="score"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <h4 className="font-medium mb-2">Suggestions d'Amélioration</h4>
              <ul className="list-disc list-inside space-y-1">
                {analysis.audienceEngagement.suggestions.map((sug, i) => (
                  <li key={i}>{sug}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Points Clés et Résumé</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Points Clés</h4>
              <ul className="list-disc list-inside space-y-1">
                {analysis.keyPoints.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Forces</h4>
              <ul className="list-disc list-inside space-y-1">
                {analysis.strengths.map((strength, i) => (
                  <li key={i}>{strength}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Points d'Amélioration</h4>
              <ul className="list-disc list-inside space-y-1">
                {analysis.improvements.map((improvement, i) => (
                  <li key={i}>{improvement}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Résumé</h4>
              <p className="text-muted-foreground">{analysis.summary}</p>
            </div>
          </div>
          <Button className="mt-6">
            <Download className="mr-2 h-4 w-4" />
            Télécharger le Rapport PDF
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}