import React, { useState } from "react";
import clsx from "clsx";

interface FileUploadProps {
  label?: string;
  name: string;
  onChange: (file: File | null) => void;
  validationRules?: {
    required?: boolean;
    allowedTypes?: string[];
    maxSize?: number; 
  };
  className?: string; 
  buttonClassName?: string; 
  errorClassName?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label = "Upload File",
  name,
  onChange,
  validationRules = {},
  className,
  buttonClassName,
  errorClassName,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      setFile(null);
      onChange(null);
      return;
    }

    const selectedFile = event.target.files[0];
    const { required, allowedTypes, maxSize } = validationRules;

    // Validation
    if (required && !selectedFile) {
      setError("This field is required.");
      return;
    }

    if (allowedTypes && !allowedTypes.includes(selectedFile.type)) {
      setError(`Invalid file type. Allowed types: ${allowedTypes.join(", ")}`);
      return;
    }

    if (maxSize && selectedFile.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds the limit of ${maxSize}MB.`);
      return;
    }

    // If all validations pass
    setError(null);
    setFile(selectedFile);
    onChange(selectedFile);
  };

  return (
    <div className={clsx("flex flex-col items-start w-full space-y-2", className)}>
      {label && <label className="font-medium text-gray-700">{label}</label>}
      <input
        type="file"
        name={name}
        onChange={handleFileChange}
        className="hidden"
        id={`file-upload-${name}`}
      />
      <label
        htmlFor={`file-upload-${name}`}
        className={clsx(
          "cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded shadow-md transition-all",
          buttonClassName
        )}
      >
        Choose File
      </label>
      {file && (
        <span className="text-sm text-gray-600">
          Selected File: {file.name}
        </span>
      )}
      {error && (
        <span className={clsx("text-sm text-red-500", errorClassName)}>
          {error}
        </span>
      )}
    </div>
  );
};

export default FileUpload;
