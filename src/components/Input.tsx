import React, { useState } from "react";
import clsx from "clsx";
import { useValidation } from "../hooks/useValidation";

interface InputProps {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "number";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  validationRules?: {
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
  validationRules = {},
  className,
}) => {
  const [touched, setTouched] = useState(false);
  const defaultPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const numberPattern = /^[0-9]*$/;
  const finalPattern =
    type === "number"
      ? numberPattern
      : validationRules.pattern || defaultPattern;

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
      <label htmlFor={name} className="block font-medium text-gray-700">
        {label}
        {validationRules.required && <span className="text-red-500"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder || `Enter ${label}`}
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
        aria-invalid={touched && !!error}
        aria-describedby={touched && error ? `${name}-error` : undefined}
      />
      {touched && error && (
        <span id={`${name}-error`} className="text-red-500 text-sm">
          {error}
        </span>
      )}
    </div>
  );
};
