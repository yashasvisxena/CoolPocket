import { forwardRef, type SelectHTMLAttributes } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: readonly Option[];
  error?: string;
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, placeholder = 'Select...', className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--color-text)]">
          {label}
        </label>
        <select
          ref={ref}
          className={`
            w-full px-3 py-2.5 rounded-lg border text-base
            bg-[var(--color-bg)] text-[var(--color-text)]
            border-[var(--color-border)]
            focus:outline-none focus:border-[var(--color-border-focus)]
            focus:ring-1 focus:ring-[var(--color-border-focus)]
            transition-colors duration-200
            appearance-none cursor-pointer
            bg-[url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="%2364748b" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>')]
            bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.25rem]
            ${error ? 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]' : ''}
            ${className}
          `}
          {...props}
        >
          <option value="" disabled className="text-[var(--color-text-secondary)]">
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <span className="text-sm text-[var(--color-error)]">{error}</span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
