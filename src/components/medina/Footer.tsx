import { Instagram, Facebook, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

export const Footer = () => (
  <footer className="bg-brown-dark text-sand-100 pt-20 pb-10 mt-0">
    <div className="container mx-auto px-6 lg:px-10">
      <div className="grid md:grid-cols-4 gap-12 pb-14 border-b border-sand-100/15">
        <div className="md:col-span-1">
          <img src={logo} alt="Live Médina" className="h-14 w-auto mb-4 brightness-0 invert opacity-90" width={200} height={120} />
          <p className="font-serif text-lg text-sand-50 italic mb-2">
            « Ne visitez plus la médina, habitez-la »
          </p>
          <p className="text-sm text-sand-100/70">Constantine, Algérie</p>
        </div>

        <FooterCol title="Découvrir" links={["Accueil", "Hébergement", "Expériences", "Carte émotionnelle"]} />
        <FooterCol title="Services" links={["Parcours Premium", "Devenir hôte", "Devenir guide", "Contenu PDF"]} />
        <FooterCol title="Live Médina" links={["À propos", "Contact", "Mentions légales", "Politique de confidentialité"]} />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10">
        <p className="text-xs text-sand-100/60 font-display uppercase tracking-[0.2em]">
          © 2026 Live Médina · Cirta
        </p>
        <div className="flex items-center gap-5 text-sand-100/70">
          <a href="#" aria-label="Instagram" className="hover:text-sand-50 transition"><Instagram className="w-4 h-4" /></a>
          <a href="#" aria-label="Facebook" className="hover:text-sand-50 transition"><Facebook className="w-4 h-4" /></a>
          <a href="#" aria-label="Email" className="hover:text-sand-50 transition"><Mail className="w-4 h-4" /></a>
        </div>
      </div>
    </div>
  </footer>
);

const FooterCol = ({ title, links }: { title: string; links: string[] }) => (
  <div>
    <p className="eyebrow text-sand-50 mb-4">{title}</p>
    <ul className="space-y-2.5">
      {links.map((l) => (
        <li key={l}>
          <a href="#" className="font-serif text-sand-100/80 hover:text-sand-50 transition-colors text-base">
            {l}
          </a>
        </li>
      ))}
    </ul>
  </div>
);
