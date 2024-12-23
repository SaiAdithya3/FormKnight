import React, { useState } from "react";
import clsx from "clsx";
import { useValidation } from "../hooks/useValidation";
import { InputProps } from "../types/types";

export const Input: React.FC<InputProps> = ({
  name,
  label,
  type,
  placeholder,
  value,
  onChange,
  className,
  pattern,
  minLength,
  maxLength,
  required,

}) => {
  const [touched, setTouched] = useState(false);
  const defaultPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const numberPattern = /^[0-9]*$/;
  const finalPattern =
    type === "number"
      ? numberPattern
      : pattern || defaultPattern;

  const error = useValidation(
    value,
    {
      required,
      minLength,
      maxLength,
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
        {required && <span className="text-red-500"> *</span>}
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
          "w-full p-2 border rounded-lg shadow shadow-gray-200/50 focus:outline-none",
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
