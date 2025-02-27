import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// French translations
const fr = {
  common: {
    analyze: "Analyser votre sermon",
    learnMore: "En savoir plus",
    login: "Connexion",
    logout: "Déconnexion",
    settings: "Paramètres",
    userPreferences: "Préférences utilisateur",
    language: "Langue et région",
    notifications: "Notifications",
    contact: "Contact",
    about: "À propos",
    languageChanged: "Langue modifiée",
    languageChangeEffect: "Les changements sont appliqués",
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
    results: "Résultats de l'Analyse",
    overallScore: "Note Globale",
    strengths: "Points Forts",
    improvements: "Points à Améliorer",
    summary: "Résumé",
    keyScriptures: "Références Bibliques Clés",
    applicationPoints: "Points d'Application",
    theologicalTradition: "Tradition Théologique",
    downloadPdf: "Télécharger le Rapport PDF",
    scores: {
      biblicalFidelity: "Fidélité Biblique",
      structure: "Structure",
      practicalApplication: "Application Pratique",
      authenticity: "Authenticité",
      interactivity: "Interactivité"
    }
  },
  about: {
    title: "À propos de TheoCheck",
    mission: {
      title: "Notre Mission",
      description: "Chez TheoCheck, nous croyons que chaque prédicateur a un message puissant à transmettre. Notre mission est d'aider les orateurs à affiner leur prédication en alliant la richesse de la tradition chrétienne aux outils les plus avancés de l'intelligence artificielle."
    },
    features: {
      title: "TheoCheck : L'IA au service de votre prédication",
      description: "Prêchez avec clarté, puissance et impact. TheoCheck analyse vos sermons en profondeur et vous offre un retour précis sur la structure, la théologie, l'application pratique et l'engagement de votre message.",
      tagline: "Affinez votre prédication. Renforcez votre impact."
    }
  },
  contact: {
    title: "Contactez-nous",
    description: "Notre équipe est là pour vous aider. N'hésitez pas à nous contacter pour toute question.",
    form: {
      name: "Nom",
      email: "Email",
      message: "Message",
      subject: "Sujet",
      submit: "Envoyer"
    }
  },
  settings: {
    notifications: {
      email: "Notifications par email",
      analysis: "Notifications d'analyse",
      updated: "Préférences mises à jour",
      toggle: {
        enable: "Activer",
        disable: "Désactiver"
      }
    }
  },
  errors: {
    error: "Erreur",
    loginRequired: "Veuillez vous connecter pour télécharger le rapport",
    pdfDownloadFailed: "Erreur lors du téléchargement du rapport"
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
    languageChanged: "Language Changed",
    languageChangeEffect: "Changes have been applied",
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
    results: "Analysis Results",
    overallScore: "Overall Score",
    strengths: "Strengths",
    improvements: "Areas for Improvement",
    summary: "Summary",
    keyScriptures: "Key Scripture References",
    applicationPoints: "Application Points",
    theologicalTradition: "Theological Tradition",
    downloadPdf: "Download PDF Report",
    scores: {
      biblicalFidelity: "Biblical Fidelity",
      structure: "Structure",
      practicalApplication: "Practical Application",
      authenticity: "Authenticity",
      interactivity: "Interactivity"
    }
  },
  about: {
    title: "About TheoCheck",
    mission: {
      title: "Our Mission",
      description: "At TheoCheck, we believe every preacher has a powerful message to convey. Our mission is to help speakers refine their preaching by combining the richness of Christian tradition with the most advanced artificial intelligence tools."
    },
    features: {
      title: "TheoCheck: AI at the Service of Your Preaching",
      description: "Preach with clarity, power, and impact. TheoCheck analyzes your sermons in depth and provides precise feedback on structure, theology, practical application, and message engagement.",
      tagline: "Refine your preaching. Strengthen your impact."
    }
  },
  contact: {
    title: "Contact Us",
    description: "Our team is here to help. Feel free to reach out with any questions.",
    form: {
      name: "Name",
      email: "Email",
      message: "Message",
      subject: "Subject",
      submit: "Send"
    }
  },
  settings: {
    notifications: {
      email: "Email notifications",
      analysis: "Analysis notifications",
      updated: "Preferences updated",
      toggle: {
        enable: "Enable",
        disable: "Disable"
      }
    }
  },
  errors: {
    error: "Error",
    loginRequired: "Please login to download the report",
    pdfDownloadFailed: "Failed to download the report"
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