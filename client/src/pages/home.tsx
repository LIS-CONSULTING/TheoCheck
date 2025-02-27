import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-7xl px-4 py-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          {t("home.title")}
        </h1>
        <p className="mt-6 text-xl leading-8 text-muted-foreground">
          {t("home.subtitle")}
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/analyze">
            <Button size="lg" className="text-xl px-10 py-7 transform hover:scale-105 transition-transform">
              {t("common.analyze")}
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" size="lg" className="text-xl px-10 py-7 transform hover:scale-105 transition-transform">
              {t("common.learnMore")}
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 rounded-lg bg-card hover:bg-muted/50 transition-colors">
          <h3 className="text-xl font-bold mb-3 text-primary">{t("home.features.analysis.title")}</h3>
          <p className="text-base mb-4">{t("home.features.analysis.description")}</p>
          <ul className="space-y-2 text-muted-foreground">
            {t("home.features.analysis.items", { returnObjects: true }).map((item, index) => (
              <li key={index}>
                <span className="inline-block text-primary mr-2">●</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 rounded-lg bg-card hover:bg-muted/50 transition-colors">
          <h3 className="text-xl font-bold mb-3 text-primary">{t("home.features.visualization.title")}</h3>
          <p className="text-base mb-4">{t("home.features.visualization.description")}</p>
          <ul className="space-y-2 text-muted-foreground">
            {t("home.features.visualization.items", { returnObjects: true }).map((item, index) => (
              <li key={index}>
                <span className="inline-block text-primary mr-2">●</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 rounded-lg bg-card hover:bg-muted/50 transition-colors">
          <h3 className="text-xl font-bold mb-3 text-primary">{t("home.features.report.title")}</h3>
          <p className="text-base mb-4">{t("home.features.report.description")}</p>
          <ul className="space-y-2 text-muted-foreground">
            {t("home.features.report.items", { returnObjects: true }).map((item, index) => (
              <li key={index}>
                <span className="inline-block text-primary mr-2">●</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}