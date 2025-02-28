import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function ErrorPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
          <h1 className="mt-4 text-2xl font-bold text-destructive">
            {t("errors.analysisError")}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {t("errors.serviceUnavailable")}
          </p>
          <div className="mt-6">
            <Link href="/analyze">
              <Button className="w-full">
                {t("common.analyze")}
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="mt-2 w-full">
                {t("common.returnHome")}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
