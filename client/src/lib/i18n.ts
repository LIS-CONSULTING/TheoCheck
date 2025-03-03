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
    returnHome: "Retour à l'accueil",
    betaMessage: "TheoCheck est en version bêta. Des nouvelles fonctionnalités et améliorations sont en cours de développement. Vous pourriez rencontrer quelques bugs."
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
      description: "Dans un monde où les principes de base du christianisme sont le plus souvent ignorés, les églises et les pasteurs sont appelés à communiquer l'évangile avec justesse et clarté. Mais comment savoir si une prédication va réellement toucher son auditoire ?"
    },
    solution: {
      title: "TheoCheck est la solution",
      description: "Nous offrons une évaluation précise de vos prises de parole en nous appuyant sur des critères objectifs et une analyse guidée par des principes bibliques."
    },
    quote: {
      text: "Il n'existe aucune raison pour que la prédication de l'Évangile soit vécue comme un fardeau, ni pour l'orateur ni pour son auditoire.",
      author: "Charles Spurgeon"
    },
    future: {
      text: "Demain, les pasteurs ne se demanderont plus seulement \"As-tu bien préparé ta prédication ?\" mais \"Est-ce que tu l'as ThéoChecké ?\""
    },
    commitment: {
      text: "Parce que la vérité mérite d'être bien communiquée, et que la croissance spirituelle passe par une évaluation constructive."
    },
    tagline: "TheoCheck – Nous guidons, l'Esprit assiste.",
    team: {
      title: "Qui sommes-nous ?",
      description: "Nous sommes une équipe désireuse de mettre la technologie au service de l'évangile.",
      members: {
        stephane: {
          name: "Stéphane",
          description: "Des idées plein la tête, une vie professionnelle déjà bien remplie, j'ai créé il y a deux ans Par L'Écoute, une société de services chrétienne friendly pour mettre mes compétences au service des organisations qui servent l'évangile, et développer des projets qui poursuivent le même objectif."
        },
        lev: {
          name: "Lev",
          description: "Arrivé en France en 2022 après l'invasion de l'Ukraine et passionné par le marketing, je suis convaincu qu'il n'est jamais trop tôt pour se lancer. Le projet TheoCheck s'inscrit dans mon ambition d'intégrer le domaine du marketing après un BAC +3 en Techniques de Commercialisation des Systèmes Industriels. Il me permet d'acquérir des méthodes de travail efficaces et de développer des compétences essentielles pour mon avenir professionnel."
        },
        ivan: {
          name: "Ivan",
          description: "Lycéen de 18 ans, intéressé par la technologie et l'innovation, j'ai intégré TheoCheck pour développer des compétences dans le milieu du marketing et en apprendre plus sur les outils de l'intelligence artificielle. Je souhaite acquérir de l'expérience professionnelle et mettre mon travail au service des projets innovants et à fort impact. Curieux et motivé, je cherche à comprendre comment l'intelligence artificielle peut transformer le monde."
        }
      }
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
    returnHome: "Return to Home",
    betaMessage: "TheoCheck is in beta. New features and improvements are under development. You may encounter some bugs."
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
      description: "In a world where the basic principles of Christianity are often ignored, churches and pastors are called to communicate the gospel with accuracy and clarity. But how can we ensure that a sermon will truly reach its audience?"
    },
    solution: {
      title: "TheoCheck is the solution",
      description: "We offer precise evaluation of your speaking by relying on objective criteria and analysis guided by biblical principles."
    },
    quote: {
      text: "No reason exists why the preaching of the gospel should be a miserable operation either to the speaker or to the hearer.",
      author: "Charles Spurgeon"
    },
    future: {
      text: "Tomorrow, pastors won't just ask \"Have you prepared your sermon well?\" but \"Have you TheoChecked it?\""
    },
    commitment: {
      text: "Because truth deserves to be well communicated, and spiritual growth comes through constructive evaluation."
    },
    tagline: "TheoCheck – We guide, the Spirit assists.",
    team: {
      title: "Who are we?",
      description: "We are a team eager to put technology at the service of the gospel.",
      members: {
        stephane: {
          name: "Stéphane",
          description: "Full of ideas and with an already busy professional life, two years ago I created Par L'Écoute, a Christian-friendly service company to put my skills at the service of organizations that serve the gospel, and develop projects that pursue the same goal."
        },
        lev: {
          name: "Lev",
          description: "Having arrived in France in 2022 after the invasion of Ukraine and passionate about marketing, I firmly believe it's never too early to start. The TheoCheck project aligns with my ambition to enter the marketing field after completing a Bachelor's degree in Industrial Systems Marketing. It allows me to acquire effective work methods and develop essential skills for my professional future."
        },
        ivan: {
          name: "Ivan",
          description: "As an 18-year-old high school student interested in technology and innovation, I joined TheoCheck to develop skills in marketing and learn more about artificial intelligence tools. I aim to gain professional experience and contribute to innovative projects with significant impact. Curious and motivated, I seek to understand how artificial intelligence can transform the world."
        }
      }
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