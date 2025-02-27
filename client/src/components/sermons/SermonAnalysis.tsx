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
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

interface SermonAnalysisProps {
  analysis: SermonAnalysis;
  sermonId: number;
}

export function SermonAnalysisView({ analysis, sermonId }: SermonAnalysisProps) {
  const { toast } = useToast();

  const chartData = [
    { subject: "Fidélité Biblique", score: analysis.scores.fideliteBiblique },
    { subject: "Structure", score: analysis.scores.structure },
    { subject: "Application Pratique", score: analysis.scores.applicationPratique },
    { subject: "Authenticité", score: analysis.scores.authenticite },
    { subject: "Interactivité", score: analysis.scores.interactivite },
  ];

  const handleDownloadPDF = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) {
        throw new Error('Veuillez vous connecter pour télécharger le rapport');
      }

      const response = await fetch(`/api/sermons/${sermonId}/pdf`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Erreur lors du téléchargement du rapport');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analyse-sermon-${sermonId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Erreur de téléchargement:', error);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Erreur lors du téléchargement du rapport",
        variant: "destructive",
      });
    }
  };

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
              <RadarChart data={chartData}>
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
            <CardTitle>Points Forts</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-inside list-disc space-y-2">
              {analysis.strengths.map((strength, i) => (
                <li key={i}>{strength}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Points à Améliorer</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-inside list-disc space-y-2">
              {analysis.improvements.map((improvement, i) => (
                <li key={i}>{improvement}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Résumé</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{analysis.summary}</p>
          <div className="mt-6 space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Références Bibliques Clés</h4>
              <ul className="list-inside list-disc">
                {analysis.keyScriptures.map((scripture, i) => (
                  <li key={i}>{scripture}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Points d'Application</h4>
              <ul className="list-inside list-disc">
                {analysis.applicationPoints.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Tradition Théologique</h4>
              <p>{analysis.theologicalTradition}</p>
            </div>
          </div>
          <Button onClick={handleDownloadPDF} className="mt-6">
            <Download className="mr-2 h-4 w-4" />
            Télécharger le Rapport PDF
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}