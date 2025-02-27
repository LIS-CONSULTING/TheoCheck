import { SermonForm } from "@/components/sermons/SermonForm";
import { AuthCheck } from "@/components/auth/AuthCheck";
import { useTranslation } from "react-i18next";

export default function Analyze() {
  const { t } = useTranslation();

  return (
    <AuthCheck>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="mb-8 text-3xl font-bold">{t("common.analyze")}</h1>
        <SermonForm />
      </div>
    </AuthCheck>
  );
}