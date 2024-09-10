import Navbar from "../components/Navbar/Navbar.component";
import HeroSection from "../components/HeroSection/HeroSection.component";
import BenefitsSection from "../components/BenefitsSection/BenefitsSection.component";
import Footer from "../components/Footer/Footer.component";
import { useLectures } from "../hooks/useLectures";
import { useNavigate } from "react-router-dom";

function App () {

  const { data: lectures, isLoading, isError } = useLectures();
  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading users</p>;

  const handleLectureClick = (id: number) => {
    navigate(`/lectures/${id}`);
  };

  return (
    <div className="w-full h-screen overflow-x-hidden">
      <Navbar />
      
      <main className="flex flex-col items-center">
        <HeroSection />
        <BenefitsSection />

        <div className="h-[300px] flex items-center justify-center">
          <h2 className="text-2xl">
            {lectures?.map(lecture => (
              <li key={lecture.id} onClick={() => handleLectureClick(lecture.id)} className="cursor-pointer">
                <p>titulo - {lecture.title}</p>
                <p>descrição - {lecture.description}</p>
                <p>começo - {lecture.startsAt}</p>
                <p>final - {lecture.endsAt}</p>
                <p>tipo - {lecture.type}</p>
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
