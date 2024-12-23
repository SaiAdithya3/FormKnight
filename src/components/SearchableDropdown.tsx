import React, { useState, useRef, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { SearchableDropdownProps } from "../types/types";

export const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Search...",
  required,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false); 
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1); 
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        Math.min(prevIndex + 1, filteredOptions.length - 1)
      );
    } else if (event.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (event.key === "Enter" && highlightedIndex >= 0) {
      const selectedOption = filteredOptions[highlightedIndex];
      onChange(selectedOption.value);
      setSearchTerm(selectedOption.label);
      setIsOpen(false); 
      setHighlightedIndex(-1);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // useEffect(() => {
  //   if (inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }, [isOpen]);

  return (
    <div className="w-full space-y-2" ref={dropdownRef}>
      <label className="block font-medium text-gray-700">{label}
        <span className="text-red-500">{required ? " *" : ""} </span>
      </label>

      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)} 
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          onKeyDown={handleKeyDown}
          className={`w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400`}
        />
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <div
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setSearchTerm(option.label);
                    setIsOpen(false); 
                    setHighlightedIndex(-1); 
                  }}
                  className={`cursor-pointer p-2 hover:bg-blue-50 border-b border-blue-50/50 ${
                    index === highlightedIndex ? "bg-blue-200" : ""
                  }`}
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500">No options found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
