import Navbar from "../components/Navbar/Navbar.component";
import HeroSection from "../components/HeroSection/HeroSection.component";
import BenefitsSection from "../components/BenefitsSection/BenefitsSection.component";
import Footer from "../components/Footer/Footer.component";
import { useLectures } from "../hooks/useLectures";

function App () {

  const { data: lectures, isLoading, isError } = useLectures();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading users</p>;

  return (
    <div className="w-full h-screen overflow-x-hidden">
      <Navbar />
      
      <main className="flex flex-col items-center">
        <HeroSection />
        <BenefitsSection />

        <div className="h-[300px] flex items-center justify-center">
          <h2 className="text-2xl">
            {lectures?.map(lecture => (
              <li key={lecture.id}>
                <p>{lecture.title}</p>
                <p>{lecture.description}</p>
                <p>{lecture.type}</p>
              </li>
            ))}
          </h2>
        </div>
        <div className="h-[300px] flex items-center justify-center">
          <h2 className="text-2xl">Seção de Teste</h2>
        </div>

        <Footer />
      </main>
    </div>
  );
}

export default App;
