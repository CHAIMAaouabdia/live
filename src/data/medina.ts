// Hébergements — images dédiées
import accRiad from "@/assets/acc-riad-kantara.jpg";
import accLalla from "@/assets/acc-lalla-aicha.jpg";
import accBenBadis from "@/assets/acc-ben-badis.jpg";
import accSidiMcid from "@/assets/acc-sidi-mcid.jpg";
import accDarCirta from "@/assets/acc-dar-cirta.jpg";
import accFatima from "@/assets/acc-fatima-souika.jpg";

// Expériences — images dédiées
import expDinandier from "@/assets/exp-dinandier.jpg";
import expChakhchoukha from "@/assets/exp-chakhchoukha.jpg";
import expVilleSuspendue from "@/assets/exp-ville-suspendue.jpg";
import expFresque from "@/assets/exp-fresque.jpg";
import expSouika from "@/assets/exp-souika.jpg";
import expCirtaAntique from "@/assets/exp-cirta-antique.jpg";
import expCalligraphie from "@/assets/exp-calligraphie.jpg";
import expEcole from "@/assets/exp-ecole.jpg";
import expEauRose from "@/assets/exp-eau-rose.jpg";

export type AccommodationType = "Classique" | "Chez l'habitant";

export interface Accommodation {
  id: string;
  img: string;
  name: string;
  type: AccommodationType;
  sub: string;
  price: number; // DA / nuit
  location: string;
  rating: number;
  description: string;
  features: string[];
}

export const accommodations: Accommodation[] = [
  {
    id: "riad-el-kantara",
    img: accRiad,
    name: "Riad El Kantara",
    type: "Classique",
    sub: "Hôtel de charme",
    price: 12500,
    location: "Médina haute",
    rating: 4.9,
    description:
      "Ancien palais du XIXe restauré avec patios à fontaines, zelliges et plafonds peints. Une parenthèse aristocratique au cœur de la vieille ville.",
    features: ["Petit-déjeuner traditionnel", "Patio & fontaine", "Wi-Fi", "Hammam privé"],
  },
  {
    id: "lalla-aicha",
    img: accLalla,
    name: "Maison de Lalla Aïcha",
    type: "Chez l'habitant",
    sub: "Famille hôte",
    price: 4800,
    location: "Souk El Ghzel",
    rating: 5.0,
    description:
      "Vivez en famille chez Lalla Aïcha, conteuse de la médina. Chambre sobre, repas partagés, soirées thé et histoires de Cirta.",
    features: ["Repas inclus", "Échange culturel", "Cuisine maison", "Conteuse de la médina"],
  },
  {
    id: "dar-ben-badis",
    img: accBenBadis,
    name: "Dar Ben Badis",
    type: "Chez l'habitant",
    sub: "Maison d'hôte",
    price: 6200,
    location: "Rue Larbi Ben M'Hidi",
    rating: 4.8,
    description:
      "Maison d'hôte familiale dans une ruelle ombragée — petit-déjeuner sur la terrasse face aux toits de tuile, à deux pas du palais Ahmed Bey.",
    features: ["Terrasse panoramique", "Petit-déjeuner", "Quartier historique", "Accueil bilingue"],
  },
  {
    id: "sidi-mcid",
    img: accSidiMcid,
    name: "Appartement Sidi M'Cid",
    type: "Classique",
    sub: "Appartement",
    price: 8900,
    location: "Vue sur les ponts",
    rating: 4.7,
    description:
      "Appartement contemporain face au pont Sidi M'Cid — lumière dorée au coucher du soleil, calme absolu, parfait pour deux voyageurs.",
    features: ["Vue ponts", "Cuisine équipée", "Calme", "Parking"],
  },
  {
    id: "dar-cirta",
    img: accDarCirta,
    name: "Dar Cirta — Suite Patrimoine",
    type: "Classique",
    sub: "Suite de luxe",
    price: 22000,
    location: "Vieille médina",
    rating: 4.95,
    description:
      "Suite signature : 80 m², bois sculpté, salle de bains en marbre, service conciergerie. L'art de vivre Cirta dans toute sa splendeur.",
    features: ["Conciergerie", "Marbre & bois sculpté", "Mini-bar", "Hammam"],
  },
  {
    id: "fatima-souika",
    img: accFatima,
    name: "Chez Fatima — Souika",
    type: "Chez l'habitant",
    sub: "Famille hôte",
    price: 3800,
    location: "Souika",
    rating: 4.85,
    description:
      "Une chambre simple chez Fatima, dans le quartier vivant de Souika. Réveil au son du marché, café au lait au miel, vraie immersion populaire.",
    features: ["Très local", "Repas inclus", "Marché à 2 min", "Économique"],
  },
];

export type ExperienceCategory = "Simple" | "VIP" | "Solidaire";

