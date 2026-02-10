import { forwardRef, useState, type InputHTMLAttributes, useMemo } from 'react';

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
  showStrength?: boolean;
}

function calculateStrength(password: string): { score: number; label: string } {
  if (!password) return { score: 0, label: '' };
  
  let score = 0;
  
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;
  
  const normalizedScore = Math.min(Math.floor(score / 1.5), 4);
  
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  return { score: normalizedScore, label: labels[normalizedScore] };
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, showStrength = true, value, className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    
    const strength = useMemo(() => {
      return calculateStrength(String(value || ''));
    }, [value]);

    const strengthColors = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
    const strengthWidths = ['w-0', 'w-1/4', 'w-2/4', 'w-3/4', 'w-full'];

    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--color-text)]">
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            value={value}
            className={`
              w-full px-3 py-2.5 pr-10 rounded-lg border text-base
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
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] p-1"
            tabIndex={-1}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            )}
          </button>
        </div>
        
        {showStrength && value && (
          <div className="flex flex-col gap-1">
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${strengthColors[strength.score]} ${strengthWidths[strength.score]}`}
              />
            </div>
            {strength.label && (
              <span className="text-xs text-[var(--color-text-secondary)]">
                {strength.label}
              </span>
            )}
          </div>
        )}
        
        {error && (
          <span className="text-sm text-[var(--color-error)]">{error}</span>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
