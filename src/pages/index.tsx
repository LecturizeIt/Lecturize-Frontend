import Navbar from "../components/Navbar/Navbar.component";
import HeroSection from "../components/HeroSection/HeroSection.component";
import BenefitsSection from "../components/BenefitsSection/BenefitsSection.component";
import Footer from "../components/Footer/Footer.component";
import { useLectures } from "../hooks/useLectures";
import { useNavigate } from "react-router-dom";
import ListCards from "../components/ListCard/ListCard.component";
import { ErrorNotification } from "../ui/ErrorNotification/ErrorNotification.ui";
import LoadingSpinner from "../ui/Loading/Loading.ui";

function App () {
  const { data: lectures, isLoading, isError } = useLectures();
  const navigate = useNavigate();

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorNotification error="Erro ao carregar palestras" />;

  const handleLectureClick = (id: number) => {
    navigate(`/lectures/${id}`);
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex flex-col items-center">
        <HeroSection />
        <BenefitsSection />

        <div className="flex flex-col items-center justify-center mb-6">
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
      </main>

      <Footer />
    </div>
  );
}

export default App;
