import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#e2e2e2] text-white py-4 w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center h-full space-y-4 md:space-y-0">
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
          <a
            href="https://www.linkedin.com/company/lecturize"
            target="_blank"
            rel="noopener noreferrer"
            className="text-bg-gradient underline-animation"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/lecturizeit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-bg-gradient underline-animation"
          >
            GitHub
          </a>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
          <Link to="/" className="text-bg-gradient underline-animation">Início</Link>
          <Link to="#about" className="text-bg-gradient underline-animation">Sobre</Link>
          <Link to="#services" className="text-bg-gradient underline-animation">Serviços</Link>
          <Link to="#contact" className="text-bg-gradient underline-animation">Contato</Link>
        </div>
      </div>

      <hr className="border-t border-violet-700 w-full opacity-50 my-4" />

      <div className="text-sm text-bg-gradient text-center">
        <p>&copy; {new Date().getFullYear()} Lecturize It. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
