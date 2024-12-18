export interface FormFieldProps {
    name: string;
    label: string;
    type?: string;
    value: string | number;
    onChange: (value: string | number) => void;
    error?: string;
    placeholder?: string;
    style?: React.CSSProperties;
}

export interface ValidationResult {
    isValid: boolean;
    errors: Record<string, string>;
}

export interface FormValidatorProps {
    initialValues: Record<string, string | number>;
    onSubmit: (values: Record<string, string | number>) => void;
    validate: (values: Record<string, string | number>) => ValidationResult;
    children: React.ReactNode;
}