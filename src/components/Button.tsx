import React from "react";
import { ButtonProps } from "types";

export const Button: React.FC<ButtonProps> = ({
  name,
  label,
  type = "button",
  onClick,
  disabled = false,
}) => (
  <button
    name={name}
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 my-2 w-full text-white font-medium rounded-lg transition-all ${
      disabled
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-blue-500 hover:bg-blue-600"
    }`}
  >
    {label}
  </button>
);