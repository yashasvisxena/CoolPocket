import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = `
    px-6 py-3 rounded-lg font-medium text-base
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    min-h-[44px]
  `;

  const variantStyles = {
    primary: `
      bg-[var(--color-primary)] text-white
      hover:bg-[var(--color-primary-hover)]
      focus:ring-[var(--color-primary)]
    `,
    secondary: `
      bg-[var(--color-bg-secondary)] text-[var(--color-text)]
      border border-[var(--color-border)]
      hover:bg-gray-100
      focus:ring-[var(--color-border)]
    `,
    outline: `
      bg-transparent text-[var(--color-text)]
      border border-[var(--color-border)]
      hover:bg-[var(--color-bg-secondary)]
      focus:ring-[var(--color-border)]
    `,
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
