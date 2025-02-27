import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// French translations
const fr = {
  common: {
    analyze: "Analyser un sermon",
    learnMore: "En savoir plus",
    login: "Connexion",
    logout: "Déconnexion",
    settings: "Paramètres",
    userPreferences: "Préférences utilisateur",
    language: "Langue et région",
    notifications: "Notifications",
    contact: "Contact",
    about: "À propos",
  },
  home: {
    title: "Analysez vos sermons avec l'IA",
    subtitle: "Soumettez votre sermon et recevez une analyse détaillée, des retours personnalisés, et des suggestions concrètes pour améliorer votre prédication.",
    features: {
      analysis: {
        title: "Analyse complète",
        description: "Évaluation détaillée de votre sermon selon plusieurs critères",
        items: [
          "Structure et cohérence",
          "Clarté théologique",
          "Pertinence et application",
          "Engagement et style"
        ]
      },
      visualization: {
        title: "Visualisation interactive",
        description: "Graphiques et statistiques pour mieux comprendre vos forces et faiblesses",
        items: [
          "Graphique radar des compétences",
          "Histogramme des points forts",
          "Analyse comparative",
          "Suivi des progrès"
        ]
      },
      report: {
        title: "Rapport détaillé",
        description: "Téléchargez un rapport complet pour approfondir votre analyse",
        items: [
          "Rapport PDF téléchargeable",
          "Conseils personnalisés",
          "Suggestions d'amélioration",
          "Ressources recommandées"
        ]
      }
    }
  },
  analysis: {
    overallScore: "Note Globale",
    strengths: "Points Forts",
    improvements: "Points à Améliorer",
    summary: "Résumé",
    keyScriptures: "Références Bibliques Clés",
    applicationPoints: "Points d'Application",
    theologicalTradition: "Tradition Théologique",
    downloadPdf: "Télécharger le Rapport PDF"
  },
  settings: {
    notifications: {
      email: "Notifications par email",
      analysis: "Notifications d'analyse",
      toggle: {
        enable: "Activer",
        disable: "Désactiver"
      }
    }
  }
};

// English translations
const en = {
  common: {
    analyze: "Analyze a Sermon",
    learnMore: "Learn More",
    login: "Login",
    logout: "Logout",
    settings: "Settings",
    userPreferences: "User Preferences",
    language: "Language & Region",
    notifications: "Notifications",
    contact: "Contact",
    about: "About",
  },
  home: {
    title: "Analyze Your Sermons with AI",
    subtitle: "Submit your sermon and receive detailed analysis, personalized feedback, and concrete suggestions to improve your preaching.",
    features: {
      analysis: {
        title: "Complete Analysis",
        description: "Detailed evaluation of your sermon across multiple criteria",
        items: [
          "Structure and coherence",
          "Theological clarity",
          "Relevance and application",
          "Engagement and style"
        ]
      },
      visualization: {
        title: "Interactive Visualization",
        description: "Charts and statistics to better understand your strengths and weaknesses",
        items: [
          "Skills radar chart",
          "Strengths histogram",
          "Comparative analysis",
          "Progress tracking"
        ]
      },
      report: {
        title: "Detailed Report",
        description: "Download a comprehensive report to deepen your analysis",
        items: [
          "Downloadable PDF report",
          "Personalized advice",
          "Improvement suggestions",
          "Recommended resources"
        ]
      }
    }
  },
  analysis: {
    overallScore: "Overall Score",
    strengths: "Strengths",
    improvements: "Areas for Improvement",
    summary: "Summary",
    keyScriptures: "Key Scripture References",
    applicationPoints: "Application Points",
    theologicalTradition: "Theological Tradition",
    downloadPdf: "Download PDF Report"
  },
  settings: {
    notifications: {
      email: "Email notifications",
      analysis: "Analysis notifications",
      toggle: {
        enable: "Enable",
        disable: "Disable"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en }
    },
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
