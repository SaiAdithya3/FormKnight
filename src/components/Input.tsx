import React, { useState } from "react";
import { useValidation } from "../hooks/useValidation";
import clsx from "clsx";

interface InputProps {
  name?: string;
  label: string;
  type: "text" | "email" | "password";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  validationRules: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
  };
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  name,
  label,
  type,
  placeholder,
  value,
  onChange,
  validationRules,
  className,
}) => {
  const [touched, setTouched] = useState(false);
  const defaultPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const finalPattern = validationRules.pattern || defaultPattern;

  const error = useValidation(
    value,
    {
      ...validationRules,
      pattern: finalPattern,
    },
    type,
    800,
    touched
  );

  const handleBlur = () => {
    setTouched(true);
  };

  return (
    <div className="w-full space-y-2">
      <label className="block font-medium text-gray-700">{label}</label>
      <div className="flex items-center gap-1"></div>
      <input
        name={name}
        type={type}
        placeholder={placeholder ? placeholder : `Enter ${name}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleBlur}
        className={clsx(
          "w-full p-2 border rounded",
          {
            "border-red-500": touched && error,
            "border-gray-300": !(touched && error),
          },
          className
        )}
      />
      {touched && error && (
        <span className="text-red-500 text-sm">{error}</span>
      )}
    </div>
  );
};