export interface Experience {
  id: string;
  img: string;
  cat: string;
  title: string;
  duration: string;
  price: number; // DA, 0 = don libre
  priceLabel?: string;
  badge: ExperienceCategory;
  rating: number;
  location: string;
  description: string;
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    id: "dinandier",
    img: expDinandier,
    cat: "Atelier",
    title: "Dans la forge du dinandier",
    duration: "3h",
    price: 3200,
    badge: "Simple",
    rating: 4.9,
    location: "Souk des cuivres",
    description:
      "Ahmed, dinandier de quatrième génération, vous initie au martelage du cuivre. Repartez avec votre propre plateau gravé.",
    highlights: ["Création à emporter", "Atelier traditionnel", "Démonstration & pratique"],
  },
  {
    id: "chakhchoukha",
    img: expChakhchoukha,
    cat: "Gastronomie",
    title: "Chakhchoukha en famille",
    duration: "4h",
    price: 2800,
    badge: "Simple",
    rating: 5.0,
    location: "Maison familiale",
    description:
      "Préparation à six mains du plat emblématique de Constantine. Marché, cuisson au four à bois, repas partagé autour du couscous.",
    highlights: ["Marché inclus", "Repas partagé", "Recette à emporter"],
  },
  {
    id: "ville-suspendue",
    img: expVilleSuspendue,
    cat: "Parcours",
    title: "Constantine, ville suspendue — 2 jours",
    duration: "2 jours",
    price: 18500,
    priceLabel: "à partir de 18 500 DA",
    badge: "VIP",
    rating: 4.95,
    location: "Centre historique",
    description:
      "Deux jours sur les sept ponts, palais Ahmed Bey, médina haute, gastronomie raffinée et soirée musique malouf.",
    highlights: ["Guide expert", "Hôtel inclus", "Soirée malouf", "Transport privé"],
  },
  {
    id: "fresque",
    img: expFresque,
    cat: "Solidaire",
    title: "Restaurer une fresque de la vieille ville",
    duration: "Journée",
    price: 0,
    priceLabel: "Don libre",
    badge: "Solidaire",
    rating: 4.8,
    location: "Médina basse",
    description:
      "Aux côtés de l'association Patrimoine Cirta, participez à la restauration d'une façade peinte du XIXe siècle.",
    highlights: ["Action concrète", "Encadrement pro", "Don au projet"],
  },
  {
    id: "souika",
    img: expSouika,
    cat: "Découverte",
    title: "Les ruelles secrètes de Souika",
    duration: "2h30",
    price: 1900,
    badge: "Simple",
    rating: 4.7,
    location: "Souika",
    description:
      "Marche guidée hors des sentiers — passages voûtés, fontaines oubliées, petits commerces et anecdotes d'historien local.",
    highlights: ["Petit groupe", "Anecdotes locales", "Pause thé incluse"],
  },
  {
    id: "cirta-antique",
    img: expCirtaAntique,
    cat: "Parcours",
    title: "Cirta antique — pierres & légendes",
    duration: "3 jours",
    price: 32000,
    priceLabel: "à partir de 32 000 DA",
    badge: "VIP",
    rating: 4.9,
    location: "Constantine & Tiddis",
    description:
      "Trois jours sur les traces de la Cirta numide et romaine. Site de Tiddis, musée Cirta, dîner archéologique.",
    highlights: ["Archéologue guide", "Site de Tiddis", "Hôtel 4★ inclus"],
  },
  {
    id: "calligraphie",
    img: expCalligraphie,
    cat: "Atelier",
    title: "Calligraphie arabe & maghrébine",
    duration: "2h",
    price: 2400,
    badge: "Simple",
    rating: 4.85,
    location: "Atelier du calligraphe",
    description:
      "Initiation au khat maghribi avec maître Said. Calame de roseau, encres traditionnelles, votre prénom calligraphié à emporter.",
    highlights: ["Œuvre à emporter", "Matériel fourni", "Maître reconnu"],
  },
  {
    id: "ecole-medina",
    img: expEcole,
    cat: "Solidaire",
    title: "Soutien scolaire — école de la médina",
    duration: "½ journée",
    price: 0,
    priceLabel: "Don libre",
    badge: "Solidaire",
    rating: 4.9,
    location: "Vieille médina",
    description:
      "Animez un atelier (langue, dessin, musique…) dans une école associative. Rencontre humaine forte, encadrée par les enseignants.",
    highlights: ["Impact direct", "Rencontre enfants", "Don au projet"],
  },
  {
    id: "eau-rose-fleur-oranger",
    img: expEauRose,
    cat: "Artisanat",
    title: "L'art de la distillation — eau de rose & fleur d'oranger",
    duration: "3h",
    price: 2600,
    badge: "Simple",
    rating: 4.95,
    location: "Maison de distillation, médina",
    description:
      "Tradition artisanale constantinoise transmise de mère en fille : extraction par distillation lente de l'eau de rose (ma' el ward) et de l'eau de fleur d'oranger (ma' el zhar) à l'alambic de cuivre. Cueillette des pétales à l'aube, chargement du qattara, condensation, mise en bouteille — vous repartez avec votre propre flacon parfumé.",
    highlights: ["Alambic traditionnel en cuivre", "Cueillette au jardin", "Votre flacon à emporter", "Savoir-faire féminin transmis"],
  },
];

