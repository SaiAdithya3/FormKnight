import React, { useState } from "react";
import { useValidation } from "../hooks/useValidation";

interface DropdownProps {
  name?: string;
  label: string;
  options: { value: string; label: string }[];
  value: string;
  type?: "text";
  onChange: (value: string) => void;
  validationRules: {
    required?: boolean;
  };
}

export const Dropdown: React.FC<DropdownProps> = ({
  name,
  label,
  options,
  type,
  value,
  onChange,
  validationRules,
}) => {
  // const error = useValidation(value, validationRules);
  const [touched, setTouched] = useState(false);
  const error = useValidation(
    value,
    {
      ...validationRules,
    },
    type,
    800,
    touched
  );

  return (
    <div className="w-full space-y-2">
      <label className="block font-medium text-gray-700">{label}</label>
      <select
      name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full p-2 border rounded ${
          error ? "border-red-500" : "border-gray-300"
        } focus:outline-none focus:ring-2 focus:ring-blue-400`}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
