import { useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export default function Settings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      // Save settings logic will be implemented here
      toast({
        title: t("settings.success"),
        description: t("settings.successMessage"),
      });
    } catch (error) {
      toast({
        title: t("settings.error"),
        description: t("settings.errorMessage"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">{t("settings.title")}</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("settings.preferences.title")}</CardTitle>
            <CardDescription>
              {t("settings.preferences.description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label htmlFor="theological-tradition">{t("settings.preferences.theologicalTradition")}</Label>
                <span className="text-sm text-muted-foreground italic">
                  ({t("common.comingSoon")})
                </span>
              </div>
              <Select defaultValue="reformed" disabled>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("settings.preferences.select")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reformed">{t("settings.preferences.traditions.reformed")}</SelectItem>
                  <SelectItem value="lutheran">{t("settings.preferences.traditions.lutheran")}</SelectItem>
                  <SelectItem value="catholic">{t("settings.preferences.traditions.catholic")}</SelectItem>
                  <SelectItem value="baptist">{t("settings.preferences.traditions.baptist")}</SelectItem>
                  <SelectItem value="pentecostal">{t("settings.preferences.traditions.pentecostal")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("settings.theme.title")}</CardTitle>
            <CardDescription>
              {t("settings.theme.description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>{t("settings.theme.darkMode")}</Label>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSaveSettings} disabled={isLoading}>
            {isLoading ? t("settings.saving") : t("settings.save")}
          </Button>
        </div>
      </div>
    </div>
  );
}