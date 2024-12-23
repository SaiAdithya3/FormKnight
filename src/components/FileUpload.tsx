import React, { useState } from "react";
import clsx from "clsx";
import { FileUploadProps } from "../types/types";

export const FileUpload: React.FC<FileUploadProps> = ({
  label = "Upload File",
  name,
  onChange,
  className,
  errorClassName,
  required,
  allowedTypes,
  maxSize,
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
    // const { required, allowedTypes, maxSize } = validationRules;

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
    <div
      className={clsx("flex flex-col items-start w-full space-y-2", className)}
    >
      <label className="font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      <div
        className={clsx(
          "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all relative",
          { "border-red-500": error, "border-gray-300": !error },
          { "border-green-500 bg-green-200/50": file, "": !file }
        )}
      >
        <input
          type="file"
          name={name}
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        {!file ? (
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="52"
              height="52"
              viewBox="0 0 30 30"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-upload text-gray-500"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" x2="12" y1="3" y2="15" />
            </svg>
            <span className="text-sm text-center text-gray-500">
              Click or drag a file to upload
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="52"
              height="52"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-check my-2 text-green-500"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <span className="text-sm text-gray-600">Uploaded: {file.name}</span>
          </div>
        )}
      </div>

      {error && (
        <span className={clsx("text-sm text-red-500", errorClassName)}>
          {error}
        </span>
      )}
    </div>
  );
};
