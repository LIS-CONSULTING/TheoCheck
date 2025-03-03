import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Home() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:py-28">
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight sm:text-7xl">
          {t("home.title")}
        </h1>
        <p className="mt-4 md:mt-8 text-lg md:text-2xl leading-8 text-muted-foreground">
          {t("home.subtitle")}
        </p>
        <div className="mt-8 md:mt-12 flex items-center justify-center gap-x-4 md:gap-x-8">
          <Link href="/analyze">
            <Button 
              size={isMobile ? "default" : "lg"} 
              className={`${isMobile ? 'text-lg px-6 py-5' : 'text-2xl px-12 py-8'} transform hover:scale-105 transition-transform`}
            >
              {t("common.analyze")}
            </Button>
          </Link>
          {!isMobile && (
            <Link href="/about">
              <Button 
                variant="outline" 
                size="lg" 
                className="text-2xl px-12 py-8 transform hover:scale-105 transition-transform"
              >
                {t("common.learnMore")}
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10">
        {(['analysis', 'visualization', 'report'] as const).map((feature) => (
          <div 
            key={feature}
            className="p-4 md:p-8 rounded-lg bg-card hover:bg-muted/50 transition-colors"
          >
            <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-4 text-primary">
              {t(`home.features.${feature}.title`)}
            </h3>
            <p className="text-sm md:text-lg mb-3 md:mb-5">
              {t(`home.features.${feature}.description`)}
            </p>
            <ul className="space-y-1.5 md:space-y-3 text-muted-foreground text-sm md:text-lg">
              {(t(`home.features.${feature}.items`, { returnObjects: true }) as string[]).map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block text-primary mr-2 shrink-0">●</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}