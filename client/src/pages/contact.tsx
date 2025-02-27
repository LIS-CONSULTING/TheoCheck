import { useTranslation } from "react-i18next";
import { ContactForm } from "@/components/contact/ContactForm";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">{t("contact.title")}</h1>
      <p className="mb-8 text-muted-foreground">
        {t("contact.description")}
      </p>
      <ContactForm />
    </div>
  );
}