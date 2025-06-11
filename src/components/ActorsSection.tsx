import { useState } from "react";
import { Building, MapPin, TrendingUp, AlertTriangle } from "lucide-react";

// Define types for actors
interface Actor {
  name: string;
  country: string;
  founded: string;
  ceo: string;
  valuation: string;
  achievements: string[];
  controversies: string[];
  projects: string[];
  impact: string;
}

const actors: Record<string, Actor> = {
  spacex: {
    name: "SpaceX",
    country: "États-Unis",
    founded: "2002",
    ceo: "Elon Musk",
    valuation: "137 Md$",
    achievements: [
      "Premier lanceur orbital réutilisable (Falcon 9)",
      "Plus grande constellation de satellites (Starlink - 5,000+)",
      "Premier vol privé vers l'ISS (Crew Dragon)",
      "Réduction des coûts de lancement de 90%",
    ],
    controversies: [
      "Pollution lumineuse causée par Starlink",
      "Interférences avec l'astronomie terrestre",
      "Risque de collision avec autres satellites",
      "Monopolisation de l'orbite basse",
    ],
    projects: ["Starlink", "Crew Dragon", "Starship", "Mars Mission"],
    impact: "Révolutionnaire mais polarisant",
  },
  esa: {
    name: "Agence Spatiale Européenne (ESA)",
    country: "Europe (22 pays)",
    founded: "1975",
    ceo: "Josef Aschbacher",
    valuation: "Budget 7,15 Md€/an",
    achievements: [
      "Programme Copernicus (observation de la Terre)",
      "Mission ExoMars vers la planète rouge",
      "Lanceur Ariane leader commercial historique",
      "Station spatiale Columbus sur l'ISS",
    ],
    controversies: [
      "Dépendance aux lanceurs privés américains",
      "Retard dans la réponse à SpaceX",
      "Coûts élevés par rapport aux concurrents",
      "Fragmentation entre pays membres",
    ],
    projects: ["Artemis Gateway", "PLATO", "JUICE", "Ariane 6"],
    impact: "Acteur institutionnel en transition",
  },
  blueorigin: {
    name: "Blue Origin",
    country: "États-Unis",
    founded: "2000",
    ceo: "Jeff Bezos",
    valuation: "Non divulgué",
    achievements: [
      "Tourisme spatial suborbital (New Shepard)",
      "Développement du moteur BE-4",
      "Projet de station spatiale commerciale",
      "Usine lunaire pour exploitation minière",
    ],
    controversies: [
      "Procès contre la NASA (contrat Artemis)",
      "Impact environnemental du tourisme spatial",
      "Élitisme économique des vols",
      "Lenteur du développement technologique",
    ],
    projects: ["New Glenn", "Orbital Reef", "Blue Moon", "BE-4"],
    impact: "Potentiel élevé, réalisations limitées",
  },
  virgin: {
    name: "Virgin Galactic",
    country: "États-Unis/Royaume-Uni",
    founded: "2004",
    ceo: "Michael Colglazier",
    valuation: "1,2 Md$ (2023)",
    achievements: [
      "Premier service de tourisme spatial commercial",
      "Technologie unique d'avion porteur",
      "Plus de 600 réservations de vols",
      "Pionnier du tourisme spatial grand public",
    ],
    controversies: [
      "Coût prohibitif (450,000$ par vol)",
      "Questions de sécurité après accidents",
      "Impact carbone du tourisme spatial",
      "Modèle économique non-viable",
    ],
    projects: ["VSS Unity", "VSS Imagine", "Delta Class", "Point-to-Point"],
    impact: "Niche mais symbolique",
  },
};

const ActorsSection = () => {
  const [selectedActor, setSelectedActor] = useState("spacex");
  const currentActor = actors[selectedActor];

  return (
    <section id="acteurs" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Les Acteurs Majeurs
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Portrait des organisations qui façonnent l'avenir spatial, entre
            innovation technologique et controverses éthiques.
          </p>
        </div>

        {/* Actor Selection */}
        <div className="flex flex-wrap justify-center mb-12 gap-3">
          {Object.entries(actors).map(([key, actor]) => (
            <button
              key={key}
              onClick={() => setSelectedActor(key)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                selectedActor === key
                  ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg transform scale-105"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-600"
              }`}
            >
              <Building className="h-5 w-5" />
              <span>{actor.name}</span>
            </button>
          ))}
        </div>

        {/* Actor Profile */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">
                {currentActor.name}
              </h3>
              <div className="flex flex-wrap gap-4 text-slate-300">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{currentActor.country}</span>
                </div>
                <div>Fondé en {currentActor.founded}</div>
                <div>CEO: {currentActor.ceo}</div>
              </div>
            </div>
            <div className="mt-4 lg:mt-0">
              <div className="text-2xl font-bold text-violet-400">
                {currentActor.valuation}
              </div>
              <div className="text-slate-400 text-sm">Valorisation/Budget</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Achievements */}
            <div>
              <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                Réalisations Majeures
              </h4>
              <div className="space-y-3">
                {currentActor.achievements.map(
                  (achievement: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-slate-300">{achievement}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Controversies */}
            <div>
              <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-400" />
                Controverses & Critiques
              </h4>
              <div className="space-y-3">
                {currentActor.controversies.map(
                  (controversy: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-slate-300">{controversy}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="mt-8">
            <h4 className="text-xl font-bold text-white mb-4">
              Projets Actuels
            </h4>
            <div className="flex flex-wrap gap-3">
              {currentActor.projects.map((project: string, index: number) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-violet-500/20 text-violet-300 rounded-full border border-violet-500/30 text-sm font-medium"
                >
                  {project}
                </span>
              ))}
            </div>
          </div>

          {/* Impact Assessment */}
          <div className="mt-8 p-6 bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-xl border border-slate-600">
            <h4 className="text-lg font-bold text-white mb-2">
              Évaluation d'Impact
            </h4>
            <p className="text-slate-300">{currentActor.impact}</p>
          </div>
        </div>

        {/* Comparison Stats */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Comparaison des Performances 2023
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-slate-800/50 rounded-xl border border-slate-700">
              <div className="text-3xl font-bold text-violet-400 mb-2">61</div>
              <div className="text-white font-semibold mb-1">
                Lancements SpaceX
              </div>
              <div className="text-slate-400 text-sm">98% de succès</div>
            </div>
            <div className="text-center p-6 bg-slate-800/50 rounded-xl border border-slate-700">
              <div className="text-3xl font-bold text-blue-400 mb-2">3</div>
              <div className="text-white font-semibold mb-1">
                Lancements Ariane
              </div>
              <div className="text-slate-400 text-sm">100% de succès</div>
            </div>
            <div className="text-center p-6 bg-slate-800/50 rounded-xl border border-slate-700">
              <div className="text-3xl font-bold text-orange-400 mb-2">6</div>
              <div className="text-white font-semibold mb-1">
                Vols touristiques
              </div>
              <div className="text-slate-400 text-sm">Virgin Galactic</div>
            </div>
            <div className="text-center p-6 bg-slate-800/50 rounded-xl border border-slate-700">
              <div className="text-3xl font-bold text-green-400 mb-2">0</div>
              <div className="text-white font-semibold mb-1">
                Lancements Blue Origin
              </div>
              <div className="text-slate-400 text-sm">Orbitaux</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActorsSection;
