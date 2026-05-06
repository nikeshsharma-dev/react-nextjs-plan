
import { forwardRef } from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
  success?: boolean;
  disabled?: boolean;
  required?: boolean;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      id,
      label,
      type = 'text',
      placeholder,
      error,
      success,
      disabled = false,
      required = false,
      ...rest
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-1.5">

        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
          {required && (
            <span className="text-red-500 ml-1" aria-hidden="true">
              *
            </span>
          )}
        </label>

        <input
          ref={ref}
          id={id}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={[
            'w-full rounded-lg border px-4 py-2.5 text-sm',
            'bg-white dark:bg-gray-800',
            'text-gray-900 dark:text-gray-100',
            'placeholder:text-gray-400 dark:placeholder:text-gray-500',
            'transition-colors duration-150',
            'focus:outline-none focus:ring-2',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error
              ? 'border-red-500 focus:ring-red-400/40 bg-red-50 dark:bg-red-900/10'
              : success
                ? 'border-green-500 focus:ring-green-400/40 bg-green-50 dark:bg-green-900/10'
                : 'border-gray-300 dark:border-gray-600 focus:ring-primary/40 focus:border-primary',
          ].join(' ')}
          {...rest}
        />

        {error && (
          <p
            id={`${id}-error`}
            role="alert"
            className="text-xs text-red-500 flex items-center gap-1"
          >
            <span>⚠</span> {error}
          </p>
        )}

        {success && !error && (
          <p className="text-xs text-green-600 flex items-center gap-1">
            <span>✓</span> Looks good
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';
export default FormField;