import React from "react";
import { Input } from "./components/Input";
import { Dropdown } from "./components/Dropdown";
import RadioButton from "./components/RadioButton";
import DatePicker from "./components/DatePicker";
import useFormData from "./hooks/useFormData";
import { SearchableDropdown } from "./components/SearchableDropdown";
import { PasswordField } from "./components/PasswordField";
import FileUpload from "./components/FileUpload";
import { Button } from "./components/Button";

const App: React.FC = () => {
  const { formData, handleChange } = useFormData();

  const handleClick = () => {
    console.log("Form Submitted");
    console.log("Form Data:", formData);
  };

  const options = [
    { value: "option1", label: "Bankai" },
    { value: "option2", label: "Bleach 2" },
    { value: "option3", label: "Walter White 3" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center space-y-6">
      <h1 className="text-2xl font-bold">
        FormKnight ⚔️
      </h1>
      <div className="w-1/2 flex flex-col gap-2">
        {/* Date Picker */}
        <DatePicker
          name="date"
          value={formData.date || ""}
          onChange={(value) => handleChange("date", value)}
        />

        {/* Text Input */}
        <Input
          name="username"
          label="Username"
          type="text"
          value={formData.username || ""}
          onChange={(value) => handleChange("username", value)}
          placeholder="Enter username"
          // validationRules={{ minLength: 3, maxLength: 15 }}
        />

        <Input 
          name="phone"
          label="Phone Number"
          type="number"
          
          value={formData.phone || ""}
          onChange={(value) => handleChange("phone", value)}
          validationRules={{ required: true }}
          />

        <PasswordField
          name="password"
          label="Password"
          value={formData.password || ""}
          onChange={(value) => handleChange("password", value)}
        />

        {/* Email Input */}
        <Input
          name="email"
          label="Email Address"
          type="email"
          value={formData.email || ""}
          onChange={(value) => handleChange("email", value)}
          validationRules={{ required: true, minLength: 5, maxLength: 50 }}
        />

        {/* Dropdown */}
        <Dropdown
          name="dropdown"
          label="Dropdown"
          options={[
            { value: "option1", label: "Aegon targaryen" },
            { value: "option2", label: "Daemon targaryen" },
            { value: "option3", label: "Daenerys targaryen" },
            { value: "option4", label: "Rhaenyra targaryen" },
          ]}
          value={formData.dropdown || ""}
          onChange={(value) => handleChange("dropdown", value)}
          validationRules={{ required: true }}
        />

        <SearchableDropdown
          label="Searchable Dropdown"
          options={options}
          value={formData.searchableDropdown || ""}
          onChange={(value) => handleChange("searchableDropdown", value)}
        />

        {/* Radio Button */}
        <RadioButton
          name="myRadioGroup"
          value={formData.myRadioGroup || ""}
          options={options}
          selectedValue={formData.myRadioGroup || ""}
          onChange={(value) => handleChange("myRadioGroup", value)}
        />
        <FileUpload
          name="customFile"
          label="Upload a Document"
          // onChange={handleFileChange}
          onChange={(file) => handleChange("file", file)}
          validationRules={{
            required: true,
            // allowedTypes: ["image/png", "image/jpeg", "application/pdf"],
            maxSize: 5, // 5 MB
          }}
          className="border border-gray-300 p-4 rounded-lg bg-white shadow-md"
        />

        <Button label="Submit" type="submit" onClick={handleClick} />

      </div>
    </div>
  );
};

export default App;
