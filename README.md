# FormKnight React

FormKnight React is a reusable and customizable Form Validator Widget built using React and TypeScript. It provides advanced form validation, error handling, and customizable styles, making it easy to create and manage forms in your React applications.

## Features
- **Advanced Form Validation**: Real-time validation with customizable rules.
- **TypeScript Support**: Strongly typed components and props.
- **Error Handling**: Display error messages for invalid inputs.
- **Customizable Styles**: Easily modify the appearance of form fields.
- **Reusable Components**: Modular and reusable form components.
- **Debounced Validation**: Improve performance with debounced validation.

## Installation
Install the package using npm:

```bash
npm install formknight-react
```
or
```bash
yarn add formknight-react
```

## Usage
Here's an example of how to use the FormKnight React components in your application:

```tsx
  <Input
    name="username"
    label="Username"
    type="text"
    value=""
    placeholder="Enter username"
    minLength={3}
    maxLength={20}
   />
```

## Components

### Form
The `Form` component wraps all input fields and manages the form state and submission.

**Props:**
- `onSubmit`: Function to handle form submission.
- `children`: Form fields and buttons.
- `className`: Custom CSS class for the form.

### Input
The `Input` component renders a text input field with validation.

**Props:**
- `name`: Name of the input field.
- `label`: Label for the input field.
- `type`: Type of the input field (text, email, password, number).
- `placeholder`: Placeholder text.
- `value`: Value of the input field.
- `onChange`: Function to handle value changes.
- `required`: Whether the field is required.
- `minLength`: Minimum length of the input value.
- `maxLength`: Maximum length of the input value.
- `className`: Custom CSS class for the input field.

### PasswordField
The `PasswordField` component renders a password input field with validation and visibility toggle.

**Props:**
- `name`: Name of the input field.
- `label`: Label for the input field.
- `value`: Value of the input field.
- `onChange`: Function to handle value changes.
- `required`: Whether the field is required.
- `className`: Custom CSS class for the input field.

### RadioButton
The `RadioButton` component renders a group of radio buttons with validation.

**Props:**
- `name`: Name of the radio button group.
- `label`: Label for the radio button group.
- `options`: Array of options for the radio buttons.
- `onChange`: Function to handle value changes.
- `required`: Whether the field is required.
- `className`: Custom CSS class for the radio button group.

### Dropdown
The `Dropdown` component renders a dropdown menu with validation.

**Props:**
- `name`: Name of the dropdown field.
- `label`: Label for the dropdown field.
- `options`: Array of options for the dropdown.
- `onChange`: Function to handle value changes.
- `required`: Whether the field is required.

### SearchableDropdown
The `SearchableDropdown` component renders a searchable dropdown menu.

**Props:**
- `label`: Label for the dropdown field.
- `options`: Array of options for the dropdown.
- `onChange`: Function to handle value changes.
- `placeholder`: Placeholder text.
- `required`: Whether the field is required.

### FileUpload
The `FileUpload` component renders a file upload field with validation.

**Props:**
- `label`: Label for the file upload field.
- `name`: Name of the file upload field.
- `onChange`: Function to handle file changes.
- `required`: Whether the field is required.
- `allowedTypes`: Array of allowed file types.
- `maxSize`: Maximum file size in MB.
- `className`: Custom CSS class for the file upload field.

### DatePicker
The `DatePicker` component renders a date picker with validation.

**Props:**
- `name`: Name of the date picker field.
- `value`: Selected date value.
- `onChange`: Function to handle date changes.
- `label`: Label for the date picker field.
- `required`: Whether the field is required.

### Button
The `Button` component renders a button.

**Props:**
- `name`: Name of the button.
- `label`: Label for the button.
- `type`: Type of the button (button, submit, reset).
- `onClick`: Function to handle button clicks.
- `disabled`: Whether the button is disabled.

## Full Example

```tsx
import React from 'react';
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
} from 'formknight-react';

const App: React.FC = () => {
  const handleSubmit = (formData: Record<string, any>) => {
    console.log("Form Submitted", formData);
  };

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
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
            placeholder="Enter username"
            onChange={(value: string) => console.log(value)}
            minLength={3}
            maxLength={20}
            required
          />

          <Input
            name="phone"
            label="Phone Number"
            type="number"
            onChange={(value: string) => console.log(value)}
            required
          />

          <PasswordField
            name="password"
            label="Password"
            required
            onChange={(value: string) => console.log(value)}
          />

          <Input
            name="email"
            label="Email Address"
            type="email"
            onChange={(value: string) => console.log(value)}
            required
          />

          <Dropdown
            name="dropdown"
            label="Dropdown"
            options={options}
            onChange={(value: string) => console.log(value)}
            required
          />

          <SearchableDropdown
            label="Searchable Dropdown"
            options={options}
            onChange={(value: string) => console.log(value)}
          />

          <RadioButton
            name="myRadioGroup"
            label="Choose an Option"
            options={options}
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
```

---


Happy coding with **FormKnight React**! ⚔️