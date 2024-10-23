import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#861efd] to-[#2a27d6] text-white py-4 w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center h-full space-y-4 md:space-y-0">
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
          <a
            href="https://www.linkedin.com/company/lecturize"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-animation"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/lecturizeit"
            target="_blank"
            rel="noopener noreferrer"
            className=" underline-animation"
          >
            GitHub
          </a>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
          <Link to="/" className="underline-animation">Início</Link>
          <Link to="#about" className="underline-animation">Sobre</Link>
          <Link to="#services" className="underline-animation">Serviços</Link>
          <Link to="#contact" className="underline-animation">Contato</Link>
        </div>
      </div>

      <hr className="border-t border-white w-full opacity-50 my-4" />

      <div className="text-sm  text-center">
        <p>&copy; {new Date().getFullYear()} Lecturize It. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
