import { type FieldError } from "react-hook-form";

interface FormFieldProps {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}

export const FormField = ({ label, id, error, children }: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm leading-none font-medium">
        {label}
      </label>
      {children}
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};
