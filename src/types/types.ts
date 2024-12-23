export interface Field {
  name: string;
  type?: string;
  options?: string[];
}

export interface ButtonProps {
  name?: string;
  label: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

export interface FileUploadProps {
  label?: string;
  name: string;
  onChange: (file: File | null) => void;
  required?: boolean;
  allowedTypes?: string[];
  maxSize?: number;
  className?: string;
  errorClassName?: string;
}

export interface RadioButtonProps {
  name: string;
  value: string;
  options: { value: string; label: string }[];
  selectedValue: string;
  onChange?: (value: string) => void;
  required?: boolean;
}

export interface InputProps {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "number";
  placeholder?: string;
  value: string;
  onChange?: (value: string) => void;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  className?: string;
}

export interface SearchableDropdownProps {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

export interface DropdownProps {
  name?: string;
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export interface DatePickerProps {
  name?: string;
  value: string;
  onChange: (value: string) => void;
  label: string;
  required?: boolean;
}
