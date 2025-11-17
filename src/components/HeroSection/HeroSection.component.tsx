import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { handleUserAction } from "../../utils/handleUserAction.utils";
import Particles from "../Particles/Particles.component";

const HeroSection = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <section className="w-full h-[750px] bg-gradient-to-r from-[#861efd] to-[#2a27d6] text-white pt-6">
      <div className="container mx-auto px-6 text-center mt-24">
        <h1 className="text-8xl font-bold mb-4 text-stroke no-select">
          Organize Suas Palestras de Forma Inteligente
        </h1>
        <p className="text-lg mb-8 no-select">
          Simplifique suas palestras com ferramentas poderosas para gerenciar
          conteúdo, horários e mais.
        </p>

        <button
          className="text-white text-2xl font-bold px-6 py-3 underline no-select"
          onClick={() =>
            handleUserAction(user, navigate, logout, "redirectToLecture")
          }
        >
          Comece agora!
        </button>
        <span>Ou</span>
        <Link
          className="text-white text-2xl font-bold px-6 py-3 underline no-select"
          to="/lectures"
        >
          Veja Nossas Palestras
        </Link>

      </div>
      <Particles />
    </section>
  );
};

export default HeroSection;
