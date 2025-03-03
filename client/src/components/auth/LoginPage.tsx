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
    <div className="min-h-screen w-full px-4 py-8 sm:px-6 sm:py-12 md:px-8 lg:px-10 flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-[1200px] grid gap-8 lg:grid-cols-2">
        <Card className="w-full shadow-lg">
          <CardHeader className="space-y-3 p-6 sm:p-8">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-center lg:text-left">
              Bienvenue sur TheoCheck
            </CardTitle>
            <CardDescription className="text-base sm:text-lg text-center lg:text-left">
              Connectez-vous pour commencer à analyser vos sermons
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 sm:p-8">
            <Tabs defaultValue="signin" className="space-y-8">
              <TabsList className="grid w-full grid-cols-2 h-12">
                <TabsTrigger value="signin" className="text-base sm:text-lg py-3">
                  Se connecter
                </TabsTrigger>
                <TabsTrigger value="signup" className="text-base sm:text-lg py-3">
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
                          <FormLabel className="text-base sm:text-lg">Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              className="h-12 text-base sm:text-lg p-3" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-sm sm:text-base" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base sm:text-lg">Mot de passe</FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              className="h-12 text-base sm:text-lg p-3" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-sm sm:text-base" />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full h-12 text-base sm:text-lg" 
                      disabled={loading}
                    >
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
                          <FormLabel className="text-base sm:text-lg">Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              className="h-12 text-base sm:text-lg p-3" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-sm sm:text-base" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base sm:text-lg">Mot de passe</FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              className="h-12 text-base sm:text-lg p-3" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-sm sm:text-base" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base sm:text-lg">
                            Confirmer le mot de passe
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              className="h-12 text-base sm:text-lg p-3" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-sm sm:text-base" />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full h-12 text-base sm:text-lg" 
                      disabled={loading}
                    >
                      {loading ? "Inscription..." : "S'inscrire"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className={`${isTablet ? 'hidden' : 'block'} lg:block`}>
          <div className="h-full rounded-lg bg-primary/5 p-8 flex flex-col justify-center space-y-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Analysez vos sermons avec TheoCheck
            </h2>
            <ul className="space-y-6 text-base sm:text-lg">
              <li className="flex items-center gap-3">
                <span className="text-primary text-xl">✓</span>
                Analyse détaillée de la structure et du contenu
              </li>
              <li className="flex items-center gap-3">
                <span className="text-primary text-xl">✓</span>
                Graphiques interactifs pour visualiser les points forts
              </li>
              <li className="flex items-center gap-3">
                <span className="text-primary text-xl">✓</span>
                Suggestions personnalisées pour améliorer vos prédications
              </li>
              <li className="flex items-center gap-3">
                <span className="text-primary text-xl">✓</span>
                Rapports PDF téléchargeables
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}