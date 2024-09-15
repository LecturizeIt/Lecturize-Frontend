import React, { forwardRef } from "react";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  icon?: React.ReactNode;
  text?: string;
  height?: string;
  width?: string;
}

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  ({ onClick, type = "button", icon, text, height, width, className, ...rest }, ref) => {
    return (
      <button
        type={type}
        onClick={onClick}
        style={{ height, width }}
        ref={ref}
        className={`${className} flex justify-center items-center gap-2 p-2 bg-blue-500 text-white rounded-md bg-gradient-to-br from-[#861efd] to-[#2a27d6] duration-300 hover:scale-105 focus:outline-none`}
        {...rest}
      >
        {icon && <span className="flex items-center justify-center">{icon}</span>}
        {text && <span className="flex items-center justify-center font-bold">{text}</span>}
      </button>
    );
  }
);

Button.displayName = "Button"; 

export default Button;
