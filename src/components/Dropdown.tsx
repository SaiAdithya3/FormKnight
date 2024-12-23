import React, { useState, useEffect, useRef } from "react";
import { useValidation } from "../hooks/useValidation";
import { DropdownProps } from "types";

export const Dropdown: React.FC<DropdownProps> = ({
  name,
  label,
  options,
  value,
  onChange,
  required,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [touched, setTouched] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const error = useValidation(value, { required }, "text", 800, touched);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full space-y-2" ref={dropdownRef}>
      <label className="block font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div
        className={`flex items-center bg-white justify-between w-full p-2 border rounded-lg shadow shadow-gray-300/50 hover:shadow-lg hover:shadow-gray-200 transition-all focus:outline-none cursor-pointer ${
          error ? "border-red-500" : "border-gray-300"
        } focus:outline-none focus:ring-2 focus:ring-blue-400`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={`${value ? "text-black" : "text-gray-400"}`}>
          {value
            ? options.find((opt) => opt.value === value)?.label
            : "Select an option"}
        </span>
        <span
          className={`
          ${
            !isOpen
              ? "transform rotate-180 transition-all ease-in duration-200"
              : "transition-all ease-in duration-200"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-up"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        </span>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
                setTouched(true);
              }}
              className={`p-2 cursor-pointer hover:bg-blue-100 ${
                value === option.value ? "bg-blue-50 font-semibold" : ""
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
