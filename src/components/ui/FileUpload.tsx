import { useRef, type ChangeEvent } from 'react';

interface FileUploadProps {
  label: string;
  fileName?: string;
  onFileSelect: (fileName: string) => void;
  accept?: string;
  error?: string;
}

export function FileUpload({
  label,
  fileName,
  onFileSelect,
  accept = '.pdf,.jpg,.jpeg,.png',
  error,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file.name);
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-[var(--color-text)]">
        {label}
      </label>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={handleClick}
        className={`
          w-full px-4 py-3 rounded-lg border-2 border-dashed
          text-left flex items-center gap-3
          transition-colors duration-200
          hover:border-gray-400 hover:bg-[var(--color-bg-secondary)]
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)]
          ${error 
            ? 'border-[var(--color-error)]' 
            : 'border-[var(--color-border)]'
          }
        `}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-[var(--color-text-secondary)]"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
        <span className={fileName ? 'text-[var(--color-text)]' : 'text-[var(--color-text-secondary)]'}>
          {fileName || 'Click to upload document'}
        </span>
      </button>
      {error && (
        <span className="text-sm text-[var(--color-error)]">{error}</span>
      )}
    </div>
  );
}
