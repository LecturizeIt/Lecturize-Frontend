import Navbar from "../components/Navbar/Navbar.component";
import HeroSection from "../components/HeroSection/HeroSection.component";
import BenefitsSection from "../components/BenefitsSection/BenefitsSection.component";
import Footer from "../components/Footer/Footer.component";

function App () {
  return (
    <div className="w-full h-screen overflow-x-hidden">
      <Navbar />
      
      <main className="flex flex-col items-center">
        <HeroSection />
        <BenefitsSection />

        <div className="h-[300px] flex items-center justify-center">
          <h2 className="text-2xl">Seção de Teste 1</h2>
        </div>
        <div className="h-[300px] flex items-center justify-center">
          <h2 className="text-2xl">Seção de Teste 2</h2>
        </div>

        <Footer />
      </main>
    </div>
  );
}

export default App;
