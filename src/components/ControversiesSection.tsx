import React, { useState } from 'react';
import { Scale, Users, Zap, DollarSign } from 'lucide-react';

const ControversiesSection = () => {
  const [activeControversy, setActiveControversy] = useState('access');

  const controversies = {
    access: {
      title: "Inégalités d'Accès à l'Espace",
      icon: Users,
      description: "La privatisation spatiale créé-t-elle une nouvelle forme d'exclusion sociale ?",
      arguments: {
        pour: [
          "Démocratisation relative par la réduction des coûts",
          "Innovation technologique bénéficiant à tous",
          "Création d'emplois et opportunités économiques",
          "Accélération du progrès spatial"
        ],
        contre: [
          "Réservé aux ultra-riches (450,000€ pour Virgin Galactic)",
          "Concentration du pouvoir spatial entre quelques entreprises",
          "Abandon des missions d'intérêt public au profit du lucratif",
          "Creusement des inégalités terrestres et spatiales"
        ]
      },
      sources: [
        "Rapport OCDE 'The Space Economy at a Glance 2022'",
        "Étude ESA 'Space for Europe' 2023",
        "Analyse CSIS 'Space Threat Assessment' 2023"
      ]
    },
    environment: {
      title: "Impact Environnemental",
      icon: Zap,
      description: "Les activités spatiales privées menacent-elles l'environnement terrestre et orbital ?",
      arguments: {
        pour: [
          "Technologies plus efficaces et moins polluantes",
          "Réutilisation des lanceurs réduisant les déchets",
          "Innovation dans les carburants propres",
          "Meilleure gestion des ressources"
        ],
        contre: [
          "Émissions CO2 massives des lancements (300 tonnes/vol)",
          "Pollution lumineuse de Starlink affectant l'astronomie",
          "Multiplication des débris spatiaux dangereux",
          "Course au nombre de satellites sans régulation"
        ]
      },
      sources: [
        "Étude Nature 'Satellite Constellations Environmental Impact' 2023",
        "Rapport IAU 'Dark and Quiet Skies' 2022",
        "Analyse ESA Space Debris Office 2023"
      ]
    },
    governance: {
      title: "Gouvernance et Souveraineté",
      icon: Scale,
      description: "Comment réguler l'espace quand les entreprises privées dominent ?",
      arguments: {
        pour: [
          "Efficacité supérieure du secteur privé",
          "Innovation non-contrainte par la bureaucratie",
          "Partenariats public-privé bénéfiques",
          "Compétition stimulant la performance"
        ],
        contre: [
          "Perte de contrôle démocratique sur l'espace",
          "Dépendance stratégique vis-à-vis d'entreprises privées",
          "Militarisation potentielle par des acteurs privés",
          "Absence de régulation internationale efficace"
        ]
      },
      sources: [
        "UN Office for Outer Space Affairs Reports 2023",
        "Secure World Foundation 'Global Counterspace Capabilities' 2023",
        "Chatham House 'Space Governance Report' 2022"
      ]
    },
    economics: {
      title: "Modèle Économique",
      icon: DollarSign,
      description: "La privatisation spatiale est-elle économiquement viable et équitable ?",
      arguments: {
        pour: [
          "Réduction drastique des coûts d'accès (10x moins cher)",
          "Création d'une économie spatiale de 400 Md€",
          "Rentabilité prouvée de certains secteurs",
          "Investissements privés massifs (17,9 Md€ en 2023)"
        ],
        contre: [
          "Bulles spéculatives et valorisations artificielles",
          "Dépendance aux subventions publiques cachées",
          "Modèles économiques non-prouvés à long terme",
          "Concentration monopolistique menaçant la concurrence"
        ]
      },
      sources: [
        "Space Foundation 'Space Report 2023'",
        "PwC 'Space Industry Analysis' 2023",
        "Euroconsult 'Satellite Manufacturing & Launch' 2023"
      ]
    }
  };

  const currentControversy = controversies[activeControversy];
  const Icon = currentControversy.icon;

  return (
    <section id="controverses" className="py-20 bg-gradient-to-br from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Débats et Controverses
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            La privatisation spatiale soulève des questions fondamentales sur l'équité, 
            l'environnement, la gouvernance et l'économie. Explorons les arguments.
          </p>
        </div>

        {/* Controversy Selection */}
        <div className="flex flex-wrap justify-center mb-12 gap-3">
          {Object.entries(controversies).map(([key, controversy]) => {
            const TabIcon = controversy.icon;
            return (
              <button
                key={key}
                onClick={() => setActiveControversy(key)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeControversy === key
                    ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-600'
                }`}
              >
                <TabIcon className="h-5 w-5" />
                <span className="hidden sm:inline">{controversy.title}</span>
              </button>
            );
          })}
        </div>

        {/* Current Controversy */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-full border border-violet-500/30">
                <Icon className="h-8 w-8 text-violet-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">{currentControversy.title}</h3>
            <p className="text-slate-300 text-lg">{currentControversy.description}</p>
          </div>

          {/* Arguments For/Against */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Arguments Pour */}
            <div className="p-6 bg-green-500/10 rounded-xl border border-green-500/30">
              <h4 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                Arguments Favorables
              </h4>
              <div className="space-y-3">
                {currentControversy.arguments.pour.map((arg, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-green-400 text-sm mt-1">✓</span>
                    <span className="text-slate-300 text-sm leading-relaxed">{arg}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Arguments Contre */}
            <div className="p-6 bg-red-500/10 rounded-xl border border-red-500/30">
              <h4 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                Arguments Critiques
              </h4>
              <div className="space-y-3">
                {currentControversy.arguments.contre.map((arg, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-red-400 text-sm mt-1">✗</span>
                    <span className="text-slate-300 text-sm leading-relaxed">{arg}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sources */}
          <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-600">
            <h4 className="text-lg font-bold text-white mb-4">Sources et Références</h4>
            <div className="space-y-2">
              {currentControversy.sources.map((source, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-violet-400 text-sm mt-1">•</span>
                  <span className="text-slate-300 text-sm">{source}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="p-8 bg-gradient-to-r from-violet-500/10 to-purple-600/10 rounded-2xl border border-violet-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">
              Vers un Débat Citoyen
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Ces enjeux nécessitent un débat démocratique éclairé. L'avenir de l'espace 
              ne peut être décidé par quelques entreprises seules.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                Participer au Débat
              </button>
              <button className="border border-slate-400 text-slate-300 hover:border-white hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                Consulter les Experts
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ControversiesSection;