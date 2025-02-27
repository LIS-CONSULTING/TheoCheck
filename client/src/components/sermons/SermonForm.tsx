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

export function SermonForm() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();

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
        title: "Success",
        description: "Votre sermon a été soumis avec succès pour analyse",
      });
      form.reset();
      setLocation(`/history`);
    },
    onError: (error: any) => {
      console.error("Sermon submission error:", error);
      let errorMessage = "Une erreur s'est produite lors de l'analyse";

      // Check if the error contains a message property
      if (error.message) {
        if (error.message.includes("429")) {
          errorMessage = "Le service d'analyse est temporairement indisponible. Veuillez réessayer dans quelques minutes.";
        } else if (error.message.includes("401")) {
          errorMessage = "Erreur d'authentification. Veuillez vous reconnecter.";
        }
      }

      toast({
        title: "Erreur",
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
              <FormLabel>Titre du sermon</FormLabel>
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
              <FormLabel>Contenu du sermon</FormLabel>
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
              <FormLabel>Référence biblique (Optionnel)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. Jean 3:16" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyse en cours...
            </>
          ) : (
            "Analyser le sermon"
          )}
        </Button>
      </form>
    </Form>
  );
}