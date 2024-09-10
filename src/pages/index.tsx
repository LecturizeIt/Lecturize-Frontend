import Navbar from "../components/Navbar/Navbar.component";
import HeroSection from "../components/HeroSection/HeroSection.component";
import BenefitsSection from "../components/BenefitsSection/BenefitsSection.component";
import Footer from "../components/Footer/Footer.component";
import { useLectures } from "../hooks/useLectures";
import { useNavigate } from "react-router-dom";
import ListCards from "../components/ListCard/ListCard.component";
import { ErrorNotification } from "../ui/ErrorNotification/ErrorNotification.ui";

function App () {

  const { data: lectures, isLoading, isError } = useLectures();
  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <ErrorNotification error="Erro ao carregar palestras" />;

  const handleLectureClick = (id: number) => {
    navigate(`/lectures/${id}`);
  };

  return (
    <div className="w-full h-screen overflow-x-hidden">
      <Navbar />
      
      <main className="flex flex-col items-center">
        <HeroSection />
        <BenefitsSection />

        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Nossas Palestras</h2>
          <p className="text-lg text-gray-600 text-center mb-8">
            Explore as palestras que oferecemos e descubra temas interessantes para expandir seus conhecimentos. Clique em uma palestra para saber mais.
          </p>
          {lectures && lectures.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center">
              <ListCards 
                lectures={lectures} 
                onCardClick={handleLectureClick} 
              />
            </div>
          ) : (
            <p className="text-lg text-gray-600 text-center">Nenhuma palestra cadastrada no sistema.</p>
          )}
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
