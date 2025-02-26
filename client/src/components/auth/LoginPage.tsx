import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { SiGoogle } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export function LoginPage() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      console.log("Starting Google Sign In...");
      const result = await signInWithPopup(auth, provider);
      console.log("Sign in successful, user:", result.user?.email);
      setLocation("/");
    } catch (error: any) {
      console.error("Detailed sign-in error:", {
        code: error.code,
        message: error.message,
        email: error.email,
        credential: error.credential
      });

      let errorMessage = "Une erreur s'est produite lors de la connexion.";
      if (error.code === 'auth/popup-blocked') {
        errorMessage = "Le popup a été bloqué. Veuillez autoriser les popups pour ce site.";
      } else if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = "Vous avez fermé la fenêtre de connexion.";
      }

      toast({
        title: "Erreur de connexion",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 px-4">
      <div className="grid w-full max-w-[1200px] gap-6 lg:grid-cols-2">
        <Card className="lg:p-2">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Bienvenue sur Sermon GPT</CardTitle>
            <CardDescription>
              Connectez-vous pour commencer à analyser vos sermons
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Se connecter</TabsTrigger>
                <TabsTrigger value="signup">S'inscrire</TabsTrigger>
              </TabsList>
              <TabsContent value="signin" className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={signInWithGoogle}
                  disabled={loading}
                >
                  {loading ? (
                    "Connexion en cours..."
                  ) : (
                    <>
                      <SiGoogle className="mr-2 h-4 w-4" />
                      Se connecter avec Google
                    </>
                  )}
                </Button>
              </TabsContent>
              <TabsContent value="signup" className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={signInWithGoogle}
                  disabled={loading}
                >
                  {loading ? (
                    "Inscription en cours..."
                  ) : (
                    <>
                      <SiGoogle className="mr-2 h-4 w-4" />
                      S'inscrire avec Google
                    </>
                  )}
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="hidden lg:block">
          <div className="space-y-4 rounded-lg bg-primary/5 p-8">
            <h2 className="text-2xl font-bold">Analysez vos sermons avec l'IA</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                ✓ Analyse détaillée de la structure et du contenu
              </li>
              <li className="flex items-center">
                ✓ Graphiques interactifs pour visualiser les points forts
              </li>
              <li className="flex items-center">
                ✓ Suggestions personnalisées pour améliorer vos prédications
              </li>
              <li className="flex items-center">
                ✓ Rapports PDF téléchargeables
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}