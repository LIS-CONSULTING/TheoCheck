import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSermonSchema, type InsertSermon } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export function SermonForm() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const { t } = useTranslation();

  const form = useForm<InsertSermon>({
    resolver: zodResolver(insertSermonSchema),
    defaultValues: {
      title: "",
      content: "",
      bibleReference: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertSermon) => {
      const res = await apiRequest("POST", "/api/sermons", data);
      return res.json();
    },
    onSuccess: (data) => {
      toast({
        title: t("sermons.success"),
        description: t("sermons.submissionSuccess"),
      });
      form.reset();
      // Redirect to the analysis page
      setLocation(`/analysis/${data.id}`);
    },
    onError: (error: any) => {
      console.error("Sermon submission error:", error);
      let errorMessage = t("sermons.analysisError");

      if (error.message) {
        if (error.message.includes("429")) {
          errorMessage = t("sermons.serviceUnavailable");
        } else if (error.message.includes("401")) {
          errorMessage = t("sermons.authError");
        }
      }

      toast({
        title: t("common.error"),
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("sermons.form.title")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("sermons.form.content")}</FormLabel>
              <FormControl>
                <Textarea {...field} className="min-h-[300px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bibleReference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("sermons.form.bibleReference")}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t("sermons.form.bibleReferencePlaceholder")} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t("sermons.form.analyzing")}
            </>
          ) : (
            t("sermons.form.submit")
          )}
        </Button>
      </form>
    </Form>
  );
}