import React from 'react';
import { ExternalLink, BookOpen, FileText, Users } from 'lucide-react';

const SourcesSection = () => {
  const sources = {
    institutional: {
      title: "Sources Institutionnelles",
      icon: BookOpen,
      items: [
        {
          name: "Agence Spatiale Européenne (ESA)",
          description: "Rapports officiels sur la politique spatiale européenne",
          url: "https://www.esa.int",
          type: "Institution"
        },
        {
          name: "Centre National d'Études Spatiales (CNES)",
          description: "Données et analyses sur l'industrie spatiale française",
          url: "https://cnes.fr",
          type: "Agence nationale"
        },
        {
          name: "UN Office for Outer Space Affairs",
          description: "Cadre juridique international pour l'espace",
          url: "https://www.unoosa.org",
          type: "Organisation internationale"
        },
        {
          name: "OCDE - Économie Spatiale",
          description: "Analyses économiques et statistiques sectorielles",
          url: "https://www.oecd.org/space",
          type: "Organisation économique"
        }
      ]
    },
    research: {
      title: "Recherche et Think Tanks",
      icon: Users,
      items: [
        {
          name: "Secure World Foundation",
          description: "Analyses sur la sécurité spatiale et les débris",
          url: "https://swfound.org",
          type: "Think tank"
        },
        {
          name: "Centre Spatial Universitaire de Montpellier",
          description: "Recherches académiques françaises sur l'espace",
          url: "https://www.csum.fr",
          type: "Université"
        },
        {
          name: "European Space Policy Institute (ESPI)",
          description: "Analyses politiques spatiales européennes",
          url: "https://www.espi.or.at",
          type: "Institut de recherche"
        },
        {
          name: "International Astronautical Union (IAU)",
          description: "Recherches sur la pollution lumineuse spatiale",
          url: "https://www.iau.org",
          type: "Union scientifique"
        }
      ]
    },
    reports: {
      title: "Rapports et Études",
      icon: FileText,
      items: [
        {
          name: "Space Foundation - Space Report 2023",
          description: "Analyse complète de l'économie spatiale mondiale",
          type: "Rapport annuel"
        },
        {
          name: "ESA Space Debris Quarterly Report",
          description: "Suivi trimestriel de l'évolution des débris spatiaux",
          type: "Rapport technique"
        },
        {
          name: "Nature - Satellite Constellations Impact",
          description: "Étude scientifique sur l'impact environnemental",
          type: "Publication scientifique"
        },
        {
          name: "Chatham House - Space Governance",
          description: "Analyse de la gouvernance spatiale internationale",
          type: "Étude politique"
        }
      ]
    }
  };

  const additionalResources = [
    {
      category: "Médias Spécialisés",
      items: [
        "Air & Cosmos (France)",
        "SpaceNews (International)",
        "Via Satellite (Europe)",
        "Space Policy (Academic)"
      ]
    },
    {
      category: "Bases de Données",
      items: [
        "ESA Space Surveillance Catalogue",
        "UNOOSA Online Index",
        "NASA Orbital Debris Program",
        "OECD Space Statistics"
      ]
    },
    {
      category: "Événements de Référence",
      items: [
        "International Astronautical Congress",
        "European Space Conference",
        "Space Symposium (USA)",
        "Paris Air Show - Space"
      ]
    }
  ];

  return (
    <section id="sources" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Sources et Références
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Cette analyse s'appuie sur des sources européennes et françaises de référence, 
            garantissant la fiabilité et la pertinence des informations présentées.
          </p>
        </div>

        {/* Main Sources */}
        <div className="space-y-12">
          {Object.entries(sources).map(([key, category]) => {
            const Icon = category.icon;
            return (
              <div key={key}>
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <div className="p-2 bg-violet-500/20 rounded-lg">
                    <Icon className="h-6 w-6 text-violet-400" />
                  </div>
                  {category.title}
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {category.items.map((item, index) => (
                    <div key={index} className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 hover:border-slate-500 transition-all duration-300">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-lg font-bold text-white">{item.name}</h4>
                        {item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-violet-400 hover:text-violet-300 transition-colors ml-2"
                          >
                            <ExternalLink className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                      <p className="text-slate-300 mb-3 leading-relaxed">{item.description}</p>
                      <span className="inline-block px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-xs font-medium border border-violet-500/30">
                        {item.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Resources */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Ressources Complémentaires
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {additionalResources.map((resource, index) => (
              <div key={index} className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700">
                <h4 className="text-lg font-bold text-violet-400 mb-4">{resource.category}</h4>
                <ul className="space-y-2">
                  {resource.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-violet-400 text-sm mt-1">•</span>
                      <span className="text-slate-300 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Methodology */}
        <div className="mt-16">
          <div className="p-8 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-2xl border border-slate-600">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Méthodologie et Transparence
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-bold text-violet-400 mb-4">Critères de Sélection</h4>
                <ul className="space-y-2 text-slate-300">
                  <li>• Sources officielles privilégiées (ESA, CNES, OCDE)</li>
                  <li>• Données récentes (2022-2023 principalement)</li>
                  <li>• Perspective européenne et française prioritaire</li>
                  <li>• Validation croisée des informations</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-violet-400 mb-4">Limites et Biais</h4>
                <ul className="space-y-2 text-slate-300">
                  <li>• Données propriétaires limitées (entreprises privées)</li>
                  <li>• Évolution rapide du secteur</li>
                  <li>• Perspective principalement occidentale</li>
                  <li>• Débats en cours sans consensus</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-slate-400 text-sm">
                Dernière mise à jour: Décembre 2023 • 
                Sources vérifiées et cross-référencées • 
                Contact pour suggestions: sources@spacedebate.eu
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SourcesSection;