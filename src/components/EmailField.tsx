import React from "react";
import { Input } from "./Input";

export const EmailField: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      // toast.error("Invalid email address");
    }
  };

  return (
    <Input
      label="Email"
      type="email"
      name="email"
      value={value}
      onChange={(val) => {
        onChange(val);
        validateEmail(val);
      }}
      placeholder="Enter your email"
      required
    />
  );
};
