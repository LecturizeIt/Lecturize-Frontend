import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { handleUserAction } from "../../utils/handleUserAction";

const HeroSection = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <section className="w-full bg-gradient-to-r from-[#861efd] to-[#2a27d6] text-white pt-6">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Organize Suas Palestras de Forma Inteligente
        </h1>
        <p className="text-lg mb-8">
          Simplifique suas palestras com ferramentas poderosas para gerenciar
          conteúdo, horários e mais.
        </p>
        <button
          className="bg-white text-blue-600 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-gray-200"
          onClick={() =>
            handleUserAction(user, navigate, logout, "redirectToLecture")
          }
        >
          Comece agora!
        </button>
      </div>
      <div className="">
        <img
          src="/images/heroBanner.png"
          alt="Palestra"
          className="mx-auto"
        />
      </div>
    </section>
  );
};

export default HeroSection;
