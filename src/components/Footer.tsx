import { Satellite, Mail, ExternalLink, GithubIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-br from-violet-500 to-purple-600 p-2 rounded-lg">
                <Satellite className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">SpaceDebate</h3>
                <p className="text-xs text-slate-400">
                  Enjeux Spatiaux Contemporains
                </p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Une analyse critique et documentée des enjeux de la privatisation
              spatiale et de la pollution orbitale, basée sur des sources
              européennes de référence.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <nav className="space-y-2">
              {[
                { href: "#privatisation", label: "Privatisation" },
                { href: "#debris", label: "Débris Spatiaux" },
                { href: "#acteurs", label: "Acteurs Majeurs" },
                { href: "#controverses", label: "Controverses" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block text-slate-400 hover:text-white transition-colors text-sm"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Ressources</h4>
            <div className="space-y-2">
              {[
                { name: "Sources Officielles", href: "#sources" },
                {
                  name: "Rapports ESA",
                  external: true,
                  href: "https://www.esa.int/About_Us/ESA_s_Annual_Report",
                },
                {
                  name: "Données CNES",
                  external: true,
                  href: "https://geodes.cnes.fr/",
                },
                {
                  name: "Analyses OCDE",
                  external: true,
                  href: "https://www.oecd.org/",
                },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href || "#"}
                  className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors text-sm"
                >
                  {item.name}
                  {item.external && <ExternalLink className="h-3 w-3" />}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <a
                href="mailto:EdouardoGhossein26@gmail.com"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
              >
                <Mail className="h-4 w-4" />
                EdouardoGhossein26@gmail.com
              </a>
              <a
                href="https://github.com/EdouardoGhoussein/SpaceDebate"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
              >
                <GithubIcon className="h-4 w-4" />
                Contribuer au projet
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-400 text-sm">
              © 2025 SpaceDebate. Projet éducatif et informatif sur les enjeux
              spatiaux contemporains.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
