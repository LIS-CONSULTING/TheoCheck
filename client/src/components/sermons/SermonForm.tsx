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

export function SermonForm() {
  const { toast } = useToast();
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
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Your sermon has been submitted for analysis",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
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
              <FormLabel>Sermon Title</FormLabel>
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
              <FormLabel>Sermon Content</FormLabel>
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
              <FormLabel>Bible Reference (Optional)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. John 3:16" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Analyzing..." : "Analyze Sermon"}
        </Button>
      </form>
    </Form>
  );
}
