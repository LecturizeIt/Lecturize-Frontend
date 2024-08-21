import React from "react";

interface IInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  height?: string;
  width?: string;
}

const InputLogin: React.FC<IInputProps> = ({ value , onChange, placeholder , type, height, width }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ width, height }}
      className="p-2 border w-[${width}] h-[${height}] border-gray-300 rounded-md focus:outline-none"
    />
  );
};

export default InputLogin;
