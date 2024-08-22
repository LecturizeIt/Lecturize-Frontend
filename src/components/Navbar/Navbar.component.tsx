
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../../ui/Button/Button.ui";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (user) {
      logout();
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="bg-[#e2e2e2] shadow-xl  text-black  p-4 flex justify-between items-center">
      <h1 className="text-shadow text-2xl font-bold">Lecturize It</h1>
      <Button
        onClick={handleAuthAction}
        text={user ? "Sair" : "Entrar"}
        width="10%"
      />
    </nav>
  );
};

export default Navbar;
