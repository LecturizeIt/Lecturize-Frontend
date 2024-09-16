import { useState } from "react";
import Footer from "../../components/Footer/Footer.component";
import Navbar from "../../components/Navbar/Navbar.component";
import { useAuth } from "../../context/AuthContext";
import Button from "../../ui/Button/Button.ui";
import { Modal } from "../../ui/Modal/Modal.ui";
import LectureForm from "../../components/LectureForm/LectureForm.component";
import ListCards from "../../components/ListCard/ListCard.component";
import { useNavigate } from "react-router-dom";
import { useLecturesByUser } from "../../hooks/useLectures";
import { ErrorNotification } from "../../ui/ErrorNotification/ErrorNotification.ui";

function MyLectures () {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const { data: lectures, isLoading, isError } = useLecturesByUser();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <ErrorNotification error="Erro ao carregar palestras" />;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLectureClick = (id: number) => {
    navigate(`/lectures/${id}`);
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden flex flex-col">
      <Navbar />

      {!user && (
        <div className="flex justify-center mt-4">
          <h3 className="text-lg">Entre ou cadastre-se para criar uma palestra</h3>
        </div>
      )}

      <div className="flex flex-col items-center flex-grow mt-8 relative">
        {user && (
          <div className="h-[30px] w-full flex items-start justify-start">
            <Button onClick={openModal} text="Criar Palestra" className="mt-2 ml-4" />
          </div>
        )}

        {isModalOpen && (
          <Modal onClose={closeModal}>
            <LectureForm />
          </Modal>
        )}

        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold">Suas Palestras</h2>
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
          <h2 className="text-2xl">Seção de Teste 3</h2>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MyLectures;
