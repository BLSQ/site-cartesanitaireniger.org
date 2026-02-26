import { Link } from "react-router-dom";
import DashboardIcon from "./icons/dashboard";
import ReportsIcon from "./icons/reports";
import DbIcon from "./icons/db";
import Page from "./components/Page";
import ChevronIcon from "./icons/chevron";
import PinIcon from "./icons/pin";
import BookIcon from "./icons/book";

export default function HomePage() {
  return (
    <Page showLogos extraContentClassName="md:justify-center">
      <h1 className="text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-bold md:tracking-tight xl:tracking-tighter mb-2 2xl:mb-8 text-center md:text-left">
        Carte sanitaire du Niger
      </h1>

      <p className=" mt-4 text-sm text-slate-500 leading-relaxed 2xl:text-base text-center md:text-left">
        Le Ministère de la Santé vous souhaite la bienvenue sur la carte sanitaire digitale, interactive et dynamique. Le développement de cette carte sanitaire, sous financement d'Enabel, s’inscrit dans le cadre du partage des informations sanitaires aux différents utilisateurs.
      </p>
      <p className=" mt-4 text-sm text-slate-500 leading-relaxed 2xl:text-base text-center md:text-left">
        Elle joue un rôle de planification et de régulation de l’offre des soins et services. Aussi, elle permet une meilleure visibilité des tendances des indicateurs et des actions de santé, l’élaboration et la mise en œuvre d’outils de communication et d’information modernes.
      </p>
      <p className=" mt-4 text-sm text-slate-500 leading-relaxed 2xl:text-base text-center md:text-left">
        Elle est principalement alimentée par le système national d'information sanitaire (DHIS2) qui est aujourd’hui l’outil principal de la gestion des données sanitaires de routine du Niger.
      </p>

      {/* Buttons */}
      <div className="my-8 2xl:my-16 grid grid-cols-1 lg:grid-cols-4 gap-2 2xl:gap-4">
        <LinkButton
          icon={<PinIcon />}
          title="Explorer la carte"
          description="Visualisez la carte, les structures de santé et le matériel disponible"
          href="/carte"
        />
        <LinkButton
          icon={<ReportsIcon />}
          title="Modèle d'optimisation de la couverture sanitaire"
          description="Téléchargez les rapports détaillés d'accessibilité"
          href="/reports"
        />
        <LinkButton
          icon={<DbIcon />}
          title="DHIS2 National"
          description="Données nationales sur le DHIS2"
          href="https://dhisniger.ne"
        />
        <LinkButton
          icon={<ReportsIcon />}
          title="MSHP"
          description="Ministère de la Santé et de l'Hygiène Publique"
          href="https://www.msppas.ne/"
        />
      </div>
    </Page>
  );
}

// eslint-disable-next-line react/prop-types
const LinkButton = ({ icon, title, description, href }) => {
  return (
    <Link
      to={href}
      className="group flex md:block bg-slate-100 space-y-2  items-center rounded p-4 font-semibold gap-4 rounded-lg  transition-all duration-300 flex-1 "
    >
      <div className="w-8 h-8 rounded-full bg-[#5FBFF2] group-hover:bg-[#8BD5FD] flex items-center justify-center text-[#002878] transition-all duration-300">
        {icon}
      </div>
      <div className="text-lg font-bold flex-1 text-left">{title}</div>
      <div className="text-xs 2xl:text-sm text-slate-500 mb-4 hidden md:block">
        {description}
      </div>
      <span className="text-blue-500 hover:font-bold md:hidden">
        <ChevronIcon />
      </span>
    </Link>
  );
};
