import React from "react";

interface IButtonProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
  text?: string;
  height?: string;
  width?: string;
}

const Button: React.FC<IButtonProps> = ({ onClick, type = "button", icon, text, height, width }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{ height, width }}
      className="flex justify-center items-center gap-2 p-2 bg-blue-500 text-white rounded-md bg-gradient-to-br from-[#861efd] to-[#2a27d6] duration-300 hover:scale-105 focus:outline-none"
    >
      {icon && <span className="flex items-center justify-center">{icon}</span>}
      {text && <span className="flex items-center justify-center font-bold">{text}</span>}
    </button>
  );
};

export default Button;
