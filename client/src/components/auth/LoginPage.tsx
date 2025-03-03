import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { LoginForm, RegisterForm, loginSchema, registerSchema } from "@/lib/auth";
import { useBreakpoint } from "@/hooks/use-mobile";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function LoginPage() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const isTablet = useBreakpoint('tablet');

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleLogin = async (data: LoginForm) => {
    setLoading(true);
    try {
      console.log("Tentative de connexion avec:", data.email);
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      console.log("Connexion réussie:", userCredential.user.email);
      setLocation("/");
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur TheoCheck",
      });
    } catch (error: any) {
      console.error("Erreur de connexion:", error);
      let message = "Une erreur s'est produite lors de la connexion";
      if (error.code === "auth/user-not-found") {
        message = "Aucun compte trouvé avec cet email";
      } else if (error.code === "auth/wrong-password") {
        message = "Mot de passe incorrect";
      } else if (error.code === "auth/invalid-email") {
        message = "Format d'email invalide";
      }
      toast({
        title: "Erreur de connexion",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (data: RegisterForm) => {
    if (data.password !== data.confirmPassword) {
      toast({
        title: "Erreur d'inscription",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      console.log("Tentative d'inscription avec:", data.email);
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      console.log("Inscription réussie:", userCredential.user.email);
      setLocation("/");
      toast({
        title: "Inscription réussie",
        description: "Bienvenue sur TheoCheck",
      });
    } catch (error: any) {
      console.error("Erreur d'inscription:", error);
      let message = "Une erreur s'est produite lors de l'inscription";
      if (error.code === "auth/email-already-in-use") {
        message = "Un compte existe déjà avec cet email";
      } else if (error.code === "auth/invalid-email") {
        message = "Format d'email invalide";
      } else if (error.code === "auth/weak-password") {
        message = "Le mot de passe doit contenir au moins 6 caractères";
      }
      toast({
        title: "Erreur d'inscription",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-[1200px] grid gap-6 lg:grid-cols-2">
        <Card className="w-full lg:p-2 shadow-lg">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-center lg:text-left">
              Bienvenue sur TheoCheck
            </CardTitle>
            <CardDescription className="text-base sm:text-lg text-center lg:text-left">
              Connectez-vous pour commencer à analyser vos sermons
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="signin" className="text-sm sm:text-base py-2">
                  Se connecter
                </TabsTrigger>
                <TabsTrigger value="signup" className="text-sm sm:text-base py-2">
                  S'inscrire
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="space-y-6">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-6">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Email</FormLabel>
                          <FormControl>
                            <Input type="email" className="h-11" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Mot de passe</FormLabel>
                          <FormControl>
                            <Input type="password" className="h-11" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full h-11 text-base" disabled={loading}>
                      {loading ? "Connexion..." : "Se connecter"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-6">
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-6">
                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Email</FormLabel>
                          <FormControl>
                            <Input type="email" className="h-11" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Mot de passe</FormLabel>
                          <FormControl>
                            <Input type="password" className="h-11" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Confirmer le mot de passe</FormLabel>
                          <FormControl>
                            <Input type="password" className="h-11" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full h-11 text-base" disabled={loading}>
                      {loading ? "Inscription..." : "S'inscrire"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className={`${isTablet ? 'hidden' : 'block'} lg:block`}>
          <div className="space-y-6 rounded-lg bg-primary/5 p-8 h-full flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Analysez vos sermons avec TheoCheck
            </h2>
            <ul className="space-y-4 text-base sm:text-lg">
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                Analyse détaillée de la structure et du contenu
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                Graphiques interactifs pour visualiser les points forts
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                Suggestions personnalisées pour améliorer vos prédications
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                Rapports PDF téléchargeables
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}