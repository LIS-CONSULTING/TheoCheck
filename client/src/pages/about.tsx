import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">{t("about.title")}</h1>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="mb-4 text-xl font-semibold">{t("about.whoweare.title")}</h2>
          <p className="text-muted-foreground">
            {t("about.whoweare.description")}
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="mb-4 text-xl font-semibold">{t("about.team.title")}</h2>
          <p className="text-muted-foreground">
            {t("about.team.description")}
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {t("about.team.members", { returnObjects: true }).map((member, index) => (
              <div key={index} className="p-4 rounded-lg bg-muted/50">
                <h3 className="font-semibold mb-2">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h2 className="mb-4 text-xl font-semibold">{t("about.project.title")}</h2>
          <p className="text-muted-foreground mb-4">
            {t("about.project.description")}
          </p>
          <p className="text-muted-foreground font-semibold">
            {t("about.project.tagline")}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}