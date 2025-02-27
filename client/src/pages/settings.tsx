import { useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function Settings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      // Save settings logic will be implemented here
      toast({
        title: "Paramètres sauvegardés",
        description: "Vos préférences ont été mises à jour avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde des paramètres.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Paramètres</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Préférences d'Analyse</CardTitle>
            <CardDescription>
              Personnalisez la façon dont vos sermons sont analysés
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="theological-tradition">Tradition Théologique</Label>
              <Select defaultValue="reformed">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sélectionnez..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reformed">Réformée</SelectItem>
                  <SelectItem value="lutheran">Luthérienne</SelectItem>
                  <SelectItem value="catholic">Catholique</SelectItem>
                  <SelectItem value="baptist">Baptiste</SelectItem>
                  <SelectItem value="pentecostal">Pentecôtiste</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="auto-analyze">Analyse Automatique</Label>
              <Switch id="auto-analyze" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Gérez vos préférences de notification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Notifications par Email</Label>
              <Switch id="email-notifications" />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="analysis-complete">Analyse Terminée</Label>
              <Switch id="analysis-complete" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Langue et Région</CardTitle>
            <CardDescription>
              Personnalisez l'interface selon vos préférences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="language">Langue</Label>
              <Select defaultValue="fr">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sélectionnez..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSaveSettings} disabled={isLoading}>
            {isLoading ? "Sauvegarde..." : "Sauvegarder les changements"}
          </Button>
        </div>
      </div>
    </div>
  );
}
