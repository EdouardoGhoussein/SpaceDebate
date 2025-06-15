import { useState } from "react";
import { Rocket, AlertTriangle, Globe, Satellite } from "lucide-react";
import EarthVisualization from "./EarthVisualization";

const Hero = () => {
  const [showEarthViz, setShowEarthViz] = useState(false);

  return (
    <>
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-500"></div>
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-indigo-400 rounded-full animate-ping delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="text-center">
            <div className="mb-8 flex justify-center space-x-4">
              <div className="p-4 bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-full border border-violet-500/30">
                <Rocket className="h-12 w-12 text-violet-400" />
              </div>
              <div className="p-4 bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-full border border-orange-500/30">
                <AlertTriangle className="h-12 w-12 text-orange-400" />
              </div>
              <div className="p-4 bg-gradient-to-br from-blue-500/20 to-cyan-600/20 rounded-full border border-blue-500/30">
                <Globe className="h-12 w-12 text-blue-400" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              La Course à l'Espace
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-600">
                Privatisée
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              L’exploitation spatiale devrait-elle rester public et
              international, ou faut-il accepter une privatisation croissante au
              détriment de la régulation globale et des enjeux environnementaux
              et surtout malgré les risques de surabondance des satellites en
              orbite basse ?
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() =>
                  document
                    .getElementById("privatisation")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-violet-500/25"
              >
                Explorer les Enjeux
              </button>
              <button
                onClick={() => setShowEarthViz(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
              >
                <Satellite className="h-5 w-5" />
                Visualisation 3D
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("sources")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="border-2 border-slate-400 text-slate-300 hover:border-white hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Voir les Sources
              </button>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-violet-400 mb-2">
                  34,000+
                </div>
                <div className="text-slate-400">Objets suivis en orbite</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">
                  130M+
                </div>
                <div className="text-slate-400">Débris {">"} 1mm</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  €400Md
                </div>
                <div className="text-slate-400">Économie spatiale 2023</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EarthVisualization
        isOpen={showEarthViz}
        onClose={() => setShowEarthViz(false)}
      />
    </>
  );
};

export default Hero;
