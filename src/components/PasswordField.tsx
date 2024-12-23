import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useDebounce } from "../hooks/useDebounce";

interface PasswordFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  required?: boolean;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  name,
  label,
  value,
  onChange,
  className,
  required = false,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [touched, setTouched] = useState(false);
  const [errors, setErrors] = useState({
    minLength: false,
    maxLength: false,
    hasNumber: false,
    hasLetter: false,
    hasSpecialChar: false,
    required: false,
  });

  // Debounced value for delayed validation
  const debouncedValue = useDebounce(value, 400);

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const maxLength = password.length <= 15;
    const hasNumber = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isRequired = required && password.trim().length === 0;

    setErrors({
      minLength: !minLength,
      maxLength: !maxLength,
      hasNumber: !hasNumber,
      hasLetter: !hasLetter,
      hasSpecialChar: !hasSpecialChar,
      required: isRequired,
    });
  };

  useEffect(() => {
    if (touched) {
      validatePassword(debouncedValue);
    }
  }, [debouncedValue, touched]);

  const handleBlur = () => {
    setTouched(true);
    validatePassword(value);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="w-full space-y-2">
      <label htmlFor={name} className="block font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <div className="relative flex gap-1">
        <input
          id={name}
          name={name}
          type={isPasswordVisible ? "text" : "password"}
          placeholder={`Enter ${label}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleBlur}
          className={clsx(
            "w-full p-2 border rounded-lg shadow shadow-gray-200/50 focus:outline-none",
            {
              "border-red-500": touched && Object.values(errors).some((error) => error),
              "border-gray-300": !(touched && Object.values(errors).some((error) => error)),
            },
            className
          )}
          aria-invalid={touched && Object.values(errors).some((error) => error)}
          aria-describedby={touched && Object.values(errors).some((error) => error) ? `${name}-error` : undefined}
        />
          <button
          type="button"
          onClick={togglePasswordVisibility}
          className="right-0 p-2 border shadow shadow-gray-200 rounded-lg text-gray-600 bg-white"
        >
          {isPasswordVisible ? (
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
              className="lucide lucide-eye-off"
            >
              <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
              <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
              <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
              <path d="m2 2 20 20" />
            </svg>
          ) : (
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
              className="lucide lucide-eye"
            >
              <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
      {touched && (
        <div id={`${name}-error`} className="text-red-500 text-sm space-y-1">
          {errors.required && <div>Password is required.</div>}
          {errors.minLength && <div>Password must be at least 8 characters long.</div>}
          {errors.maxLength && <div>Password must be no more than 15 characters long.</div>}
          {errors.hasNumber && <div>Password must contain at least one number.</div>}
          {errors.hasLetter && <div>Password must contain at least one letter.</div>}
          {errors.hasSpecialChar && <div>Password must contain at least one special character.</div>}
        </div>
      )}
    </div>
  );
};
