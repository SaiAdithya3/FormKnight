import React, { useState, useCallback, ReactElement } from "react";
import { cn } from "../utils/cn";

interface FormProps {
  onSubmit: (data: Record<string, any>) => void;
  children: React.ReactNode;
  className?: string;
}

const Form: React.FC<FormProps> = ({
  onSubmit,
  children,
  className = "",
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = useCallback((name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // console.log(value);
  }, []);

  const handleError = useCallback((name: string, error: string) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const newErrors: Record<string, string> = {};

    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.props.required) {
        const { name, label } = child.props;
        const value = formData[name];

        if (!value || value === "") {
          newErrors[name] = `${label || name} is required`;
        }
      } else {
        console.log("Cannot submit form : ",errors)
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitted(false);
      return;
    }

    setIsSubmitted(false);
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className={cn("space-y-4 p-6 rounded-lg border", className)}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.props.name) {
          return React.cloneElement(child as ReactElement<any>, {
            value: formData[child.props.name] || "",
            onChange: (value: any) => handleInputChange(child.props.name, value),
            onError: handleError,
            isSubmitted,
          });
        }

        return child;
      })}
    </form>
  );
};

export default Form;