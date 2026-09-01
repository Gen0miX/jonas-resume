export type CareerCategory = "Expérience" | "Formation" | "Service civil";

export type CareerStep = {
  year: string;
  category: CareerCategory;
  title: string;
  description: string;
};

export const careerSteps: CareerStep[] = [
  {
    year: "2025 — 2026",
    category: "Expérience",
    title: "Mandats indépendants",
    description: "Développement web, modélisation et développement de base de données.",
  },
  {
    year: "2023 — 2024",
    category: "Formation",
    title: "Master en informatique de gestion",
    description:
      "Une année d’études de Master en informatique de gestion à l’Université de Fribourg.",
  },
  {
    year: "2023",
    category: "Expérience",
    title: "Analyste programmeur",
    description:
      "Analyste programmeur chez Cremo pendant trois mois. Principalement responsable du support téléphonique et du développement de leurs logiciels internes (Visual Basic).",
  },
  {
    year: "2021 — 2022",
    category: "Service civil",
    title: "Aide voirie",
    description: "Aide voirie pour la municipalité de St-Maurice dans le cadre du service civil.",
  },
  {
    year: "2019 — 2020",
    category: "Formation",
    title: "Cours CISCO",
    description: "Cours CISCO à la HEG de Genève pendant mes études en informatique de gestion.",
  },
  {
    year: "2017 — 2021",
    category: "Formation",
    title: "Bachelor en informatique de gestion",
    description: "Programme de Bachelor en informatique de gestion à la HES-SO Valais, Sierre.",
  },
  {
    year: "2016 — 2017",
    category: "Service civil",
    title: "Animateur assistant",
    description:
      "Animateur assistant au Home les Tilleuls à Monthey dans le cadre du service civil.",
  },
  {
    year: "2015 — 2016",
    category: "Formation",
    title: "Stage MPC",
    description:
      "Stage d’employé de commerce à la Médiathèque Valais Sion pour compléter ma formation.",
  },
  {
    year: "2012 — 2015",
    category: "Formation",
    title: "CFC d’employé de commerce",
    description: "Formation d’employé de commerce à l’ECCG Martigny.",
  },
];
