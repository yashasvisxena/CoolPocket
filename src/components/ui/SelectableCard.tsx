import type { ReactNode } from 'react';

interface SelectableCardProps {
  selected: boolean;
  onSelect: () => void;
  children: ReactNode;
  className?: string;
}

export function SelectableCard({
  selected,
  onSelect,
  children,
  className = '',
}: SelectableCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`
        w-full p-4 rounded-lg border-2 text-left
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)]
        min-h-[44px]
        ${selected 
          ? 'border-[var(--color-primary)] bg-[var(--color-bg)]' 
          : 'border-[var(--color-border)] bg-[var(--color-bg)] hover:border-gray-300'
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
}

interface SelectableCardGroupProps {
  label: string;
  error?: string;
  children: ReactNode;
  horizontal?: boolean;
}

export function SelectableCardGroup({
  label,
  error,
  children,
  horizontal = false,
}: SelectableCardGroupProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-[var(--color-text)]">
        {label}
      </label>
      <div className={`flex gap-3 ${horizontal ? 'flex-row' : 'flex-col'}`}>
        {children}
      </div>
      {error && (
        <span className="text-sm text-[var(--color-error)]">{error}</span>
      )}
    </div>
  );
}
