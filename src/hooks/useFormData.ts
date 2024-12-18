import { useState, useCallback } from "react";

const useFormData = () => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleChange = useCallback((name: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  return { formData, handleChange };
};

export default useFormData;
