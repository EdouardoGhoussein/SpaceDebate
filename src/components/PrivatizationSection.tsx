import React, { useState } from 'react';
import { Building2, TrendingUp, Users, DollarSign } from 'lucide-react';

const PrivatizationSection = () => {
  const [activeTab, setActiveTab] = useState('evolution');

  const tabs = [
    { id: 'evolution', label: 'Évolution', icon: TrendingUp },
    { id: 'acteurs', label: 'Acteurs Privés', icon: Building2 },
    { id: 'impacts', label: 'Impacts', icon: Users },
    { id: 'economie', label: 'Économie', icon: DollarSign }
  ];

  const content = {
    evolution: {
      title: "L'Évolution de la Privatisation Spatiale",
      text: "Depuis les années 2000, nous assistons à une transformation radicale du secteur spatial. Les agences gouvernementales, longtemps seules maîtresses de l'espace, voient désormais des entreprises privées prendre une place prépondérante.",
      data: [
        { year: "2002", event: "Création de SpaceX par Elon Musk", impact: "Révolution des lanceurs réutilisables" },
        { year: "2004", event: "Lancement du programme COTS par la NASA", impact: "Ouverture aux partenariats privés" },
        { year: "2020", event: "Premier vol habité privé (SpaceX Crew Dragon)", impact: "Fin du monopole gouvernemental" },
        { year: "2023", event: "Plus de 2,600 satellites Starlink en orbite", impact: "Démocratisation de l'accès spatial" }
      ]
    },
    acteurs: {
      title: "Les Géants de l'Espace Privé",
      text: "Une nouvelle génération d'entreprises redéfinit les règles du jeu spatial, avec des approches innovantes mais controversées.",
      companies: [
        { name: "SpaceX (USA)", focus: "Lanceurs, satellites, exploration", achievement: "Réduction des coûts de 90%", concern: "Pollution lumineuse Starlink" },
        { name: "Blue Origin (USA)", focus: "Tourisme spatial, lanceurs", achievement: "Vols suborbitaux commerciaux", concern: "Impact environnemental" },
        { name: "Virgin Galactic (USA)", focus: "Tourisme spatial", achievement: "Démocratisation de l'espace", concern: "Élitisme économique" },
        { name: "Arianespace (Europe)", focus: "Lanceurs commerciaux", achievement: "Leader européen historique", concern: "Concurrence déloyale" }
      ]
    },
    impacts: {
      title: "Impacts Sociétaux et Environnementaux",
      text: "La privatisation spatiale soulève des questions fondamentales sur l'accès équitable à l'espace et la protection de l'environnement orbital.",
      impacts: [
        { category: "Positif", items: ["Innovation technologique accélérée", "Réduction des coûts d'accès", "Création d'emplois", "Démocratisation relative"] },
        { category: "Négatif", items: ["Inégalités d'accès", "Militarisation potentielle", "Pollution orbitale", "Dépendance technologique"] }
      ]
    },
    economie: {
      title: "L'Économie Spatiale en Mutation",
      text: "Le marché spatial connaît une croissance exponentielle, portée par les investissements privés et les nouvelles applications commerciales.",
      stats: [
        { metric: "Investissements 2023", value: "17,9 Md€", trend: "+15% vs 2022" },
        { metric: "Emplois secteur spatial", value: "231,000", trend: "En Europe" },
        { metric: "Satellites lancés 2023", value: "2,877", trend: "+28% vs 2022" },
        { metric: "Revenus commerciaux", value: "95,3 Md€", trend: "Monde, 2023" }
      ]
    }
  };

  return (
    <section id="privatisation" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            La Privatisation de l'Espace
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Comment les entreprises privées transforment-elles l'industrie spatiale 
            et quelles en sont les conséquences ?
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-12 gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
          <h3 className="text-2xl font-bold text-white mb-4">
            {content[activeTab].title}
          </h3>
          <p className="text-slate-300 mb-8 leading-relaxed">
            {content[activeTab].text}
          </p>

          {activeTab === 'evolution' && (
            <div className="space-y-6">
              {content.evolution.data.map((item, index) => (
                <div key={index} className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-slate-800 rounded-lg border border-slate-600">
                  <div className="text-violet-400 font-bold text-lg min-w-[80px]">
                    {item.year}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">{item.event}</h4>
                    <p className="text-slate-400">{item.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'acteurs' && (
            <div className="grid md:grid-cols-2 gap-6">
              {content.acteurs.companies.map((company, index) => (
                <div key={index} className="p-6 bg-slate-800 rounded-lg border border-slate-600">
                  <h4 className="text-violet-400 font-bold text-lg mb-2">{company.name}</h4>
                  <p className="text-slate-300 mb-3">{company.focus}</p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-green-400 text-sm">✓</span>
                      <span className="text-slate-400 text-sm">{company.achievement}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-400 text-sm">⚠</span>
                      <span className="text-slate-400 text-sm">{company.concern}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'impacts' && (
            <div className="grid md:grid-cols-2 gap-8">
              {content.impacts.impacts.map((impact, index) => (
                <div key={index} className="p-6 bg-slate-800 rounded-lg border border-slate-600">
                  <h4 className={`font-bold text-lg mb-4 ${
                    impact.category === 'Positif' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    Impacts {impact.category}s
                  </h4>
                  <ul className="space-y-2">
                    {impact.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className={`text-sm ${
                          impact.category === 'Positif' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {impact.category === 'Positif' ? '✓' : '✗'}
                        </span>
                        <span className="text-slate-300 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'economie' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.economie.stats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-slate-800 rounded-lg border border-slate-600">
                  <div className="text-2xl font-bold text-violet-400 mb-2">{stat.value}</div>
                  <div className="text-white font-semibold mb-1">{stat.metric}</div>
                  <div className="text-slate-400 text-sm">{stat.trend}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PrivatizationSection;