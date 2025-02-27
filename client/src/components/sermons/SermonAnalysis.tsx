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
import { useTranslation } from "react-i18next";
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
  const { t, i18n } = useTranslation();

  // Debug logging
  console.log("Analysis scores:", analysis.scores);

  // Transform the scores object into the format expected by the radar chart
  const chartData = [
    { subject: t("analysis.scores.biblicalFidelity"), score: analysis.scores.fideliteBiblique },
    { subject: t("analysis.scores.structure"), score: analysis.scores.structure },
    { subject: t("analysis.scores.practicalApplication"), score: analysis.scores.applicationPratique },
    { subject: t("analysis.scores.authenticity"), score: analysis.scores.authenticite },
    { subject: t("analysis.scores.interactivity"), score: analysis.scores.interactivite },
  ];

  // Debug logging
  console.log("Chart data:", chartData);

  const handleDownloadPDF = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) {
        throw new Error(t("errors.loginRequired"));
      }

      const response = await fetch(`/api/sermons/${sermonId}/pdf?language=${i18n.language}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error(t("errors.pdfDownloadFailed"));

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
      console.error('Download error:', error);
      toast({
        title: t("errors.error"),
        description: error instanceof Error ? error.message : t("errors.pdfDownloadFailed"),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("analysis.results")}</CardTitle>
          <CardDescription>
            {t("analysis.overallScore")}: {analysis.overallScore}/10
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
            <CardTitle>{t("analysis.strengths")}</CardTitle>
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
            <CardTitle>{t("analysis.improvements")}</CardTitle>
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
          <CardTitle>{t("analysis.summary")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{analysis.summary}</p>
          <div className="mt-6 space-y-4">
            <div>
              <h4 className="font-semibold mb-2">{t("analysis.keyScriptures")}</h4>
              <ul className="list-inside list-disc">
                {analysis.keyScriptures.map((scripture, i) => (
                  <li key={i}>{scripture}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">{t("analysis.applicationPoints")}</h4>
              <ul className="list-inside list-disc">
                {analysis.applicationPoints.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">{t("analysis.theologicalTradition")}</h4>
              <p>{analysis.theologicalTradition}</p>
            </div>
          </div>
          <Button onClick={handleDownloadPDF} className="mt-6">
            <Download className="mr-2 h-4 w-4" />
            {t("analysis.downloadPdf")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}