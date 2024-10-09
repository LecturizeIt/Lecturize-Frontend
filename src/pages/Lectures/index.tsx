import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer.component";
import ListCards from "../../components/ListCard/ListCard.component";
import Navbar from "../../components/Navbar/Navbar.component";
import { useLectures } from "../../hooks/useLectures";
import { ErrorNotification } from "../../ui/ErrorNotification/ErrorNotification.ui";

function Lectures () {
  const { data: lectures, isLoading, isError } = useLectures();
  const navigate = useNavigate();

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (isError) return <ErrorNotification error="Erro ao carregar palestras" />;

  const handleLectureClick = (id: number) => {
    navigate(`/lectures/${id}`);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <div className="max-w-8xl mx-auto p-6">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Nossas Palestras</h2>
          <p className="text-lg text-gray-600 text-center mb-8">
            Explore as palestras que oferecemos e descubra temas interessantes para expandir seus conhecimentos. Clique em uma palestra para saber mais.
          </p>

          {lectures && lectures.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-6">
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

export default Lectures;
