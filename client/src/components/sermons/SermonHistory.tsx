import { useQuery } from "@tanstack/react-query";
import type { Sermon } from "@shared/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";

export function SermonHistory() {
  const { data: sermons, isLoading } = useQuery<Sermon[]>({
    queryKey: ["/api/sermons"],
  });

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!sermons?.length) {
    return (
      import { Link } from "wouter";

<div className="text-center py-12">
        <p className="text-lg text-muted-foreground mb-4">Vous n'avez pas encore soumis de sermon.</p>
        <Link href="/analyze">
          <Button>Soumettre votre premier sermon</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sermons?.map((sermon) => (
        <Card key={sermon.id}>
          <CardHeader>
            <CardTitle>{sermon.title}</CardTitle>
            <CardDescription>
              {sermon.createdAt && format(new Date(sermon.createdAt), "PPP")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {sermon.content.slice(0, 200)}...
            </p>
            {sermon.analysis && (
              <div className="mt-4">
                <p className="font-medium">
                  Overall Score: {sermon.analysis.overallScore}/10
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}