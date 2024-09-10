import React from "react";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement>{
  height?: string;
  width?: string;
}

const Input: React.FC<IInputProps> = ({ type, value, name, onChange, placeholder, height, width }) => {
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ width, height }}
      className="p-2 border border-gray-300 rounded-md focus:outline-none"
    />
  );
};

export default Input;
