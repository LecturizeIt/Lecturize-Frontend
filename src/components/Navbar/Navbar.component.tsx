import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { handleUserAction } from "../../utils/handleUserAction";
import Button from "../../ui/Button/Button.ui";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="text-black p-4 flex justify-between items-center bg-white shadow-md">
      <div className="flex-1">
        <Link to="/" className="w-auto">
          <h1 className="text-4xl font-extrabold text-bg-gradient">
            Lecturize It
          </h1>
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

      {/* Links e btn de Login/Logout para desktop */}
      <div className="hidden lg:flex items-center space-x-4 pr-4">
        <Link
          to="/lecture"
          className="font-bold text-bg-gradient underline-animation"
        >
          Palestras
        </Link>
        {user && (
          <>
            <Link
              to="/dashboard"
              className="font-bold text-bg-gradient underline-animation"
            >
              Dashboard
            </Link>
          </>
        )}
        <Button
          onClick={() => handleUserAction(user, navigate, logout, "logout")}
          text={user ? "Sair" : "Entrar"}
          width="150px"
        />
      </div>

      {/* Menu colapsavel para dispositivos mobile */}
      <div
        className={`shadow-2xl lg:hidden ${
          isMenuOpen ? "block" : "hidden"
        } absolute top-16 right-4 bg-white shadow-md p-4 rounded-lg`}
      >
        <div className="flex flex-col space-y-2">
          <Link
            to="/lecture"
            className="font-bold text-bg-gradient underline-animation"
            onClick={toggleMenu}
          >
            Palestras
          </Link>
          {user && (
            <>
              <Link
                to="/dashboard"
                className="font-bold text-bg-gradient underline-animation"
                onClick={toggleMenu}
              >
                Dashboard
              </Link>
            </>
          )}
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
