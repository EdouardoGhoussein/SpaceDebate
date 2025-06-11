import Header from "./components/Header";
import Hero from "./components/Hero";
import PrivatizationSection from "./components/PrivatizationSection";
import DebrisSection from "./components/DebrisSection";
import ActorsSection from "./components/ActorsSection";
import ControversiesSection from "./components/ControversiesSection";
import SourcesSection from "./components/SourcesSection";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <Hero />
      <PrivatizationSection />
      <DebrisSection />
      <ActorsSection />
      <ControversiesSection />
      <SourcesSection />
      <Footer />
    </div>
  );
}

export default App;
