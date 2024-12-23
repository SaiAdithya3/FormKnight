import React from "react";
import {
  Button,
  DatePicker,
  Dropdown,
  FileUpload,
  Input,
  PasswordField,
  RadioButton,
  SearchableDropdown,
  Form,
} from "./components";

const App: React.FC = () => {
  const handleSubmit = (formData: Record<string, any>) => {
    console.log("Form Submitted");
    console.log("Form Data:", formData);
  };

  const options = [
    { value: "option1", label: "Bankai" },
    { value: "option2", label: "Bleach 2" },
    { value: "option3", label: "Walter White 3" },
  ];

  return (
    <div className="p-5 md:p-10 py-20 bg-gradient-to-r from-blue-100 to-cyan-100 min-h-screen flex flex-col items-center space-y-6">
      <h1 className="text-4xl text-cyan-800 font-bold">Form Knight ⚔️</h1>
      <div className="w-full md:w-1/2 max-w-xl flex flex-col gap-2">
        <Form onSubmit={handleSubmit} className="bg-white rounded-xl shadow">
          <DatePicker
            name="date"
            value=""
            label="Date of Birth"
            onChange={(value: string) => console.log(value)}
          />

          <Input
            name="username"
            label="Username"
            type="text"
            value=""
            placeholder="Enter username"
            onChange={(value: string) => console.log(value)}
            minLength={3}
            maxLength={20}
          />

          <Input
            name="phone"
            label="Phone Number"
            type="number"
            onChange={(value: string) => console.log(value)}
            value=""
            required
          />

          <PasswordField
            name="password"
            label="Password"
            value=""
            required
            onChange={(value: string) => console.log(value)}
          />

          <Input
            name="email"
            label="Email Address"
            type="email"
            value=""
            onChange={(value: string) => console.log(value)}
            required
          />

          <Dropdown
            name="dropdown"
            label="Dropdown"
            options={[
              { value: "option1", label: "Aegon targaryen" },
              { value: "option2", label: "Daemon targaryen" },
              { value: "option3", label: "Daenerys targaryen" },
              { value: "option4", label: "Rhaenyra targaryen" },
            ]}
            value=""
            onChange={(value: string) => console.log(value)}
            required
          />

          <SearchableDropdown
            label="Searchable Dropdown"
            options={options}
            value=""
            onChange={(value: string) => console.log(value)}
          />

          <RadioButton
            name="myRadioGroup"
            label="Choose an Option"
            options={options}
            selectedValue=""
            onChange={(value: string) => console.log(value)}
          />

          <FileUpload
            name="customFile"
            label="Upload a Document"
            onChange={(file) => console.log(file)}
            required
            maxSize={5}
            allowedTypes={["image/png", "image/jpeg", "application/pdf"]}
            className="border border-gray-300 p-4 rounded-lg bg-white shadow-md"
          />

          <Button label="Submit" type="submit" />
        </Form>
      </div>
    </div>
  );
};

export default App;
