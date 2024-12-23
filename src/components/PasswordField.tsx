import React, { useState } from "react";
import { Input } from "./Input";

export const PasswordField: React.FC<{
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({
    minLength: false,
    maxLength: false,
    hasNumber: false,
    hasLetter: false,
    hasSpecialChar: false,
  });

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const maxLength = password.length <= 15;
    const hasNumber = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    setErrors({
      minLength: !minLength,
      maxLength: !maxLength,
      hasNumber: !hasNumber,
      hasLetter: !hasLetter,
      hasSpecialChar: !hasSpecialChar,
    });
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div>
      <div className="flex items-center relative gap-2">
        <div className="flex-grow">
          <Input
            name="password"
            label="Password"
            type={isPasswordVisible ? "text" : "password"}
            value={value}
            onChange={(val) => {
              onChange(val);
              validatePassword(val);
            }}
            placeholder="Enter your password"
            required
            validationRules={{ required: true, minLength: 3, maxLength: 15 }}
          />
        </div>
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="right-0 p-2 border  rounded-lg text-gray-600 bg-white"
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
      <div className="flex justify-between text-sm">
        <div className="flex md:flex-row flex-col md:gap-3 w-full">
          {errors.minLength && (
            <p className="text-red-500">Min 8 characters &nbsp; |</p>
          )}
          {errors.maxLength && (
            <p className="text-red-500">Max 15 characters &nbsp; |</p>
          )}
          {errors.hasNumber && (
            <p className="text-red-500">Must contain a number &nbsp; |</p>
          )}
          {errors.hasLetter && (
            <p className="text-red-500">Must contain a letter &nbsp; |</p>
          )}
          {errors.hasSpecialChar && (
            <p className="text-red-500">Must contain a special character</p>
          )}
        </div>
      </div>
    </div>
  );
};
