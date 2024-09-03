import { useState } from "react";
import Footer from "../../components/Footer/Footer.component";
import Navbar from "../../components/Navbar/Navbar.component";
import { useAuth } from "../../context/AuthContext";
import Button from "../../ui/Button/Button.ui";
import { Modal } from "../../ui/Modal/Modal.ui";

function Lecture () {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
            <Button
              onClick={openModal}
              text="Criar Palestra"
              className="mt-2 ml-4"
            />
          </div>
        )}

        {isModalOpen && (
          <Modal onClose={closeModal}>
            <div>
              <p>forms post lecture</p>
            </div>
          </Modal>
        )}

        <div className="h-[300px] flex items-center justify-center">
          <h2 className="text-2xl">Seção de Teste 2</h2>
        </div>
        <div className="h-[300px] flex items-center justify-center">
          <h2 className="text-2xl">Seção de Teste 3</h2>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Lecture;
