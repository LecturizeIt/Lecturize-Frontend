import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { handleAuthAction } from "../../utils/handleAuthAction";
import Button from "../../ui/Button/Button.ui";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="text-black  p-4 flex justify-between items-center">
      <h1 className="text-4xl font-extrabold bg-gradient-to-br from-[#861efd] to-[#2a27d6] bg-clip-text text-transparent">Lecturize It</h1>
      <Button
        onClick={() => {
          handleAuthAction(user, navigate, logout);
        }}
        text={user ? "Sair" : "Entrar"}
        width="10%"
      />
    </nav>
  );
};

export default Navbar;
