import React, { useState, useEffect } from "react";
import clsx from "clsx";

interface RadioButtonOption {
  value: string;
  label: string;
}

interface RadioButtonProps {
  name: string;
  label: string;
  options: RadioButtonOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  name,
  label,
  options,
  selectedValue,
  onChange,
  required = false,
  className,
}) => {
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (touched && required && !selectedValue) {
      setError("This field is required.");
    } else {
      setError("");
    }
  }, [selectedValue, touched, required]);

  const handleBlur = () => {
    setTouched(true);
    if (required && !selectedValue) {
      setError("This field is required.");
    }
  };

  return (
    <div className="w-full space-y-2 my-2">
      <label className="block font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <div className="flex space-x-4">
        {options.map((option) => (
          <label key={option.value} className="flex items-center">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => onChange(option.value)}
              onBlur={handleBlur}
              className={clsx("mr-2", {
                "border-red-500": touched && error,
                "border-gray-300": !(touched && error),
              })}
              aria-invalid={touched && !!error}
              aria-describedby={touched && error ? `${name}-error` : undefined}
            />
            {option.label}
          </label>
        ))}
      </div>
      {touched && error && (
        <span id={`${name}-error`} className="text-red-500 text-sm">
          {error}
        </span>
      )}
    </div>
  );
};