import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// French translations
const fr = {
  common: {
    analyze: "Analysez votre sermon",
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
    error: "Erreur",
    comingSoon: "bientôt disponible",
    returnHome: "Retour à l'accueil"
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
  sermons: {
    success: "Succès",
    submissionSuccess: "Votre sermon a été soumis avec succès pour analyse",
    analysisError: "Une erreur s'est produite lors de l'analyse",
    serviceUnavailable: "Le service d'analyse est temporairement indisponible. Veuillez réessayer dans quelques minutes.",
    authError: "Erreur d'authentification. Veuillez vous reconnecter.",
    form: {
      title: "Titre du sermon",
      content: "Contenu du sermon",
      bibleReference: "Référence biblique (Optionnel)",
      bibleReferencePlaceholder: "ex: Jean 3:16",
      analyzing: "Analyse en cours...",
      submit: "Analyser le sermon"
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
    },
    whoweare: {
      title: "Qui sommes-nous ?",
      description: "Chez TheoCheck, nous sommes une équipe passionnée par l'innovation au service de la prédication. Notre mission est d'aider les prédicateurs à affiner leur message en alliant la richesse de la tradition chrétienne aux outils les plus avancés de l'intelligence artificielle."
    },
    team: {
      title: "Notre Équipe",
      description: "Une équipe multidisciplinaire combinant expertise théologique et technologique.",
      members: [
        {
          name: "Dr. Thomas Laurent",
          role: "Directeur Théologique"
        },
        {
          name: "Marie Dubois",
          role: "Experte en IA"
        },
        {
          name: "Pr. Jean Martin",
          role: "Consultant en Homilétique"
        },
        {
          name: "Sarah Cohen",
          role: "Développeuse Senior"
        }
      ]
    },
    project: {
      title: "Notre Projet",
      description: "TheoCheck est né de la volonté d'accompagner les prédicateurs dans leur mission. Notre plateforme analyse vos sermons en profondeur et vous offre un retour précis sur la structure, la théologie, l'application pratique et l'engagement de votre message.",
      tagline: "Affinez votre prédication. Renforcez votre impact."
    }
  },
  contact: {
    title: "Contactez-nous",
    description: "Notre équipe est là pour vous aider. N'hésitez pas à nous contacter pour toute question.",
    success: "Message envoyé",
    successMessage: "Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.",
    error: "Erreur",
    errorMessage: "Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer.",
    form: {
      name: "Nom",
      email: "Email",
      message: "Message",
      subject: "Sujet",
      submit: "Envoyer",
      sending: "Envoi en cours..."
    }
  },
  settings: {
    title: "Paramètres",
    success: "Paramètres sauvegardés",
    successMessage: "Vos préférences ont été mises à jour avec succès.",
    error: "Erreur",
    errorMessage: "Une erreur est survenue lors de la sauvegarde des paramètres.",
    saving: "Sauvegarde en cours...",
    save: "Sauvegarder les changements",
    preferences: {
      title: "Préférences d'Analyse",
      description: "Personnalisez la façon dont vos sermons sont analysés",
      theologicalTradition: "Tradition Théologique",
      select: "Sélectionnez...",
      traditions: {
        reformed: "Réformée",
        lutheran: "Luthérienne",
        catholic: "Catholique",
        baptist: "Baptiste",
        pentecostal: "Pentecôtiste"
      }
    },
    theme: {
      title: "Apparence",
      description: "Personnalisez l'apparence de l'application",
      darkMode: "Mode sombre"
    },
    notifications: {
      title: "Notifications",
      description: "Gérez vos préférences de notification",
      email: "Notifications par Email",
      analysis: "Analyse Terminée"
    }
  },
  errors: {
    error: "Erreur",
    loginRequired: "Veuillez vous connecter pour télécharger le rapport",
    pdfDownloadFailed: "Erreur lors du téléchargement du rapport",
    analysisError: "Erreur d'analyse",
    serviceUnavailable: "Le service d'analyse est temporairement indisponible. Veuillez réessayer dans quelques minutes."
  }
};

// English translations
const en = {
  common: {
    analyze: "Analyze your sermon",
    learnMore: "Learn more",
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
    error: "Error",
    comingSoon: "coming soon",
    returnHome: "Return to Home"
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
  sermons: {
    success: "Success",
    submissionSuccess: "Your sermon has been successfully submitted for analysis",
    analysisError: "An error occurred during analysis",
    serviceUnavailable: "The analysis service is temporarily unavailable. Please try again in a few minutes.",
    authError: "Authentication error. Please log in again.",
    form: {
      title: "Sermon Title",
      content: "Sermon Content",
      bibleReference: "Bible Reference (Optional)",
      bibleReferencePlaceholder: "e.g. John 3:16",
      analyzing: "Analysis in progress...",
      submit: "Analyze Sermon"
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
    },
    whoweare: {
      title: "Who We Are",
      description: "At TheoCheck, we are a team passionate about innovation in service of preaching. Our mission is to help preachers refine their message by combining the richness of Christian tradition with the most advanced artificial intelligence tools."
    },
    team: {
      title: "Our Team",
      description: "A multidisciplinary team combining theological and technological expertise.",
      members: [
        {
          name: "Dr. Thomas Laurent",
          role: "Theological Director"
        },
        {
          name: "Marie Dubois",
          role: "AI Expert"
        },
        {
          name: "Prof. Jean Martin",
          role: "Homiletics Consultant"
        },
        {
          name: "Sarah Cohen",
          role: "Senior Developer"
        }
      ]
    },
    project: {
      title: "Our Project",
      description: "TheoCheck was born from the desire to support preachers in their mission. Our platform analyzes your sermons in depth and provides precise feedback on structure, theology, practical application, and message engagement.",
      tagline: "Refine your preaching. Strengthen your impact."
    }
  },
  contact: {
    title: "Contact Us",
    description: "Our team is here to help. Feel free to reach out with any questions.",
    success: "Message Sent",
    successMessage: "Your message has been sent successfully. We will get back to you soon.",
    error: "Error",
    errorMessage: "An error occurred while sending your message. Please try again.",
    form: {
      name: "Name",
      email: "Email",
      message: "Message",
      subject: "Subject",
      submit: "Send",
      sending: "Sending..."
    }
  },
  settings: {
    title: "Settings",
    success: "Settings saved",
    successMessage: "Your preferences have been updated successfully.",
    error: "Error",
    errorMessage: "An error occurred while saving settings.",
    saving: "Saving...",
    save: "Save changes",
    preferences: {
      title: "Analysis Preferences",
      description: "Customize how your sermons are analyzed",
      theologicalTradition: "Theological Tradition",
      select: "Select...",
      traditions: {
        reformed: "Reformed",
        lutheran: "Lutheran",
        catholic: "Catholic",
        baptist: "Baptist",
        pentecostal: "Pentecostal"
      }
    },
    theme: {
      title: "Appearance",
      description: "Customize the application appearance",
      darkMode: "Dark mode"
    },
    notifications: {
      title: "Notifications",
      description: "Manage your notification preferences",
      email: "Email notifications",
      analysis: "Analysis Complete"
    }
  },
  errors: {
    error: "Error",
    loginRequired: "Please login to download the report",
    pdfDownloadFailed: "Failed to download the report",
    analysisError: "Analysis Error",
    serviceUnavailable: "The analysis service is temporarily unavailable. Please try again in a few minutes."
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