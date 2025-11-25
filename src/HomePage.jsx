import { Link } from "react-router-dom";
import Dhis2Icon from "./icons/dhis2";
import PinIcon from "./icons/pin";
import BookIcon from "./icons/book";

export default function HomePage() {
  return (
    <div className="bg-white text-gray-800 flex flex-col min-h-screen">
      <main className="flex-grow">
        <section className="relative bg-gradient-to-b from-gray-800 to-gray-700 text-white text-center py-16">
          <div className="absolute inset-0 opacity-30 bg-cover bg-center"></div>
          <div className="relative z-10 max-w-2xl mx-auto px-4">
            <img
              src="./logo-ministere-niger.jpeg"
              className="mx-auto mb-4 h-55"
              alt="Ministère de la Santé et de l'hygiène publique"
            />
            <h1 className="text-3xl font-semibold mb-4">
              Carte sanitaire du Niger
            </h1>
            <p className="text-sm leading-relaxed">
              Le Ministre de la Santé et l'Hygiène Publique vous souhaite la
              bienvenue sur la carte sanitaire digitale, interactive et
              dynamique. Le développement de cette carte sanitaire avec l’appui
              d'ENABEL, s’inscrit dans le cadre du partage des
              informations sanitaires aux différents utilisateurs. Elle joue un
              rôle de planification et de régulation de l’offre des soins et
              services. Aussi, elle permet une meilleure visibilité des
              tendances des indicateurs et des actions de santé, l’élaboration
              et la mise en œuvre d’outils de communication et d’information
              modernes. Elle est alimentée par le DHIS 2 qui est aujourd’hui
              l’outil principal de la gestion des données sanitaires de routine
              du Niger.
            </p>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-6 px-4">
            <Link to="/carte" className="h-full">
              <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition flex flex-col h-full">
                <div className="flex justify-center items-center text-green-700 text-4xl mb-3"><PinIcon fill="grey"></PinIcon></div>                
                <h3 className="font-medium mt-auto">Explorer la carte</h3>
              </div>
            </Link>

            <a href="https://dhisniger.ne" className="h-full">
              <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition flex flex-col h-full">
                <div className="flex justify-center items-center text-green-700 text-4xl mb-3">
                  <Dhis2Icon />
                </div>
                <h3 className="font-medium mt-auto">Dhis2 National</h3>
              </div>
            </a>

            <a href="https://www.msppas.ne/" className="h-full">
              <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition flex flex-col h-full">
              <div className="flex justify-center items-center text-green-700 text-4xl mb-3">
                  <BookIcon />
                </div>
                <h3 className="font-medium mt-auto">
                  Le Ministre de la Santé et de l'Hygiène Publique
                </h3>
              </div>
            </a>
          </div>
        </section>
      </main>
      <footer className="py-8 text-center text-gray-600 mt-auto bg-white">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-6">
          <div>
            <h4 className="font-semibold mb-2">Partenaires</h4>
          </div>
        </div>
        <div className="max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 px-4">
          <div className="flex-1 flex justify-center max-h-[30px]">
            <a href="https://www.enabel.be/fr/" >
              <img src="/logo-enabel.png" className="max-h-[30px]"/>
            </a>
          </div>

          <div className="flex-1 flex justify-center max-h-[30px]">
            <a href="https://www.bluesquarehub.com/">
              <img src="./blsq.png" className="max-h-[30px]" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
