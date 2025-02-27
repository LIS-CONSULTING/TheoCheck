import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import type { Sermon } from "@shared/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { FileText, Calendar, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

export function SermonHistory() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) return;

    const sermonsQuery = query(
      collection(db, "sermons"),
      where("userId", "==", auth.currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      sermonsQuery,
      (snapshot) => {
        const sermonsData = snapshot.docs.map((doc) => ({
          id: parseInt(doc.id),
          ...doc.data()
        })) as Sermon[];
        setSermons(sermonsData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching sermons:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger l'historique des sermons",
          variant: "destructive",
        });
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [toast]);

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!sermons?.length) {
    return (
      <Card className="p-6 text-center">
        <CardTitle className="mb-2">Aucun sermon</CardTitle>
        <CardDescription>
          Commencez par soumettre un sermon pour analyse
        </CardDescription>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {sermons.map((sermon) => (
        <Card key={sermon.id} className="overflow-hidden">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl">{sermon.title}</CardTitle>
                <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {sermon.createdAt &&
                      format(new Date(sermon.createdAt), "d MMMM yyyy", {
                        locale: fr,
                      })}
                  </div>
                  {sermon.bibleReference && (
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {sermon.bibleReference}
                    </div>
                  )}
                </div>
              </div>
              <Badge variant={sermon.analysis ? "default" : "secondary"}>
                {sermon.analysis ? "Analysé" : "En cours d'analyse"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p>{sermon.content.slice(0, 200)}...</p>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/5 flex items-center justify-end gap-2 border-t p-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setLocation(`/analysis/${sermon.id}`)}
            >
              <FileText className="mr-2 h-4 w-4" />
              Voir l'analyse complète
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}