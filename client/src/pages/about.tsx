import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">{t("about.title")}</h1>

      <Card className="mb-8">
        <CardContent className="pt-6 prose prose-gray dark:prose-invert">
          <p>{t("about.mission.description")}</p>
          <p className="text-xl font-semibold">{t("about.solution.title")}</p>
          <p>{t("about.solution.description")}</p>
          <blockquote className="border-l-4 pl-4 italic">
            "{t("about.quote.text")}" {t("about.quote.author")}
          </blockquote>
          <p>{t("about.future.text")}</p>
          <p>{t("about.commitment.text")}</p>
          <p className="text-lg font-semibold">{t("about.tagline")}</p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="pt-6 prose prose-gray dark:prose-invert">
          <h2 className="text-xl font-semibold mb-4">{t("about.team.title")}</h2>
          <p>{t("about.team.description")}</p>
          <div className="mt-6 space-y-8">
            <div>
              <h3 className="font-semibold">{t("about.team.members.stephane.name")}</h3>
              <p>{t("about.team.members.stephane.description")}</p>
            </div>
            <div>
              <h3 className="font-semibold">{t("about.team.members.lev.name")}</h3>
              <p>{t("about.team.members.lev.description")}</p>
            </div>
            <div>
              <h3 className="font-semibold">{t("about.team.members.ivan.name")}</h3>
              <p>{t("about.team.members.ivan.description")}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}