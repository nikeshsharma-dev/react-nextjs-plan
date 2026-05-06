interface InputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export default function Input({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1"> 
      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={[
          'w-full rounded-md border px-3 py-2 text-sm',
          'bg-white dark:bg-gray-800',
          'text-gray-900 dark:text-gray-100',
          'placeholder:text-gray-400',
          'transition-colors duration-150',
          'focus:outline-none focus:ring-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error
            ? 'border-red-500 focus:ring-red-400/50'
            : 'border-gray-300 dark:border-gray-600 focus:ring-primary/50 focus:border-primary',
        ].join(' ')}
      />
      {error && (
        <p className="text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}