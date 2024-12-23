import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useDebounce } from "./useDebounce";

interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
}

const validateEmail = (email: string) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
};

export const useValidation = (
  value: string,
  rules: ValidationRules,
  inputType: "email" | "text" | "number" | "password" = "text" ,
  debounceDelay = 800,
  isTouched: boolean
) => {
  const [error, setError] = useState<string | null>(null);
  const debouncedValue = useDebounce(value, debounceDelay);

  useEffect(() => {
    if (isTouched) {
      validate(debouncedValue);
    }
  }, [debouncedValue, isTouched]);

  const validate = (val: string) => {
    if (inputType === "email") {
      if (rules.required && !val.trim()) {
        handleError("This field is required");
      } else if (!validateEmail(val)) {
        handleError("Invalid email format");
      } else {
        setError(null); 
      }
    } else {
      if (rules.required && !val.trim()) {
        handleError("This field is required");
      } else if (rules.minLength && val.length < rules.minLength) {
        handleError(`Must be at least ${rules.minLength} characters`);
      } else if (rules.maxLength && val.length > rules.maxLength) {
        handleError(`Must be no more than ${rules.maxLength} characters`);
      } else {
        setError(null);
      }
    }
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);

    if (error !== errorMessage) {
      // toast.error(errorMessage);
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  return error;
};
