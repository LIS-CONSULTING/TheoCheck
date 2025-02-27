import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">{t("about.title")}</h1>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="mb-4 text-xl font-semibold">{t("about.mission.title")}</h2>
          <p className="text-muted-foreground">
            {t("about.mission.description")}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h2 className="mb-4 text-xl font-semibold">{t("about.features.title")}</h2>
          <p className="text-muted-foreground">
            {t("about.features.description")}
          </p>
          <p className="text-muted-foreground mt-4 font-semibold">
            {t("about.features.tagline")}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}