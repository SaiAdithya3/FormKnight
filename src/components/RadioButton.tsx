import React from "react";

interface RadioButtonProps {
  name: string;
  value: string;
  options: { value: string; label: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  name,
  value,
  options,
  selectedValue,
  onChange,
}) => {
  return (
    <div className="space-y-2">
      <label className="block font-medium text-gray-700">{value}</label>
      <div className="flex space-x-4">
        {options.map((option) => (
          <label key={option.value} className="flex items-center">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => onChange(option.value)}
              className="mr-2"
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioButton;
