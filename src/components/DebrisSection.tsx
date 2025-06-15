import { useState } from "react";
import { AlertCircle, Zap, Shield, Trash2 } from "lucide-react";

const DebrisSection = () => {
  const [hoveredDebris, setHoveredDebris] = useState<string | null>(null);

  const debrisTypes = [
    {
      id: "functional",
      name: "Satellites Actifs",
      count: "14750",
      color: "bg-green-500",
      description: "Satellites opérationnels en orbite",
      link: "https://obdh.space/",
    },
    {
      id: "defunct",
      name: "Satellites Morts",
      count: "3,600",
      color: "bg-orange-500",
      description: "Satellites non-opérationnels mais intacts",
      link: "https://www.slingshot.space/news/state-of-satellite-deployments-and-orbital-operations-2023",
    },
    {
      id: "fragments",
      name: "Fragments",
      count: "54,000",
      color: "bg-red-500",
      description: "Débris de collisions et explosions",
      link: "https://sdup.esoc.esa.int/discosweb/statistics/",
    },
    {
      id: "micro",
      name: "Micro-débris",
      count: "140M+",
      color: "bg-purple-500",
      description: "Particules < 10cm, non-suivies mais dangereuses",
      link: "https://sdup.esoc.esa.int/discosweb/statistics/",
    },
  ];
  const threats = [
    {
      title: "Syndrome de Kessler",
      description: (
        <>
          Une réaction en chaîne de collisions entre débris spatiaux pourrait
          rendre l'orbite basse inutilisable, avec une augmentation documentée
          des risques d'accidents dus à la densité croissante de satellites et
          de débris.{" "}
          <a
            href="https://www.tandfonline.com/doi/epdf/10.1080/10095020.2022.2031313?needAccess=true"
            target="_blank"
            rel="noopener noreferrer"
          >
            En savoir plus
          </a>
        </>
      ),
      probability: "Modérée",
      impact: "Catastrophique",
      icon: Zap,
    },
    {
      title: "Collision avec l'ISS",
      description: (
        <>
          Les collisions potentielles avec l'ISS représentent un risque
          permanent pour la sécurité des astronautes et l'intégrité des
          installations spatiales. Des études montrent que les régulations
          actuelles ne suffisent pas à réduire ce danger de manière
          significative.{" "}
          <a
            href="https://issues.org/space-debris-fcc-harbert-balakrishnan/#:~:text=regulatory%20framework%20in%20space,In"
            target="_blank"
            rel="noopener noreferrer"
          >
            En savoir plus
          </a>
        </>
      ),
      probability: "Faible",
      impact: "Majeur",
      icon: AlertCircle,
    },
    {
      title: "Perte de satellites critiques",
      description: (
        <>
          Des collisions comme celle impliquant Yunhai 1-02 montrent que la
          perte de satellites critiques perturbe les télécommunications, le GPS
          et la surveillance météo, avec des implications croissantes pour les
          infrastructures terrestres.{" "}
          <a
            href="https://www.space.com/space-junk-collision-chinese-satellite-yunhai-1-02"
            target="_blank"
            rel="noopener noreferrer"
          >
            En savoir plus
          </a>
        </>
      ),
      probability: "Élevée",
      impact: "Significatif",
      icon: Shield,
    },
  ];

  const solutions = [
    {
      name: "Désorbitation Active",
      description: "Missions dédiées pour capturer et détruire les gros débris",
      status: "En développement",
      actors: ["ESA (e.Deorbit)", "JAXA (ELSA-d)", "ClearSpace"],
    },
    {
      name: "Règles 25 ans",
      description:
        "Obligation de désorbiter les satellites dans les 25 ans post-mission",
      status: "Partiellement appliqué",
      actors: ["IADC", "UN COPUOS", "Agences nationales"],
    },
    {
      name: "Technologies d'évitement",
      description:
        "Systèmes de manœuvre automatique pour éviter les collisions",
      status: "Opérationnel",
      actors: ["SpaceX", "ESA", "NASA"],
    },
  ];

  return (
    <section
      id="debris"
      className="py-20 bg-gradient-to-br from-slate-900 to-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-red-500/20 to-orange-600/20 rounded-full border border-red-500/30">
              <Trash2 className="h-12 w-12 text-red-400" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            La Crise des Débris Spatiaux
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            L'espace devient une décharge. Avec l'explosion du nombre de
            lancements privés, la pollution orbitale atteint des niveaux
            critiques.
          </p>
        </div>

        {/* Visualisation des débris */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Population Orbitale Actuelle
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {debrisTypes.map((debris) => (
              <div
                key={debris.id}
                className="relative p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 hover:border-slate-500 transition-all duration-300 cursor-pointer transform hover:scale-105"
                onMouseEnter={() => setHoveredDebris(debris.id)}
                onMouseLeave={() => setHoveredDebris(null)}
              >
                <div
                  className={`w-4 h-4 ${debris.color} rounded-full mb-4 animate-pulse`}
                ></div>
                <div className="text-3xl font-bold text-white mb-2">
                  {debris.count}
                </div>
                <div className="text-slate-200 font-semibold mb-2">
                  {debris.name}
                </div>
                <div className="text-slate-400 text-sm">
                  {debris.description}
                </div>

                {hoveredDebris === debris.id && (
                  <div className="absolute -top-2 -left-2 -right-2 -bottom-2 bg-gradient-to-r from-violet-500/20 to-purple-600/20 rounded-xl border border-violet-500/50 -z-10"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Menaces */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Menaces Principales
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {threats.map((threat, index) => {
              const Icon = threat.icon;
              return (
                <div
                  key={index}
                  className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-red-500/20 rounded-lg mr-3">
                      <Icon className="h-6 w-6 text-red-400" />
                    </div>
                    <h4 className="text-lg font-bold text-white">
                      {threat.title}
                    </h4>
                  </div>
                  <p className="text-slate-300 mb-4">{threat.description}</p>
                  <div className="flex justify-between text-sm">
                    <div>
                      <span className="text-slate-400">Probabilité: </span>
                      <span
                        className={`font-semibold ${
                          threat.probability === "Élevée"
                            ? "text-red-400"
                            : threat.probability === "Modérée"
                            ? "text-orange-400"
                            : "text-yellow-400"
                        }`}
                      >
                        {threat.probability}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400">Impact: </span>
                      <span
                        className={`font-semibold ${
                          threat.impact === "Catastrophique"
                            ? "text-red-400"
                            : threat.impact === "Majeur"
                            ? "text-orange-400"
                            : "text-yellow-400"
                        }`}
                      >
                        {threat.impact}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Solutions */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Solutions en Développement
          </h3>
          <div className="space-y-6">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-white mb-2 md:mb-0">
                    {solution.name}
                  </h4>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      solution.status === "Opérationnel"
                        ? "bg-green-500/20 text-green-400"
                        : solution.status === "En développement"
                        ? "bg-orange-500/20 text-orange-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {solution.status}
                  </span>
                </div>
                <p className="text-slate-300 mb-4">{solution.description}</p>
                <div>
                  <span className="text-slate-400 text-sm">
                    Acteurs principaux:{" "}
                  </span>
                  <span className="text-violet-400 text-sm font-medium">
                    {solution.actors.join(", ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        {/* <div className="mt-16 text-center">
          <div className="p-8 bg-gradient-to-r from-red-500/10 to-orange-600/10 rounded-2xl border border-red-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">
              L'Urgence d'Agir
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Sans action coordonnée immédiate, l'espace pourrait devenir
              inaccessible pour les générations futures. La régulation
              internationale est cruciale.
            </p>
            <button className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Découvrir les Initiatives
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default DebrisSection;