export type ArticleTag = "Histoire" | "Traditions" | "Architecture" | "Gastronomie" | "Musique" | "Patrimoine";

export interface Article {
  id: string;
  title: string;
  tag: ArticleTag;
  pages: number;
  size: string;
  excerpt: string;
  author: string;
  year: number;
}

export const articles: Article[] = [
  {
    id: "cirta-numide",
    title: "Cirta numide : aux origines de Constantine",
    tag: "Histoire",
    pages: 42,
    size: "3.2 Mo",
    excerpt:
      "De Massinissa à Jugurtha, la capitale numide qui défia Rome. Cartes, frises chronologiques, sources antiques.",
    author: "Dr. Y. Bensalah",
    year: 2024,
  },
  {
    id: "ponts-constantine",
    title: "Les sept ponts de Constantine",
    tag: "Architecture",
    pages: 28,
    size: "5.1 Mo",
    excerpt:
      "Sidi M'Cid, El Kantara, Mellah Slimane… Histoire technique et symbolique des passerelles d'une ville suspendue.",
    author: "Arch. M. Tounsi",
    year: 2023,
  },
  {
    id: "malouf",
    title: "Le malouf : âme musicale de Constantine",
    tag: "Musique",
    pages: 36,
    size: "4.4 Mo",
    excerpt:
      "Héritage andalou, grands maîtres, instruments. Un guide d'écoute pour entrer dans le malouf constantinois.",
    author: "S. Belkacem",
    year: 2024,
  },
  {
    id: "chakhchoukha-cuisine",
    title: "Chakhchoukha & cuisine du terroir",
    tag: "Gastronomie",
    pages: 22,
    size: "2.8 Mo",
    excerpt:
      "Recettes ancestrales, techniques au four à bois, secrets des matrones constantinoises. Avec 12 recettes.",
    author: "Chef N. Hamlaoui",
    year: 2025,
  },
  {
    id: "habits-traditions",
    title: "Mariage & traditions constantinoises",
    tag: "Traditions",
    pages: 30,
    size: "3.6 Mo",
    excerpt:
      "Le karakou, la gandoura el fergani, rites du henné, repas des sept jours. Photos d'archives & témoignages.",
    author: "L. Merabet",
    year: 2023,
  },
  {
    id: "medina-architecture",
    title: "L'architecture vernaculaire de la médina",
    tag: "Architecture",
    pages: 48,
    size: "6.2 Mo",
    excerpt:
      "Maisons à patio, moucharabiehs, zelliges, plafonds peints. Lecture d'un patrimoine bâti unique.",
    author: "Arch. K. Saïdi",
    year: 2024,
  },
  {
    id: "ahmed-bey",
    title: "Le palais d'Ahmed Bey",
    tag: "Patrimoine",
    pages: 34,
    size: "4.0 Mo",
    excerpt:
      "Dernier palais beylical d'Algérie : histoire, fresques murales, jardins, restauration contemporaine.",
    author: "Dr. F. Khelifa",
    year: 2024,
  },
  {
    id: "souks-metiers",
    title: "Les souks & métiers d'art",
    tag: "Traditions",
    pages: 26,
    size: "3.1 Mo",
    excerpt:
      "Dinandiers, brodeuses du fetla, parfumeurs, bijoutiers. Portrait d'un artisanat vivant.",
    author: "R. Boudjemaa",
    year: 2025,
  },
  {
    id: "ben-badis",
    title: "Abdelhamid Ben Badis — l'éveilleur",
    tag: "Histoire",
    pages: 32,
    size: "3.4 Mo",
    excerpt:
      "Vie et œuvre du grand réformateur né à Constantine. Itinéraire dans la ville sur ses pas.",
    author: "Dr. M. Lounis",
    year: 2023,
  },
  {
    id: "guide-pratique",
    title: "Guide pratique du voyageur — Constantine",
    tag: "Patrimoine",
    pages: 56,
    size: "7.8 Mo",
    excerpt:
      "Plans, conseils, savoir-vivre, transports, adresses d'initiés. Le compagnon offert par Live Médina.",
    author: "Live Médina",
    year: 2025,
  },
];
