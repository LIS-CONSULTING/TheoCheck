import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { type Sermon } from "@shared/schema";
import { SermonAnalysisView } from "@/components/sermons/SermonAnalysis";
import { SermonHeatMap } from "@/components/sermons/SermonHeatMap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Analysis() {
  const [location] = useLocation();
  const sermonId = parseInt(location.split("/")[2]); // Get sermon ID from URL

  const { data: sermon, isLoading } = useQuery<Sermon>({
    queryKey: [`/api/sermons/${sermonId}`],
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-64" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!sermon?.analysis) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle>Analyse en cours</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              L'analyse de votre sermon est en cours. Veuillez patienter quelques instants...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate sermon length in words for the heat map
  const sermonLength = sermon.content.split(/\s+/).length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Analyse du Sermon</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{sermon.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p>{sermon.content}</p>
          </div>
        </CardContent>
      </Card>
      <div className="space-y-6">
        <SermonAnalysisView analysis={sermon.analysis} sermonId={sermon.id} />
        <SermonHeatMap 
          engagementData={sermon.analysis.engagementData}
          sermonLength={sermonLength}
        />
      </div>
    </div>
  );
}