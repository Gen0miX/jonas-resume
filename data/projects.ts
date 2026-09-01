// data/projects.ts
export type ProjectBuiltItem = { title: string; body: string };
export type ProjectGalleryItem = { id: string; alt: string; src?: string };

export type Project = {
  slug: string;
  title: string;
  titleAccent: string;
  kicker: string;
  meta: string;
  lede: string;
  ledeAccent: string;
  summary: string;
  detailLede: string;
  detailLedeAccent: string;
  url: string;
  host: string;
  repo?: string;
  client: string;
  year: string;
  role: string;
  stack: string[];
  wip?: boolean;
  context: string[];
  built: ProjectBuiltItem[];
  gallery: ProjectGalleryItem[];
  cover: { src?: string; alt: string };
};

export const projects: Project[] = [
  {
    slug: "avena39",
    title: "Avena",
    titleAccent: "39",
    kicker: "Projet 01 — Site vitrine & réservation",
    meta: "Mandat indépendant · 2025",
    lede: "Site vitrine et réservation d'un appartement de vacances à Saas-Fee.",
    ledeAccent: "réservation",
    summary:
      "Galerie d'images optimisées, fiche équipements, carte Google Maps embarquée et tunnel de réservation avec calendrier de disponibilités et sélection de période.",
    detailLede:
      "Louer un appartement de vacances à Saas-Fee sans intermédiaire : vitrine, disponibilités et demande de réservation sur un seul site.",
    detailLedeAccent: "sans intermédiaire",
    url: "https://www.avena39.ch/",
    host: "avena39.ch",
    repo: "https://github.com/Gen0miX",
    client: "Propriétaires privés, Saas-Fee (VS)",
    year: "2025",
    role: "Conception, design et développement fullstack. Mise en production et maintenance.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Maps API", "Vercel"],
    context: [
      "Les propriétaires d'un appartement à Untere Dorfstrasse 39, au cœur de la station piétonne de Saas-Fee, dépendaient entièrement des plateformes de location. Objectif du mandat : un site en propre qui présente le logement, affiche les disponibilités et capte les demandes de réservation en direct.",
      "J'ai pris le mandat de bout en bout : structure du contenu, design, développement front et back, mise en production et suivi.",
    ],
    built: [
      {
        title: "Galerie et fiche logement",
        body: "Images servies en WebP via next/image avec tailles responsives et chargement différé. Fiche structurée : capacité, chambres, salle de bain, liste d'équipements.",
      },
      {
        title: "Calendrier de disponibilités",
        body: "Sélection d'une période et du nombre de voyageurs, contrôle des dates déjà réservées, envoi de la demande au propriétaire.",
      },
      {
        title: "Localisation & référencement",
        body: "Carte Google Maps embarquée, contenus rédigés pour les recherches « location appartement Saas-Fee », métadonnées et rendu serveur pour l'indexation.",
      },
    ],
    gallery: [
      { id: "avena-g1", alt: "Galerie du logement" },
      { id: "avena-g2", alt: "Fiche équipements" },
      { id: "avena-g3", alt: "Tunnel de réservation" },
      { id: "avena-g4", alt: "Vue mobile" },
    ],
    cover: { alt: "Capture d'écran — avena39.ch (page d'accueil)" },
  },
  {
    slug: "les-tsabloz",
    title: "Les ",
    titleAccent: "Tsabloz",
    kicker: "Projet 02 — Plateforme de réservation privée",
    meta: "Mandat indépendant · 2026",
    lede: "Plateforme de réservation privée pour un mayen près de Vercorin.",
    ledeAccent: "privée",
    summary:
      "Accès protégé par mot de passe partagé, calendrier de réservation pour la famille et les amis, back-office admin pour gérer les périodes et les demandes.",
    detailLede:
      "Un vieux mayen perché près de Vercorin, rien que pour la famille et les amis : accès par mot de passe, calendrier partagé, gestion en autonomie.",
    detailLedeAccent: "rien que pour la famille et les amis",
    url: "https://www.lestsabloz.ch/",
    host: "lestsabloz.ch",
    repo: "https://github.com/Gen0miX",
    client: "Propriétaires privés, Vercorin (VS)",
    year: "2026 — v1 en ligne",
    role: "Conception, design, développement fullstack et mise en production.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Auth par mot de passe", "Vercel"],
    context: [
      "Un mayen familial à 1 211 m d'altitude, au-dessus de Vercorin dans le Val d'Anniviers, se prêtait mal aux outils de réservation grand public : le chalet n'est pas loué, il circule entre proches. Les demandes passaient par messages, sans vue d'ensemble des semaines déjà prises.",
      "Le mandat portait sur une plateforme fermée : une porte d'entrée unique protégée par un mot de passe transmis de main en main, un calendrier partagé derrière, et un espace d'administration pour l'hôte. Conception, design et développement de bout en bout.",
    ],
    built: [
      {
        title: "Accès privé par mot de passe",
        body: "Page d'entrée unique — « Saisis le mot de passe qui t'a été transmis » — validée côté serveur, session conservée ensuite. Aucune page publique en dehors de l'écran d'accueil, aucune indexation.",
      },
      {
        title: "Calendrier de réservation partagé",
        body: "Vue des périodes déjà réservées et pose d'une demande sur une plage de dates. Le calendrier fait référence pour tout le cercle familial.",
      },
      {
        title: "Espace d'administration",
        body: "Route /admin séparée : l'hôte valide ou refuse les demandes, bloque des périodes et garde la main sur le contenu, sans passer par le code.",
      },
    ],
    gallery: [
      { id: "tsabloz-g1", alt: "Écran d'entrée et mot de passe" },
      { id: "tsabloz-g2", alt: "Calendrier de réservation" },
      { id: "tsabloz-g3", alt: "Formulaire de demande" },
      { id: "tsabloz-g4", alt: "Back-office admin" },
    ],
    cover: { alt: "Capture d'écran — lestsabloz.ch (écran d'accès)" },
  },
  {
    slug: "aencrage",
    title: "Fondation ",
    titleAccent: "æncrage",
    kicker: "Projet 03 — Archives et site institutionnel",
    meta: "Mandat indépendant · 2026",
    wip: true,
    lede: "Archives vivantes du patrimoine oral et écrit de Mase.",
    ledeAccent: "vivantes",
    summary:
      "Catalogue de fonds d'archives classé par thématique, rubrique « fond du mois » éditorialisée, formulaire de dépôt de fonds. Contenu piloté par un CMS headless.",
    detailLede:
      "Sauvegarder la mémoire d'un village, écrite et racontée : le site de la fondation qui rassemble le patrimoine oral et écrit de Mase.",
    detailLedeAccent: "écrite et racontée",
    url: "https://aencrage.vercel.app/",
    host: "aencrage.vercel.app",
    repo: "https://github.com/Gen0miX",
    client: "Fondation æncrage, Mase (VS)",
    year: "2026 — en cours",
    role: "Conception, design, développement fullstack, modélisation du contenu dans le CMS.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Sanity CMS", "Vercel"],
    context: [
      "La Fondation æncrage, créée à l'initiative d'Annette Corbaz, rassemble et met en valeur le patrimoine immatériel de la société masatte : correspondances, textes officiels, travaux de recherche, articles de presse, émissions radio-tv, photographies, films, témoignages et portraits.",
      "Le site doit tenir deux rôles à la fois : présenter la fondation et ses missions à ses soutiens, et servir de catalogue consultable pour des fonds d'archives qui s'ajoutent en continu. D'où un contenu entièrement piloté depuis un CMS, que la fondation alimente sans moi.",
    ],
    built: [
      {
        title: "Catalogue de fonds par thématique",
        body: "Onze thématiques regroupées en trois familles — vie sociale, patrimoine et territoire, culture et mémoire — chacune avec sa page de fonds, plus la liste complète du catalogue.",
      },
      {
        title: "Fond du mois éditorialisé",
        body: "Une pièce des archives mise en avant chaque mois avec son commentaire, sa datation et ses médias, publiée depuis Sanity par la fondation.",
      },
      {
        title: "Dépôt de fonds et soutien",
        body: "Parcours de dépôt pour confier des archives privées liées à Mase, et page de soutien par virement bancaire ou TWINT.",
      },
    ],
    gallery: [
      { id: "aencrage-g1", alt: "Page d'accueil" },
      { id: "aencrage-g2", alt: "Navigation par thématiques" },
      { id: "aencrage-g3", alt: "Fiche « fond du mois »" },
      { id: "aencrage-g4", alt: "Parcours de dépôt" },
    ],
    cover: { alt: "Capture d'écran — aencrage (page d'accueil)" },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project {
  const index = projects.findIndex((p) => p.slug === slug);
  return projects[(index + 1) % projects.length];
}
