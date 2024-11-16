import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { handleUserAction } from "../../utils/handleUserAction.utils";
import Button from "../../ui/Button/Button.ui";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setScrolled] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`${isScrolled ? "bg-black/10 backdrop-blur-md transition-all duration-500 ease-in-out" : ""} text-white p-2 fixed z-30 w-full flex justify-between items-center`}>
      <div className="flex-1 pl-4">
        <Link to="/">
          <img className="h-20 w-20 inline-block" src="/logo.svg" alt="logo lecturize it" />
        </Link>
      </div>

      {/* Menu hamburguesa para dispositivos mobile */}
      <div className="block lg:hidden">
        <button onClick={toggleMenu} className="text-black focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      <div className="hidden lg:flex items-center space-x-6 pr-4">
        <Button
          onClick={() => handleUserAction(user, navigate, logout, "logout")}
          text={user ? "Sair" : "Entrar"}
          width="150px"
        />
      </div>

      <div
        className={`shadow-2xl lg:hidden ${
          isMenuOpen ? "block" : "hidden"
        } absolute top-16 right-4 bg-white shadow-md p-4 rounded-lg`}
      >
        <div className="flex flex-col space-y-2">
          <Button
            onClick={() => {
              handleUserAction(user, navigate, logout, "logout");
              toggleMenu();
            }}
            text={user ? "Sair" : "Entrar"}
            width="full"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
