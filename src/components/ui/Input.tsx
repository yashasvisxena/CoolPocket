import { forwardRef, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--color-text)]">
          {label}
        </label>
        <input
          ref={ref}
          className={`
            w-full px-3 py-2.5 rounded-lg border text-base
            bg-[var(--color-bg)] text-[var(--color-text)]
            border-[var(--color-border)]
            placeholder:text-[var(--color-text-secondary)]
            focus:outline-none focus:border-[var(--color-border-focus)]
            focus:ring-1 focus:ring-[var(--color-border-focus)]
            transition-colors duration-200
            ${error ? 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <span className="text-sm text-[var(--color-error)]">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
