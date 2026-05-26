import { InputHTMLAttributes, ReactNode, forwardRef } from "react";

interface FieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  label: string;
  hint?: string;
  error?: string;
  suffix?: ReactNode;
  prefix?: ReactNode;
}

const Field = forwardRef<HTMLInputElement, FieldProps>(function Field(
  { label, hint, error, suffix, prefix, className = "", id, ...props },
  ref,
) {
  const inputId = id ?? props.name;
  return (
    <div className="w-full">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-slate-700 mb-1.5"
      >
        {label}
      </label>
      <div
        className={`flex items-center rounded-lg border bg-white overflow-hidden transition-all focus-within:ring-2 focus-within:ring-primary-200 focus-within:border-primary-500 ${
          error ? "border-red-400" : "border-slate-300"
        }`}
      >
        {prefix && (
          <span className="pl-3 text-slate-400 flex items-center">{prefix}</span>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`flex-1 bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 ${className}`}
          {...props}
        />
        {suffix && (
          <span className="pr-1 pl-1 text-sm text-slate-500 select-none flex items-center">
            {suffix}
          </span>
        )}
      </div>
      {(hint || error) && (
        <p
          className={`mt-1 text-xs ${
            error ? "text-red-500" : "text-slate-500"
          }`}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
});

export default Field;
